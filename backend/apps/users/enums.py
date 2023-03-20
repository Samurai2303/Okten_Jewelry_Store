from enum import Enum


class RegEx(Enum):
    PHONE = (
        r'(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)',
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
        r'^[a-zA-Z]{2-16}$',
        'Name must contain only letters. Length from 2 to 16 symbols'
    )
    SURNAME = (
        r'^[a-zA-Z]{2-24}$',
        'Surname must contain only letters. Length from 2 to 24 symbols'
    )
    
    def __init__(self, pattern:str, msg:str|list[str]):
        self.pattern = pattern
        self.msg = msg
        
        