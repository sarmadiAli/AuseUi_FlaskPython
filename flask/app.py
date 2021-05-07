import os
import time
from flask import Flask, abort, request, jsonify, g, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)

BASE_DIR = os.path.abspath(os.path.dirname(__file__)) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR , 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from models import User

app.config['SECRET_KEY'] = os.urandom(24)

auth = HTTPBasicAuth()


@auth.verify_password
def verify_password(username_or_token, password):
    # first try to authenticate by token
    user = User.Users.verify_auth_token(username_or_token)
    print("############" )
    print(user )
    if not user:
        # try to authenticate with username/password
        user = User.Users.query.filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True








@app.route('/api/users', methods=['POST'])
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400)    # missing arguments
    if User.Users.query.filter_by(username=username).first() is not None:
        abort(400)    # existing user
    user = User.Users(username=username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return (jsonify({'username': user.username}), 201,
            {'Location': url_for('get_user', id=user.id, _external=True)})







@app.route('/api/users/<int:id>')
def get_user():
    user = User.Users.query.get(id)
    if not user:
        abort(400)
    return jsonify({'username' : user.username})

@app.route('/api/token')
@auth.login_required
def get_auth_token():
   token = g.user.generate_auth_token(600)
   return jsonify({'token' : token.decode('ascii') , 'duration' :600})

@app.route('/api/resource')
@auth.login_required
def get_resource():
    return jsonify({'data': 'Hello, %s!' % g.user.username})

if __name__ == '__main__':
    app.run(debug=True)