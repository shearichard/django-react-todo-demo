"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os
import sys
#
from django.core.exceptions import ImproperlyConfigured
from dj_easy_log import load_loguru
#from loguru import logger
#from django import logger
#
from .utilities import generate_logging_config


###################################################################################
def get_env_variable(var_name):
    """Get the env var value or throw an exception"""
    try:
        return os.environ[var_name]
    except KeyError:
        error_msg = "Set the %s environment variable" % var_name
        raise ImproperlyConfigured(error_msg)


# #################################################################################
# The following conditional allows for the django_extensions options being shown
# when 'help' is executed. There may be a better way of doing this various ideas
# here https://stackoverflow.com/questions/1291755/how-can-i-tell-whether-my-django-application-is-running-on-development-server-or
# #################################################################################
#RUNNING_DEVSERVER = ((len(sys.argv) > 1 and sys.argv[1] == 'runserver') or (len(sys.argv) > 1 and sys.argv[1] == 'help'))
RUNNING_DEVSERVER = (get_env_variable("TODO_ACTIVATE_DEV_TOOLS") == "1")

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_env_variable("TODO_SECRET_KEY")

# Instead of sending emails for the moment just write them out to the file system
EMAIL_BACKEND = 'django.core.mail.backends.filebased.EmailBackend'
EMAIL_FILE_PATH = Path(BASE_DIR, '..','email_produced_in_development')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["0.0.0.0", "localhost", "127.0.0.1"]
#
# django-allauth config
# https://docs.djangoproject.com/en/dev/ref/settings/#site-id
SITE_ID = 1


#
# TEMPORARILY (AT LEAST) TURN HEADLESS_ONLY OFF TO ALLOW FOR
# 'PLAIN OLD DJANGO' USAGE
#
# Configure allauth so that it is suitable only for SPA/Mobile
# apps and so that views which are used only by conventional
# projects are suppressed. 
#
# More details here https://docs.allauth.org/en/latest/headless/introduction.html
#
#HEADLESS_ONLY = False

# HEADLESS_FRONTEND_URLS define where email confirmation and password reset mails 
# should link to if you do not wish them to be link to the allauth.account views
# but instead to a URL within the frontend app.
#
# https://docs.allauth.org/en/latest/headless/configuration.html
HEADLESS_FRONTEND_URLS = {
    "account_confirm_email": "/account/verify-email/{key}",
    "account_reset_password": "/account/password/reset",
    "account_reset_password_from_key": "/account/password/reset/key/{key}",
    "account_signup": "/account/signup",
    "socialaccount_login_error": "/account/provider/callback",
}

# Application definition
BASE_INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "django.contrib.humanize",
    # Third-party
    "corsheaders",
    "rest_framework",
    'drf_spectacular',
    'django_guid',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.openid_connect',
    'allauth.socialaccount.providers.google',
    "allauth.headless",
    "allauth.usersessions",
    # Local
    'todo',
    'users',
]
#'allauth.socialaccount.providers.google',
DEV_ONLY_INSTALLED_APPS = [
    'django_extensions',
]
#
if RUNNING_DEVSERVER:
    INSTALLED_APPS = BASE_INSTALLED_APPS + DEV_ONLY_INSTALLED_APPS
else:
    INSTALLED_APPS = BASE_INSTALLED_APPS
#
MIDDLEWARE = [
    "django_guid.middleware.guid_middleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
    "allauth.usersessions.middleware.UserSessionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

##########################
#import os.path
#PROJECT_PATH = os.path.realpath(os.path.dirname(__file__))
#...
#MEDIA_ROOT = os.path.join(PROJECT_PATH, 'media/')
#TEMPLATE_DIRS = [
#            os.path.join(BASE_DIR, 'templates/'),
#            ]
##########################



TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, '../templates/'),
            ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = "/static/"

##########################################################################
# We whitelist localhost:3000 because that's where frontend will be served
#
# NB: the value used here is different from the one shown in the original
#     blog post as the original value generated an error when used. Two
#     things were change, a scheme ('http') was added to the url and the
#     trailing slash shown in the blog post was removed
#
##########################################################################
CORS_ORIGIN_WHITELIST = ("http://localhost:3000",)
#
# Put a Primary Key on every model that doesn't
# otherwise define one.
#
# DEFAULT_AUTO_FIELD = True
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# https://docs.djangoproject.com/en/dev/topics/auth/customizing/#substituting-a-custom-user-model
AUTH_USER_MODEL = "users.CustomUser"


