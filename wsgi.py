import os
import sys

# Get the current working directory
current_directory = os.getcwd()
# Get the parent directory
parent_directory = os.path.dirname(current_directory)


activate_this = os.path.expanduser(os.path.join(parent_directory, "venv/bin/activate_this.py"))
exec(open(activate_this).read(), {"__file__": activate_this})

sys.path.insert(1, os.path.expanduser(os.path.join(parent_directory, "public_html")))


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gettrip.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
