from flask import Flask, render_template, request, redirect, url_for, session
from datetime import datetime
import os
from flask import jsonify

app = Flask(__name__)
app.secret_key = 'your_secret_key'


# Add this
quizzables = [
    { "name": "Macchiato", "qualifier": ["Espresso", "Steamed Milk"], "drag": "Espresso",
      "dosage": ["36g", "1oz"], "img": "https://images.immediate.co.uk/production/volatile/sites/2/2021/11/Macchiato-4cea4fd.png?quality=90&resize=556,505" },
    { "name": "Matcha Latte", "qualifier": ["Matcha Powder", "Steamed Milk", "Hot Water"], "drag": "Matcha Tea",
      "dosage": ["3g", "6oz", "2oz"], "img": "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/matcha.jpg" },
    # ... add the rest of your items here
]

quiz_img = [
    { "name": "Espresso", "img": "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/matcha.jpg" },
    { "name": "Matcha Tea", "img": "https://raw.githubusercontent.com/olivia-long127/coms4170_final/9e297d423cab1c01fadea5f7f92af61f5cc22507/FINAL/static/matcha.jpg" },
    # ... add the rest
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
    if 'score' not in session:
        session['score'] = len(quizzables)

    if page > len(quizzables):
        return redirect(url_for('home'))

    quizzable = quizzables[page - 1]

    if request.method == 'POST':
        submitted_answers = [request.form.get(f'qualifier_{i}') for i in range(len(quizzable['qualifier']))]
        correct = all(submitted_answers[i] == quizzable['dosage'][i] for i in range(len(submitted_answers)))

        if correct:
            session['score'] += 1
        else:
            session['score'] = max(0, session['score'] - 1)

        return redirect(url_for('quiz', page=page + 1))

    return render_template('quiz.html',
                           quizzable=quizzable,
                           quiz_img=quiz_img,
                           page=page,
                           score=session['score'])



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

if __name__ == '__main__':
    app.run(debug=True)
