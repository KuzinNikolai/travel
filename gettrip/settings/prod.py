from .base import *


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'cj05405_beta',
        'USER': 'cj05405_beta',
        'PASSWORD': 'beta_pass',
        'HOST': '127.0.0.1',
        'PORT': 3306,
    }
}

ALLOWED_HOSTS = ["beta.gettrip.co", "www.beta.gettrip.co", "gettrip.co"]

WSGI_APPLICATION = "public_html.wsgi.application"

