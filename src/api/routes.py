"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

  


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def generate_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email == "test" or password == "test":
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token= access_token)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def sign_up():
    body = request.json
    email = body.get("email")
    password = body.get("password")
    

    if not email or not password:
        return jsonify("Email, password"), 400
    
    check_user = User.query.filter_by(email=email).first()

    if check_user:
        return jsonify({
            'msg': 'The email address already is already in use. Please login to your account to continue, or choose a different email.'
        }),409

    user = User(
        email=email,
        password=password,
    
    )

    if user is None:
        return jsonify("Failed to create user"), 400
    
    db.session.add(user)
    try:
        db.session.commit()
        return jsonify(user.serialize()), 201
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify("There is an error"), 400


# Define the login route
@api.route("/login", methods=["POST"])
def login():
    if not request.is_json:
        return jsonify({"message": "Invalid content type (must be application/json)"}), 400

    body = request.get_json()
    if not all(key in body for key in ["email", "password"]):
        return jsonify({"message": "Missing email or password"}), 400

    user = User.query.filter_by(email=body["email"]).one_or_none()
    if user is None or not user.check_password(body["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=user.id)
    return jsonify({
        "user": user.serialize(),
        "token": token
    }), 200

@api.route("/changepassword", methods=["POST"])
@jwt_required()
def change_password():
    new_password=request.json.get("password")
    user_id=get_jwt_identity()
    user=User.query.get(user_id)
    user.password=new_password
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg":"Clave actualizada"})

@api.route("/recoverypassword", methods=["POST"])
def recovery_password():
    user_email=request.json.get("email")
    user=User.query.filter_by(email=user_email).first()
    if user is None:
        return jsonify({"Message": "User not found"}), 401
    # Generate temporary token for key change
    access_token = create_access_token(identity=user.id, additional_claims={"type":"password"})
    return jsonify({"recoveryToken":access_token})
    # Send link with the token via email for the password change


@api.route("/helloprotected", methods=["GET"])
@jwt_required()
def hello_protected_get():
    user_id = get_jwt_identity()
    return jsonify({"userId": user_id, "message": "Hello protected route"})



