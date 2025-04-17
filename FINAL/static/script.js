// static/script.js

function initCoffeeMaker() {
    const ingredientDiv = document.getElementById('ingredients');
    ingredients.forEach(item => {
        const div = document.createElement('div');
        div.className = 'ingredient';
        div.draggable = true;
        div.ondragstart = (e) => e.dataTransfer.setData('text', item.name);
        div.innerHTML = `<span class="emoji">${item.emoji}</span><br>${item.name}`;
        ingredientDiv.appendChild(div);
    });
}

function allowWorkspaceDrop(ev) {
    ev.preventDefault();
}

function dropToWorkspace(ev) {
    ev.preventDefault();
    const ingredientName = ev.dataTransfer.getData("text");
    const workspace = document.getElementById('workspace-items');

    const ingredient = ingredients.find(item => item.name === ingredientName);

    const newDiv = document.createElement('div');
    newDiv.className = 'workspace-item';
    newDiv.dataset.name = ingredientName;
    newDiv.innerHTML = `
        <span class="emoji">${ingredient.emoji}</span><br>
        ${ingredientName}
    `;
    workspace.appendChild(newDiv);

    checkForRecipe();
}


function checkForRecipe() {
    const workspaceItems = document.querySelectorAll('.workspace-item');
    if (workspaceItems.length < 2) return;

    const item1 = workspaceItems[workspaceItems.length - 2].dataset.name;
    const item2 = workspaceItems[workspaceItems.length - 1].dataset.name;

    recipes.forEach(recipe => {
        if (!unlockedRecipes.includes(recipe.name)) {
            if (recipe.combo.includes(item1) && recipe.combo.includes(item2)) {
                unlockedRecipes.push(recipe.name);
                alert(`🎉 You unlocked a new drink: ${recipe.name}!`);

                // 1. Remove the two old items
                workspaceItems[workspaceItems.length - 2].remove();
                workspaceItems[workspaceItems.length - 1].remove();

                // 2. Add the new unlocked drink
                const workspace = document.getElementById('workspace-items');
                const newDiv = document.createElement('div');
                newDiv.className = 'workspace-item';
                newDiv.dataset.name = recipe.name;
                newDiv.innerHTML = `
                    <span class="emoji">✨</span><br>
                    ${recipe.name}
                `;
                workspace.appendChild(newDiv);
            }
        }
    });
}

