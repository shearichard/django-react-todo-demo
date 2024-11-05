#!/bin/bash
# Check if either PIPENV_ACTIVE or VIRTUAL_ENV is set
if [[ -z "$PIPENV_ACTIVE" && -z "$VIRTUAL_ENV" ]]; then
    echo "Neither PIPENV_ACTIVE nor VIRTUAL_ENV is set. Is the virtual enviroment active ? Stopping script." >&2
    return 1  # Stop script if neither variable exists
fi
#
./manage.py spectacular --color --file schema.yml --settings backend.settings.local
#

