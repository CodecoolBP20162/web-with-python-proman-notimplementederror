from flask import Flask, request, g, redirect, url_for, render_template, session,json
import os
import psycopg2
import ast
from conn import db_proxy,Boards

app = Flask(__name__)
app.config.from_object(__name__)


@app.before_request
def before_request():
    g.db = db_proxy
    g.db.connect()

@app.after_request
def after_request(response):
    g.db = db_proxy
    g.db.close()
    return response


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
    x = ast.literal_eval(x)
    strng=Boards.select()

    x_id=x['id']
    for i in strng:

        if x_id ==i.id:
            x_id=str(int(x['id'])+1)
    Boards.create(id=x_id,title=x['title'],cards='')
    return json.dumps({'status':'OK'})

@app.route("/get_cards")
def get_cards():
    cards={}
    strng=Boards.select()
    for i in strng:
        if i.id not in cards:
            cards[i.id]={'id':i.id,'title':i.title,'cards':i.cards}
    return json.dumps(cards)

@app.route("/get_card",methods=["POST"])
def get_card():
    board_id=request.form['id']
    strng=Boards.select().where(Boards.id==board_id)
    board={'id':strng[0].id,'title':strng[0].title,'cards':strng[0].cards}
    return json.dumps(board)

@app.route("/save_card",methods=["POST"])
def save_card():
    card=request.form['card']
    dict_card=ast.literal_eval(card)
    model=Boards.select().where(Boards.id==dict_card['id']).get()
    model.cards =dict_card['cards'] + "|"
    model.save()
    return json.dumps({"status":"OK"})



if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
