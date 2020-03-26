from flask import Flask, render_template, session
from flask_cors import CORS

from views import views
from api import api

app = Flask(__name__)
app.secret_key="kcubaiebfkjsdliausdbf"
# app.register_blueprint(interface)
def init():
    app.register_blueprint(views)
    app.register_blueprint(api)
    CORS(app)
    return app
