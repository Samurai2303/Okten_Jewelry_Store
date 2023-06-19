import os
from uuid import uuid1


def upload_product_photo(instance, file_name: str) -> str:
    ext = file_name.split('.')[-1]
    return os.path.join('products', f'{instance.product.id}', f'{uuid1()}.{ext}')
