# DJANGO README
## Development Notes

### Pipenv/Virtualenv

This project makes use of pipenv so the virtualenv needs to be started in the pipenv way and there is no `requirements.txt`.


### Running backend locally 

Here's an example of running the a local Django instance.

```
python manage.py runserver 0.0.0.0:8000 --settings=backend.settings.local
```
### What URLs are available
The [Django Extensions package](https://django-extensions.readthedocs.io/en/latest/index.html) is installed as a dev tool and so available urls may be seen as follows 

```
python manage.py show_urls --settings backend.settings.local
```

### Environmentally Aware Settings

## Django Settings
Multiple settings files are defined to deal with different environments, they are all contained in `backend.settings` and need to be referenced when using the `manage.py` command. 

## Django - Use of Environmental Variables
Secrets are kept in environmental variables.

The use of the [direnv utility](https://direnv.net), in conjunction with a .envrc file, results in the environmental variables being autoloaded when the current directory is the project root (or child directories of that).

The .envrc file is not committed to the repos but the .envrc_TEMPLATE file, which is committed, provides guidance on what should appear in the .envrc.

## Regenerating Django Secret Key
If you wish to regenerate the Django secret key that can be done as follows.
```
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

# Static Analysis
Static code analysis is done using [flake8](https://flake8.pycqa.org/en/latest/#).

## Executing the analysis

A `.flake8` configuration file controls how flake8 behaves, amongst other thing this configuration file allows some warnings to be suppressed and this is sometimes an appropriate action.

Execute the following from the project root directory.

```default
$ flake8 ./
```


# Testing 
This project uses pytest and, once the virtual environment is invoked and the working directory made to be the directory containing 'manage.py', the tests can be run as follows.

```default
$ pytests
```

# Standardised Errors
This project uses [drf-standardized-errors](https://github.com/ghazi-git/drf-standardized-errors) to approach the [RFC-7807](https://www.rfc-editor.org/rfc/rfc7807) standard for standardised errors.

Here's an example of it in use, in a POST with an empty payload.

```
$ curl -X POST http://localhost:8000/api/v1/todos/ -H "Content-Type: application/json" -d {} | jq
{
  "type": "validation_error",
  "errors": [
    {
      "code": "required",
      "detail": "This field is required.",
      "attr": "title"
    }
  ]
}
```

NOTE: There is an alternative library which covers similar ground, [drf-problems](https://github.com/shivanshs9/drf-problems/), but when last tested, August 2024, didn't work as expected.

