"""
A set of utilities to support processing in the 'settings' module
"""

import base64
import os

from django.conf import settings


def areEnvVarsBase64Encoded(potentially_b64_string):
    """
    As of 0.3.3 string like Env Vars will be base64 encoded.
    It's assumed that if one Env Var is base64 encoded then all
    those which might be, are.

    In a later release these env vars might revert to being plain
    old strings so in this function a test is done which will be used
    to set a module level constant for use in all parts of this module
    where env vars that might be base64 encoded are accessed.

    Although the mechanism for testing whether base64 is present is not
    perfect applying it to 'SECRET_KEY' will allow it to work properly
    """

    return isBase64(potentially_b64_string)


def isBase64(potentially_b64_string):
    """
    Decode and then re-encode the input string. If the
    result matches the input string it's assumed that
    the input was in base64. This is now a flawless
    mechanism but for our purposes will work well enough
    """
    try:
        if isinstance(potentially_b64_string, str):
            # If there's any unicode here, an exception will be
            # thrown of type UnicodeEncodeError and the function will return false
            try:
                decoded_input_as_byte_like_object = bytes(
                    potentially_b64_string, "ascii"
                )
            except UnicodeEncodeError:
                return False
            except Exception:
                raise
        elif isinstance(potentially_b64_string, bytes):
            decoded_input_as_byte_like_object = potentially_b64_string
        else:
            raise ValueError("Argument must be string or bytes")
        #
        return (
            base64.b64encode(base64.b64decode(decoded_input_as_byte_like_object)) == decoded_input_as_byte_like_object
        )
    except Exception as e:
        # An error caught here is suggestive of a 'real' problem
        # rather than the input string not being base64
        print(e)
        return False


def generate_logging_config(loglevel):

	return generate_logging_config_todos(loglevel)

def generate_logging_config_todos(loglevel):

    lg_cnfg = {
        "version": 1,
        "disable_existing_loggers": True,
        "formatters": {
            "medium": {
                "format": "%(levelname)s %(asctime)s [%(correlation_id)s] %(name)s %(message)s"
            }
        },
        "filters": {
            'correlation_id': {
                '()': 'django_guid.log_filters.CorrelationId'
            }
        },
        "handlers": {
            "console": {
                "level": loglevel,
                "class": "logging.NullHandler",
                "formatter": "medium",
                'filters': ['correlation_id'],
            }
        },
        "loggers": {
            "django": {
                "handlers": ["console"],
                "propagate": True,
            }
        },
    }


    return lg_cnfg


def generate_logging_config_baseline(loglevel):
    """
	This version of the config was borrowed from another project
	and I'm not sure it's relevant to todos, however I'm leaving
	it here as a reference point until the 'real' config has 
	stabilised.
    """

    """
    Generates a logging config for use with django-easy-logging
    ( https://loguru.readthedocs.io/en/stable/index.html )
    """

    STYLE_USE_CID = 0
    STYLE_USE_GUID = 1
    GUID_PACKAGE = 0

    lg_cnfg = {
        "version": 1,
        "disable_existing_loggers": True,
        "formatters": {
            "simple": {
                "format": "{message}",
                "style": "{",
            },
        },
        "filters": {},
        "handlers": {
            "console": {
                "level": loglevel,
                "class": "logging.NullHandler",
                "formatter": "simple",
            }
        },
        "loggers": {
            "django": {
                "handlers": ["console"],
                "propagate": True,
            }
        },
    }


    if True and (GUID_PACKAGE == STYLE_USE_CID):
        # For the moment we're always going to want the correlation id in the log output
        # hence the 'TRUE', in the longer term it will be controlled by a env var
        #
        # The changes made to accomodate this are documented here
        # https://django-correlation-id.readthedocs.io/en/latest/installation.html#inclusion-of-the-correlation-id-in-logs
        #
        # lg_cnfg['formatters']['simple']['format'] = '[cid: %(cid)s] {message}'
        lg_cnfg["formatters"]["simple"]["format"] = "[cid: %(correlation)s] {message}"
        #
        lg_cnfg["filters"]["correlation"] = {}
        lg_cnfg["filters"]["correlation"]["()"] = "cid.log.CidContextFilter"
        #
        lg_cnfg["loggers"]["django"]["filters"] = ["correlation"]
        #
        lg_cnfg["root"] = {}
        lg_cnfg["root"]["level"] = "INFO"
        lg_cnfg["root"]["handlers"] = ["console"]
        lg_cnfg["root"]["filters"] = ["correlation"]
    #
    if True and (GUID_PACKAGE == STYLE_USE_GUID):
        # https://django-guid.readthedocs.io/en/latest/configuration.html
        pass

    return lg_cnfg


def get_logging_level():
    if settings.get("DEBUG"):
        loglevel = os.environ.get("LOGLEVEL", "INFO")
    else:
        loglevel = os.environ.get("LOGLEVEL", "ERROR")
    #
    return loglevel
