# Using React with Django

Building a Django app which uses React on the front end.

Based on the steps provided [here](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react).

## Development Notes

### Pipenv/Virtualenv

This project makes use of pipenv so the virtualenv need to be started in the pipenv way and there is no `requirements.txt`.


### Environmentally Aware Settings

Multiple settings files are defined to deal with different environements, they are all contained in `backend.settings` and need to be referenced when using the `manage.py` command. 


### Running backend locally 

Don't forget when running the dev server you have to enable access from outside the VM by modifying the default binding. It's also necessary to reference the relevant settings file.

```
python manage.py runserver 0.0.0.0:8000 --settings=backend.settings.local
```

### Running frontend locally

```
yarn start
```
