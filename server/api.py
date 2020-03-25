import datetime as dt

import flask
from flask import session as sess
from flask import Blueprint, request, redirect, session
from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from marshmallow import Schema, fields

import config
import db
import exceptions
import models

"""
api.py
The structure of an api call:
GET > must come with a chunkid in the GET path.  Returns JSON

"""

api = Blueprint('api', __name__)

meta = MetaData()
engine = create_engine(config.db_string)
Session = sessionmaker(bind=engine)
session = Session()

# MARSHMALLOW SCHEMA
class ChunkSchema(Schema):
    id = fields.Integer()
    text = fields.String()
    title = fields.String()
    author = fields.Integer()
    parent = fields.Integer()

# END MARSHMALLOW SCHEMA

# read a chunk
@api.route("/chunk/<chunk_id>", methods=['GET'])
def get_chunk(chunkid):
    chunk = session.query(models.Chunk).get(chunkid)
    res = flask.jsonify(ChunkSchema().dump(chunk))
    return res

# create a chunk
@api.route("/chunk", methods = ['POST'])
def post_chunk():
    pass

# update a chunk
@api.route("/chunk", methods = ['PUT'])
def put_chunk():
    pass

# read chunks
@api.route("/chunks/<root_chunk_id>", methods = ['GET'])
def get_chunks(root_chunk_id):
    beginning_getter = session.query(models.Chunk).\
        filter(models.Chunk.id == root_chunk_id).cte(name='children_for', recursive=True)
    with_recursive = beginning_getter.union_all(
        session.query(models.Chunk).filter(models.Chunk.parent == beginning_getter.c.id)
    )
    return flask.jsonify(ChunkSchema().dump(session.query(with_recursive), many=True))



# @api.route("/chunk", methods=['POST','GET'])
# def retrieve_chunk():
#     # return a JSON of chunk data with id = chunkid
#     chunkid = flask.request.form['chunkid']
#     chunk = session.query(models.Chunk).get(chunkid)
#     schema = ChunkSchema()
#     res = flask.jsonify(schema.dump(chunk))
#     return res

@api.route("/chunktree", methods=['POST'])
def retrieve_tree():
    # return a JSON of chunks
    beginning_getter = session.query(models.Chunk).\
        filter(models.Chunk.id == flask.request.form['chunkid']).cte(name='children_for', recursive=True)
    with_recursive = beginning_getter.union_all(
        session.query(models.Chunk).filter(models.Chunk.parent == beginning_getter.c.id)
    )
    return flask.jsonify(ChunkSchema().dump(session.query(with_recursive), many=True))

# Retrieve a story tree and return it in JSON
def tellMeAStory(story_id):
    pass
    

def getstorytree(story_id):
    beginning_getter = session.query(Chunk).\
        filter(Chunk.id == story_id).cte(name='children_for', recursive=True)
    with_recursive = beginning_getter.union_all(
        session.query(Chunk).filter(Chunk.parent == beginning_getter.c.id)
    )
    return session.query(with_recursive)

def signin(email, password):
    try:
        userauth =  session.query(UserAuth).filter_by(email=email).one()
        assert password == userauth.password
        print("logged in userid " + str(userauth.user.id))
        sess['userid'] = userauth.user.id
    except AssertionError:
        raise exceptions.IncorrectPasswordErr
    except IntegrityError as err:
        raise err.orig

def create_user(email, password, name):
    try:
        user = User(created=dt.datetime.now())
        user.auth = UserAuth(name=name, password=password, email=email)
        session.add(user)
        session.commit()
    except IntegrityError as err:
        session.rollback()
        raise err.orig

"""create a story chunk.  On success, returns the id of the chunk."""
def create_chunk(author, text, parentid=0, title=None, children=None):
    # If parentid is special value 0, that means the chunk is a root node
    if parentid == 0:
        parent = None
        title = title
    else:
        parent = session.query(Chunk).get(parentid)
    try:
        chunk  = Chunk(text=text, author=author, title=title) # should author be author.id?
        if parent:
            parent.children.append(chunk)
        session.add(chunk)
        session.commit()
        return chunk.id
    except IntegrityError as err:
        session.rollback()
        raise err.orig

def get_index():
    firstchapters = session.query(Chunk).filter_by(parent=None)
    return firstchapters

    
def read_chunk(chunkid):
    try:
        chunk = session.query(Chunk).get(chunkid)
        return chunk
    except Exception:
        raise
