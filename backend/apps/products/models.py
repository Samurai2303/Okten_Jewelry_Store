from django.db import models

from .services import upload_product_photo


class ProductModel(models.Model):
    class Meta:
        db_table = 'products'

    category = models.CharField(max_length=32)
    producer = models.CharField(max_length=32)
    material = models.CharField(max_length=32)
    length = models.IntegerField(default=0)
    clasp = models.CharField(max_length=32, blank=True)
    price = models.IntegerField()
    discounts = models.IntegerField(default=0)
    amount = models.IntegerField(default=0)
    solded = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)


class ProductPhotosModel(models.Model):
    class Meta:
        db_table = 'products_photos'

    photo = models.ImageField(upload_to=upload_product_photo, blank=True)
    product = models.ForeignKey('products.ProductModel', on_delete=models.CASCADE, related_name='photos')


class ProductWrapModel(models.Model):
    class Meta:
        db_table = 'product_wrap'

    product = models.ForeignKey('products.ProductModel', on_delete=models.CASCADE, related_name='orders')
    order = models.ForeignKey('orders.OrderModel', on_delete=models.CASCADE, related_name='product_wraps')
    amount = models.IntegerField()
