import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = int(os.environ.get("DEBUG", 0))


if DEBUG:
    from .dev import *
else:
    from .prod import *
