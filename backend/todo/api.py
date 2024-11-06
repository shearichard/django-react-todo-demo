from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import (  # noqa : F401
    APIException,
    ErrorDetail,
    PermissionDenied,
    ValidationError,
    NotAcceptable,
)
from loguru import logger



class APIHealthView(APIView):
    def get(self, request):
        content = {"status": "OK"}
        logger.info("APIHealthView", content)
        return Response(content)

    
class APIHealthViewMockedFailure(APIView):
    """
    See also https://drf-standardized-errors.readthedocs.io/en/latest/error_response.html#multiple-errors-support
    """

    def get(self, request):
        logger.error("APIHealthViewMockedFailure")
        #
        raise ValidationError(
            {
                "name": [
                    ErrorDetail(
                        "This field is required-a.",
                        code="http://localhost:8000/foo/bar/2",
                    ),
                    ErrorDetail(
                        "This field is required-b.",
                        code="http://localhost:8000/foo/bar/3",
                    ),
                ]
            }
        )

