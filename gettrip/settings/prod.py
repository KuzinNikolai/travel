import os
from .base import *


DATABASES = {
    'default': {
        'ENGINE': os.environ["DB_ENGINE"],
        'NAME': os.environ["DB_NAME"],
        'USER': os.environ["DB_USER"],
        'PASSWORD': os.environ["DB_PASSWORD"],
        'HOST': os.environ["DB_HOST"],
        'PORT': os.environ["DB_PORT"],
    }
}

ALLOWED_HOSTS = ["beta.gettrip.co", "www.beta.gettrip.co", "gettrip.co"]

WSGI_APPLICATION = "public_html.wsgi.application"

