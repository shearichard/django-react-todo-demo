# Demonstrating how to use React with Django

This project for use in workshops etc to demonstrate an 'end-to-end' experience of using React on the front end and Django on the backend.

To demonstrate the project in use it's necessary to start both a Django instance and to use the react development server. Notes on how to do this are below.


![image](https://user-images.githubusercontent.com/403435/134493433-793c42e3-eca2-4f9c-a3b7-e2151ec7b9f6.png)







## Development Notes

### Pipenv/Virtualenv

This project makes use of pipenv so the virtualenv needs to be started in the pipenv way and there is no `requirements.txt`.


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

### Environmentally Aware Settings

Multiple settings files are defined to deal with different environments, they are all contained in `backend.settings` and need to be referenced when using the `manage.py` command. 


