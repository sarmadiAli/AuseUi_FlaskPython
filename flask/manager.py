from app import app , db
from flask_script import Manager

manager = Manager(app)

@manager.command
def init():
    db.create_all()
    print('DataBase created Successfully')


if __name__ == '__main__':
    manager.run()