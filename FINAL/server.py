from flask import Flask, render_template, request, redirect, url_for, session
from datetime import datetime
import os
from flask import jsonify

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def home():
    session.clear()
    return render_template('home.html')

@app.route('/coffeemaker')
def coffeemaker():
    entry_time = datetime.now().isoformat()

    # Store entry time in session (backend)
    session['coffeemaker_entry_time'] = entry_time

    return render_template('coffeemaker.html', entry_time=entry_time)

@app.route('/quiz/<int:page>', methods=['GET', 'POST'])
def quiz(page):
    if request.method == 'POST':
        answer = request.form.get('answer')
        session[f'quiz_answer_{page}'] = answer
        return redirect(url_for('quiz', page=page+1))
    return render_template('quiz.html', page=page)

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
