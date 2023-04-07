from core.enums.exception_enum import ExceptionEnum
from core.exceptions.jwt_exception import JWTException
from rest_framework.response import Response
from rest_framework.views import exception_handler


def custom_error_handler(exc: Exception, context: dict) -> Response:
    handlers = {
        'JWTException': __jwt_exception
    }

    exc_class = exc.__class__.__name__

    if exc_class in handlers:
        return handlers[exc_class](exc, context)

    return exception_handler(exc, context)


def __jwt_exception(exc: JWTException, context: dict) -> Response:
    return Response(ExceptionEnum.JWT.msg, ExceptionEnum.JWT.code)
