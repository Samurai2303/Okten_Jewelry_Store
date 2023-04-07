from enum import Enum

from rest_framework import status


class ExceptionEnum(Enum):
    JWT = ({'details': 'token invalid or expired'}, status.HTTP_400_BAD_REQUEST)

    def __init__(self, msg: dict, code=status.HTTP_400_BAD_REQUEST):
        self.msg = msg
        self.code = code
