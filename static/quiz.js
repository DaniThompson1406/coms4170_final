function initDragDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const milkTarget = document.getElementById('milk-target');

    const scoreElement = document.getElementById('score');
    let score = parseInt(document.body.dataset.score);
    const correctDrag = document.body.dataset.correct;
    const currentPage = parseInt(document.body.dataset.page);

    // Set dragstart for all draggable images
    draggables.forEach(item => {
        item.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData("text/plain", item.dataset.name);
        });
    });

    // Allow drop
    milkTarget.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    // Handle drop
    milkTarget.addEventListener('drop', function (e) {
        e.preventDefault();
        const draggedName = e.dataTransfer.getData("text/plain");
        console.log("Dropped:", draggedName, "Correct:", correctDrag);

        if (draggedName === correctDrag) {
            // Correct drop
            alert("Correct drop!");
            document.querySelector('.quiz-container').style.display = 'none';
            document.getElementById('form-section').style.display = 'block';
            logUserAction('quiz_correct_drag', `Page ${currentPage}: ${draggedName}`);
            
            // Add a hidden input to track this correct drag
            const form = document.querySelector('#form-section form');
            const dragScoreInput = document.createElement('input');
            dragScoreInput.type = 'hidden';
            dragScoreInput.name = 'drag_correct';
            dragScoreInput.value = 'true';
            form.appendChild(dragScoreInput);
            
        } else {
            // Incorrect drop - deduct point
            score = Math.max(0, score - 1);
            scoreElement.innerText = score;
            alert("Incorrect! 1 point deducted.");
            logUserAction('quiz_incorrect_drag', `Page ${currentPage}: ${draggedName}`);
            
            // Add a hidden input to track this score deduction
            const form = document.querySelector('#form-section form');
            const dragScoreInput = document.createElement('input');
            dragScoreInput.type = 'hidden';
            dragScoreInput.name = 'drag_deduction';
            dragScoreInput.value = '1';
            form.appendChild(dragScoreInput);
        }
    });

    // Skip question button
    window.skipQuestion = function() {
        // Create a skip form and submit it to the server
        const skipForm = document.createElement('form');
        skipForm.method = 'POST';
        skipForm.action = `/quiz/${currentPage}`;
        
        const skipInput = document.createElement('input');
        skipInput.type = 'hidden';
        skipInput.name = 'skip';
        skipInput.value = 'true';
        
        skipForm.appendChild(skipInput);
        document.body.appendChild(skipForm);
        
        logUserAction('quiz_skip', `Page ${currentPage}`);
        skipForm.submit();
    };
}

// Log user actions for analytics
function logUserAction(action, details) {
    fetch('/log_action', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: action,
            details: details
        }),
    });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initDragDrop();
});