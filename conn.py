import os
import psycopg2
import urllib.parse
import os
from peewee import *

db_proxy = Proxy()

class BaseModel(Model):
    class Meta:
        database = db_proxy

class Boards(BaseModel):
    id=CharField()
    title=CharField()
    cards=CharField()


class Tasks(BaseModel):
    id=CharField()
    title=CharField()
    status=CharField()



if 'HEROKU' in os.environ:
    import urllib.parse, psycopg2
    urllib.parse.uses_netloc.append('postgres')
    url = urllib.parse.urlparse(os.environ["DATABASE_URL"])
    db = PostgresqlDatabase(database=url.path[1:], user=url.username, password=url.password, host=url.hostname, port=url.port)
    db_proxy.initialize(db)
else:
    db = SqliteDatabase('proman.db')
    db_proxy.initialize(db)



db_proxy.connect()
if Tasks.table_exists() and Boards.table_exists():
    db_proxy.drop_tables([Boards,Tasks])
db_proxy.create_tables([Boards,Tasks], safe=True)