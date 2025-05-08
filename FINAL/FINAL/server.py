from flask import Flask, render_template, request, redirect, url_for, session
from datetime import datetime
import os
from flask import jsonify

app = Flask(__name__)
app.secret_key = 'your_secret_key'


# Complete quizzables data with proper images and data
quizzables = [
    { "name": "Macchiato", "qualifier": ["Espresso", "Steamed Milk"], "drag": "Espresso",
      "dosage": ["36g", "1oz"], "img": "https://raw.githubusercontent.com/DaniThompson1406/coms4170_final/refs/heads/main/FINAL/macchiato.png" },
    
    { "name": "Matcha Latte", "qualifier": ["Matcha Tea", "Steamed Milk"], "drag": "Matcha Tea",
      "dosage": ["3g", "6oz"], "img": "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/matcha.jpg" },
    
    { "name": "Latte", "qualifier": ["Espresso", "Steamed Milk"], "drag": "Espresso",
      "dosage": ["36g", "4oz"], "img": "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/latte_lightest.jpg" },
    
    { "name": "Chai Latte", "qualifier": ["Chai Tea", "Steamed Milk"], "drag": "Chai Tea",
      "dosage": ["3g", "6oz"], "img": "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/chai_light.jpg" },
    
    { "name": "Hojicha Latte", "qualifier": ["Hojicha Tea", "Steamed Milk"], "drag": "Hojicha Tea",
      "dosage": ["3g", "6oz"], "img": "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/hojicha_light.jpg" }
]

# Updated quiz images to match recipes
quiz_img = [
    { "name": "Espresso", "img": "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/espresso.jpg" },
    { "name": "Matcha Tea", "img": "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/matcha_tea.jpg" },
    { "name": "Chai Tea", "img": "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/chai_tea.jpg" },
    { "name": "Hojicha Tea", "img": "https://raw.githubusercontent.com/olivia-long127/coms4170_final/refs/heads/main/FINAL/static/hojicha_tea.jpg" }
]


@app.route('/')
def home():
    session.clear()
    return render_template('home.html')

@app.route('/coffeemaker')
def coffeemaker():
    entry_time = datetime.now().isoformat()
    
    # Store in session
    session['coffeemaker_entry_time'] = entry_time

    return render_template('coffeemaker.html', entry_time=entry_time)

@app.route('/quiz/<int:page>', methods=['GET', 'POST'])
def quiz(page):
    # Initialize score if not present
    if 'score' not in session:
        session['score'] = 0
    
    # Check if we've completed all quizzes
    if page > len(quizzables):
        final_score = session['score']
        session.clear()  # Clear session after quiz completion
        return render_template('quiz_complete.html', score=final_score, max_score=len(quizzables))

    quizzable = quizzables[page - 1]

    if request.method == 'POST':
        # Check if user skipped the question
        if request.form.get('skip') == 'true':
            session['score'] = max(0, session['score'] - 1)
            log_quiz_answer({'page': page, 'action': 'skip', 'correct': False})
            return redirect(url_for('quiz', page=page + 1))
        
        # Get any drag-related score adjustments
        drag_correct = request.form.get('drag_correct') == 'true'
        drag_deduction = int(request.form.get('drag_deduction', 0))
        
        # Process the form inputs for answer checking
        submitted_answers = [request.form.get(f'qualifier_{i}') for i in range(len(quizzable['qualifier']))]
        
        # Check if answers match expected dosages
        dosage_correct = all(submitted_answers[i] == quizzable['dosage'][i] for i in range(len(submitted_answers)))

        # Track points for this page
        if dosage_correct:
            session['score'] += 1
        
        # Account for any deductions from incorrect drags
        if drag_deduction > 0:
            session['score'] = max(0, session['score'] - drag_deduction)

        # Log the action
        action_details = {
            'page': page,
            'answers': submitted_answers,
            'dosage_correct': dosage_correct,
            'drag_correct': drag_correct
        }
        log_quiz_answer(action_details)
        
        return redirect(url_for('quiz', page=page + 1))

    return render_template('quiz.html',
                           quizzable=quizzable,
                           quiz_img=quiz_img,
                           page=page,
                           score=session['score'])

def log_quiz_answer(details):
    if 'actions' not in session:
        session['actions'] = []
    
    timestamp = datetime.now().isoformat()
    session['actions'].append({
        'time': timestamp, 
        'action': 'quiz_answer', 
        'details': details
    })
    print(f"Quiz answer logged: {details}")

@app.route('/recipes')
def recipes():
    return render_template('recipes.html')

@app.route('/log_action', methods=['POST'])
def log_action():
    data = request.get_json()
    action_type = data.get('action')
    details = data.get('details')
    timestamp = datetime.now().isoformat()

    # Store it in session for now (per-session backend storage)
    if 'actions' not in session:
        session['actions'] = []
    session['actions'].append({'time': timestamp, 'action': action_type, 'details': details})

    print(session['actions'])  # To see all stored actions

    return jsonify({'status': 'success'})

@app.route('/quiz_complete')
def quiz_complete():
    return render_template('quiz_complete.html', score=session.get('score', 0), max_score=len(quizzables))

if __name__ == '__main__':
    app.run(debug=True)