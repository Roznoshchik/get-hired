import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY", "you-should-change-me-asap")
    LOG_TO_STDOUT = os.environ.get("LOG_TO_STDOUT", 0)
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_SAMESITE = "None"
