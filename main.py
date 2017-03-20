from flask import Flask, request, g, redirect, url_for, render_template, session

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/')
def home_menu():
    return render_template('index.html')

@app.route('/proba')
def proba():
    return render_template('proba.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
