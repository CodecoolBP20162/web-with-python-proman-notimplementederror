from flask import Flask, request, g, redirect, url_for, render_template, session

app = Flask(__name__)
app.config.from_object(__name__)

app.config.update(dict(
    DEBUG=True, SECRET_KEY='any_random_string'))

app.config.from_envvar('SUPER_SPRINTER_3000_SETTINGS', silent=True)

def init_db():
    identify = open("parameter.txt", "r")
    login = identify.readlines()
    identify.close()
    db = PostgresqlDatabase(login[0], user=login[0])
    try:
        db.connect()
        print("Database connection established.")
    except:
        print("Can't connect to database.\nPlease check your connection.txt file.")


@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'postgre_db'):
        g.postgre_db.close()


@app.route('/')
def home_menu():
    return render_template('index.html')


if __name__ == "__main__":
    init_db()
    app.run(host='0.0.0.0')
