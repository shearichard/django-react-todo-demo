#!/bin/bash
if [[ -z "$PIPENV_ACTIVE" && -z "$VIRTUAL_ENV" ]]; then
    echo "Is the virtual enviroment active ? Neither PIPENV_ACTIVE nor VIRTUAL_ENV is set. Stopping script." >&2
    return 1  # Stop script if neither variable exists
fi
python manage.py runserver --settings backend.settings.local  127.0.0.1:8000
#python manage.py runserver --settings backend.settings.local  localhost:8000
