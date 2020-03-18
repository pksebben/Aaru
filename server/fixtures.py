import random
import datetime

import sqlalchemy
from sqlalchemy import orm

import models
import db
import config
import wordsalad

engine = None
session = None

def init():
    global engine
    global session
    engine = sqlalchemy.create_engine(config.db_string)
    models.Base.metadata.drop_all(engine)
    models.Base.metadata.create_all(engine)
    sessionmaker = orm.sessionmaker(bind=engine)
    session = sessionmaker()


def sanitize(string):
    string = string.encode(encoding="raw_unicode_escape")
    return string.decode()


def choose_user():
    return random.choice(session.query(models.User).all())

def chunks(trees = 40, chunkspertree = 25, branching = False):
    print('creating chunks...')
    testchunk = models.Chunk(
        title = 'chunkone',
        text = """First, are you our sort of a person?
Do you wear
A glass eye, false teeth or a crutch,
A brace or a hook,
Rubber breasts or a rubber crotch,

Stitches to show something's missing? No, no? Then
How can we give you a thing?
Stop crying.
Open your hand.
Empty? Empty. Here is a hand

To fill it and willing
To bring teacups and roll away headaches
And do whatever you tell it.
Will you marry it?
It is guaranteed

To thumb shut your eyes at the end
And dissolve of sorrow.
We make new stock from the salt.
I notice you are stark naked.
How about this suit——

Black and stiff, but not a bad fit.
Will you marry it?
It is waterproof, shatterproof, proof
Against fire and bombs through the roof.
Believe me, they'll bury you in it.

Now your head, excuse me, is empty.
I have the ticket for that.
Come here, sweetie, out of the closet.
Well, what do you think of that?
Naked as paper to start

But in twenty-five years she'll be silver,
In fifty, gold.
A living doll, everywhere you look.
It can sew, it can cook,
It can talk, talk, talk.

It works, there is nothing wrong with it.
You have a hole, it's a poultice.
You have an eye, it's an image.
My boy, it's your last resort.
Will you marry it, marry it, marry it.""",
        author = choose_user().id,
        parent = None
    )

    for i in range(trees):
        parent_chunk = None
        for i in range(chunkspertree):
            if branching:
                pass
            else:
                chunk = models.Chunk(
                    title = wordsalad.word(),
                    text = sanitize(wordsalad.paragraph())
                    ,
                    author = choose_user().id,
                    parent = parent_chunk.id if parent_chunk else None
                )
            parent_chunk = chunk
            session.add(chunk)
            session.commit()
    
            
def users(numusers = 50):
    print('creating users...')
    for i in range(numusers):
        user = models.User(
            created = datetime.datetime.now()
        )
        session.add(user)
    session.commit()
    
def gogogadget():
    print("go go gadget fixtures")
    init()
    users()
    chunks()

if __name__ == "__main__":
    gogogadget()
