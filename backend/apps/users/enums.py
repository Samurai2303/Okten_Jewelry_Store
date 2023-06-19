from enum import Enum


class RegEx(Enum):
    PHONE = (
        r'(?=.*\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4,5}$)',
        'incorrect phone number'
    )
    PASSWORD = (
        r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s])(?=.*[\d])[^\s]{5,20}$',
        [
            'password must have at least 1 lowercase letter',
            'password must have at least 1 uppercase letter',
            'password must have at least 1 number',
            'password must have at least 1 special symbol',
        ]
    )
    NAME = (
        r'^[a-zA-Z]{2,16}$',
        'Name must contain only letters and be between 2 and 16 characters long'
    )
    SURNAME = (
        r'^[a-zA-Z]{2,24}$',
        'Surname must contain only letters and be between 2 and 24 characters long'
    )

    def __init__(self, pattern: str, msg: str | list[str]):
        self.pattern = pattern
        self.msg = msg
