import os
import unittest
import random
import string
import datetime as dt

import flask
from flask import session
from sqlalchemy import Table, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlite3 import IntegrityError

import aaru.server.app as app
from aaru.server import db, models, fixtures

def setUpModule():
    app.init()
    db.init(app.app)

class StartTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        fixtures.gogogadget()
        cls.tester = app.app.test_client()

    def test_app_available(self):
        res = self.tester.get(
            '/',
            content_type="html/text",
            follow_redirects=True
        )
        self.assertEqual(res.status_code, 200)

    def test_db_available(self):
        res = db.web.session.query(models.User).first()
        assert(res.id)
        
    def test_api_chunk_retrieval(self):
        res = self.tester.post(
            '/chunk',
            data = dict(
                chunkid=1
            ),
            follow_redirects=True
        )
        data = res.get_json()
        self.assertEqual(data['id'], 1)

    def test_api_multi_chunk_retrieval(self):
        res = self.tester.post(
            '/chunktree',
            data = dict(
                chunkid=1
            ),
            follow_redirects=True
        )
        data = res.get_json()
        self.assertEqual(data[0]['id'], 1)
        
        
if __name__ == '__main__':
    unittest.main()
