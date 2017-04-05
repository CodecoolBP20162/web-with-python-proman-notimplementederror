from flask import Flask, request, g, redirect, url_for, render_template, session
import os
import psycopg2

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/')
def home_menu():
    return render_template('index.html')


@app.route('/proba')
def proba():
    return render_template('proba.html')

@app.route('/tasks')
def tasks():
    return render_template('tasks.html')



if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
