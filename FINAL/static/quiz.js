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
        } else {
            // Incorrect drop - deduct point
            score = Math.max(0, score - 1);
            scoreElement.innerText = score;
            alert("Incorrect! 1 point deducted.");
            logUserAction('quiz_incorrect_drag', `Page ${currentPage}: ${draggedName}`);
        }
    });

    // Skip question button
    window.skipQuestion = function() {
        score = Math.max(0, score - 1);
        scoreElement.innerText = score;
        logUserAction('quiz_skip', `Page ${currentPage}`);
        window.location.href = "/quiz/" + (currentPage + 1);
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