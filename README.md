# Demonstrating how to use React with Django

This project for use in workshops etc to demonstrate an 'end-to-end' experience of using React on the front end and Django on the backend.



## Development Notes

### Pipenv/Virtualenv

This project makes use of pipenv so the virtualenv needs to be started in the pipenv way and there is no `requirements.txt`.


### Environmentally Aware Settings

Multiple settings files are defined to deal with different environments, they are all contained in `backend.settings` and need to be referenced when using the `manage.py` command. 


### Running backend locally 

Don't forget when running the dev server you have to enable access from outside the VM by modifying the default binding. It's also necessary to reference the relevant settings file.

Here's an example of doing that.

```
python manage.py runserver 0.0.0.0:8000 --settings=backend.settings.local
```

### Running frontend locally

```
yarn start
```