########################################################################
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
    "EXCEPTION_HANDLER": "drf_standardized_errors.handler.exception_handler",
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}
# Settings related to drf-spectacular START
SPECTACULAR_SETTINGS = {
    'TITLE': 'Todo Django/Next.js Integration API',
    'DESCRIPTION': 'Demo project for Django/Next.js integration',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}
# Settings related to drf-spectacular END 
# Settings related to dj_loguru START
'''

LOGGING = {
    'formatters': {
        'medium': {
            'format': '%(levelname)s %(asctime)s [%(correlation_id)s] %(name)s %(message)s'
        }
    },
    "formats": {
        "default": "<green>ts={time:YYYY-MM-DD HH:mm:ss.SSS}</green> |"
        " <level>level={level:<8}</level> |"
        " <cyan>file={file}</cyan> <cyan>module={module}</cyan> <cyan>func={function}</cyan> <cyan>line={line}</cyan>"
        " - <level>{message}</level>",
    },
    "sinks": {
        "console": {
            "output": sys.stderr,
            "format": "default",
            "level": "DEBUG",
        },
        "file": {
            "output": "/tmp/django-react-todo-demo-log.log",
            "format": "default",
            "level": "DEBUG",
            "rotation": "1 day",
        },
    },
    "loggers": {
        "dj_loguru": {
            "sinks": ["console", "file"],
            "level": "DEBUG",
            "propagate": True,
        },
    },
}
'''

'''
LOGGING_CONFIG = None
LOGGING = generate_logging_config(loglevel='INFO')
'''
# Django logging configuration with GUIDs
# Django logging configuration with file and console output, including GUIDs
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s [%(correlation_id)s] %(name)s %(message)s'
        },
    },
    'filters': {
        'correlation_id': {
            '()': 'django_guid.log_filters.CorrelationId'
        }
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'django-react-todo-demo.log',
            'formatter': 'verbose',
            'filters': ['correlation_id'],
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
            'filters': ['correlation_id'],
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': True,
        },
        'todo': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        'backend': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        "django.template": {
            "handlers": ["console"],
            "level": "DEBUG",
            "propagate": True,
        },
    },
}

# Settings related to dj_loguru STOP
#load_loguru(globals(), logging_config=generate_logging_config(loglevel='INFO'))

#   - Rotate daily at 23:59UTC. 
#   - Retain ten copies of old logs before discarding.
#   - After rotation zip the retained log files
#logger.add("neo_web_app.log", rotation="23:59", retention="10 days", compression="zip" )
#logger.add("neo_web_app.log", rotation="23:59", retention="1 day", compression="zip" )
#
# Settings specifically for allauth START
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    # `allauth` specific authentication methods, such as login by email
    'allauth.account.auth_backends.AuthenticationBackend',
]
#SOCIALACCOUNT_PROVIDERS = {
#    'google': {
#        'APP': {
#            'client_id': '123',
#            'secret': '456',
#            'key': ''
#        }
#    }
#}
#SOCIALACCOUNT_PROVIDERS = {
#    'google': {
#        'SCOPE': [
#            'profile',
#            'email',
#        ],
#        'AUTH_PARAMS': {
#            'access_type': 'offline',
#        },
#    }



SOCIALACCOUNT_PROVIDERS = {
	"google": {
		# For each OAuth based provider, either add a ``SocialApp``
		# (``socialaccount`` app) containing the required client
		# credentials, or list them here:
		"APPS": [
			{
				"client_id": get_env_variable("GOOGLE_CLIENT_ID"), 
				"secret": get_env_variable("GOOGLE_CLIENT_SECRET"),
				"key": "",
            },
		]
    },
	"openid_connect": {
      "APPS": [
          {
              "provider_id": "openstreetmap",
              "name": "OpenStreetMap",
              "client_id": get_env_variable("OPENSTREETMAP_CLIENT_ID"), 
              "secret": get_env_variable("OPENSTREETMAP_CLIENT_SECRET"),
              "settings": {
                  "server_url": "https://www.openstreetmap.org/.well-known/oauth-authorization-server",
                  "scope": ["openid", "read_prefs"],
				},
			},
		]
	},
}
ACCOUNT_AUTHENTICATED_LOGIN_REDIRECTS = False

# USERSESSIONS_TRACK_ACTIVITY
# Whether or not user sessions are kept updated. User sessions are 
# created at login time, but as the user continues to access the site 
# the IP address might change. Enabling this setting makes sure that 
# the session is kept track of, meaning, the IP address, user agent and 
# last seen timestamp are all kept up to date.
USERSESSIONS_TRACK_ACTIVITY = True
#
# Settings specifically for allauth STOP
