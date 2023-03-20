import os
from uuid import uuid1


def upload_user_photo(instance, file_name: str) -> str:
    ext = file_name.split('.')[-1]
    return os.path.join('users', f'{instance.user.email}', 'photo', f'{uuid1()}.{ext}')
