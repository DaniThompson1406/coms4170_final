let draggedElement = null;

let whiskEnabled = false;

function toggleWhisk() {
    whiskEnabled = !whiskEnabled;
    const whiskImg = document.getElementById('whisk-img');
    const status = document.getElementById('whisk-status');

    if (whiskEnabled) {
        whiskImg.classList.add("active");
        status.innerText = "Whisk ON";
    } else {
        whiskImg.classList.remove("active");
        status.innerText = "Whisk OFF";
    }
}

function initCoffeeMaker() {
    const ingredientDiv = document.getElementById('ingredients');
    ingredients.forEach(item => {
        const div = document.createElement('div');
        div.className = 'ingredient';
        div.draggable = true;
        div.ondragstart = (e) => e.dataTransfer.setData('text', item.name);
        div.innerHTML = `<img src="${item.img}" alt="${item.name}" class="ingredient-img">`;
        ingredientDiv.appendChild(div);
    });
    updateQuizButton();
}

function allowWorkspaceDrop(ev) {
    ev.preventDefault();
}

function dropToWorkspace(ev) {
    ev.preventDefault();
    const ingredientName = ev.dataTransfer.getData("text/plain");
    const workspace = document.getElementById('workspace-items');

    const ingredient = ingredients.find(i => i.name === ingredientName) || recipes.find(r => r.name === ingredientName);
    if (!ingredient) return;

    const newDiv = document.createElement('div');
    newDiv.className = 'workspace-item';
    newDiv.dataset.name = ingredientName;
    newDiv.setAttribute("draggable", true);

    // image display
    newDiv.innerHTML = ingredient.img
        ? `<img src="${ingredient.img}" alt="${ingredient.name}" class="ingredient-img">`
        : `<span class="emoji">✨</span><br>${ingredient.name}`;

    // Drag behavior
    newDiv.addEventListener("dragstart", (e) => {
        draggedElement = newDiv;
        e.dataTransfer.effectAllowed = "move";
        setTimeout(() => newDiv.classList.add("dragging"), 0);
    });

    newDiv.addEventListener("dragend", () => {
        draggedElement = null;
        newDiv.classList.remove("dragging");
    });

    workspace.appendChild(newDiv);
    checkForRecipe();
}

function repositionInWorkspace(ev) {
    ev.preventDefault();
    const workspace = document.getElementById('workspace-items');
    if (draggedElement && workspace.contains(draggedElement)) {
        workspace.appendChild(draggedElement);
        draggedElement = null;

        // ✅ Trigger recipe check after moving
        if (document.querySelectorAll('.workspace-item').length >= 2) {
            checkForRecipe();
        }
    }
}

function checkForRecipe() {
    const workspaceItems = document.querySelectorAll('.workspace-item');
    const workspaceNames = Array.from(workspaceItems).map(el => el.dataset.name);

    for (let recipe of recipes) {
        const comboMatch = recipe.combo.every(c => workspaceNames.includes(c));
        const toolMatch = !recipe.tool || recipe.tool.every(t => {
            if (t === "Whisk") {
                return whiskEnabled;
            } else {
                return workspaceNames.includes(t);
            }
        });
        

        if (comboMatch && toolMatch) {
            // Remove used ingredients
            const allUsed = recipe.combo.concat(recipe.tool || []);
            for (let name of allUsed) {
                const el = Array.from(document.querySelectorAll('.workspace-item')).find(item => item.dataset.name === name);
                if (el) el.remove();
            }

            // Add resulting drink to workspace
            const resultDiv = document.createElement('div');
            resultDiv.className = 'workspace-item';
            resultDiv.dataset.name = recipe.name;
            resultDiv.setAttribute("draggable", true);

            resultDiv.innerHTML = recipe.img
                ? `<img src="${recipe.img}" alt="${recipe.name}" class="ingredient-img">`
                : `<span class="emoji">✨</span><br>${recipe.name}`;

            // Drag behavior for result
            resultDiv.addEventListener("dragstart", (e) => {
                draggedElement = resultDiv;
                e.dataTransfer.effectAllowed = "move";
                setTimeout(() => resultDiv.classList.add("dragging"), 0);
            });

            resultDiv.addEventListener("dragend", () => {
                draggedElement = null;
                resultDiv.classList.remove("dragging");
            });

            document.getElementById('workspace-items').appendChild(resultDiv);

            // Unlock recipe
            if (!recipe.isUnlocked) {
                recipe.isUnlocked = true;
                if (!unlockedRecipes.includes(recipe.name)) {
                    unlockedRecipes.push(recipe.name);
                    localStorage.setItem('unlockedRecipes', JSON.stringify(unlockedRecipes));
                    alert(`🎉 You unlocked a new drink: ${recipe.name}!`);
                }
            }

            updateQuizButton();
            break; // only process one recipe at a time
        }
    }
}

function updateQuizButton() {
    const btn = document.getElementById('quiz-btn');
    if (unlockedRecipes.length >= unlockedAll) {
        btn.disabled = false;
        btn.innerText = "Quiz Me!";
    } else {
        btn.disabled = true;
        btn.innerText = `Unlock ${unlockedAll - unlockedRecipes.length} more to start quiz`;
    }
}
