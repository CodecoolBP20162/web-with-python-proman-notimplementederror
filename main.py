from flask import Flask, request, g, redirect, url_for, render_template, session,json
import os
import psycopg2
import ast

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

@app.route("/create_board",methods=["POST"])
def create_board():
    x=request.form['id']
    x=ast.literal_eval(x)
    strng='INSERT INTO board VALUES (%s, %s, %s)' %(x['id'],x['title'],x['cards']);
    print(x['title'])
    return "Nice"

@app.route("/get_cards",methods=["GET"])
def get_cards():
    strng="SELECT * FROM board"
    #query=cur.execute(strng)
    #cards={'cards':[]}
    #for i in query.fetchall()
    #   cards['cards'].append({'id':i[0],'title':i[1],'cards':i[2]})
    #return json.dumps(cards)

@app.route("/get_card",methods=["POST"])
def get_card():
    id=request.form['id']
    strng="SELECT * FROM board WHERE id=%s" %(id)
    #query=cur.execute(strng)
    #row=query.fetchone()
    #card={'id':row[0],'title':row[1],'status':row[2]}
    #return json.dumps(card)

@app.route("/save_card",methods=["POST"])
def save_card():
    card=request.form['card']
    dict_card=ast.literal_eval(card)
    strng="INSERT into cards VALUES(%s, %s,%s)" %(dict_card.id,dict_card.title,dict_card.status)
    #cur.execute(strng)
    #return "success"



if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
