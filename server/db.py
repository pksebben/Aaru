from sqlalchemy.orm import scoped_session, sessionmaker

import config
import plugin
import models

web = None

connectionstring = config.db_string

def init(app):
    global web
    web = plugin.SQLAlchemy(app, connectionstring)
    models.Base.metadata.create_all(web.engine)


