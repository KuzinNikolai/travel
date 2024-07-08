# Travel

## Install backend

1. Move to backend
```bash
cd gettrip
```
2. Create python virtual 
```bash
python -m venv ./venv
```
3. Active virtual
```bash
. ./venv/bin/activate
```
4. Install deps
```bash
pip install -r requirements.txt
```
5. Create superusers
```bash
python manage.py createsuperuser
```
6. Run app
```bash
python manage.py runserver
```