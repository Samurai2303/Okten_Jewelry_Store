from datetime import timedelta
from enum import Enum


class ActionEnum(Enum):
    ACTIVATE = ('activate', timedelta(days=30))
    RECOVERY = ('recovery', timedelta(days=1))

    def __init__(self, token_type, lifetime):
        self.token_type = token_type
        self.lifetime = lifetime
