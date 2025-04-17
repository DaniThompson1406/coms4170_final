from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def home():
    session.clear()
    return render_template('home.html')

@app.route('/coffeemaker')
def coffeemaker():
    return render_template('coffeemaker.html')

@app.route('/quiz/<int:page>', methods=['GET', 'POST'])
def quiz(page):
    if request.method == 'POST':
        answer = request.form.get('answer')
        session[f'quiz_answer_{page}'] = answer
        return redirect(url_for('quiz', page=page+1))
    return render_template('quiz.html', page=page)

@app.route('/result')
def result():
    return render_template('result.html')

if __name__ == '__main__':
    app.run(debug=True)
