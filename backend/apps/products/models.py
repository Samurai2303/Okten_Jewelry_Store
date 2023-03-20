from django.db import models

from backend.apps.orders.models import OrderModel

from .services import upload_product_photo


class ProductModel(models.Model):
    class Meta:
        db_table = 'products'

    category = models.CharField(max_length=32)
    material = models.CharField(max_length=32)
    length = models.IntegerField()
    clasp = models.CharField(max_length=32)
    price = models.IntegerField()
    discounts = models.IntegerField()
    amount = models.IntegerField()
    solded = models.IntegerField()


class ProductPhotosModel(models.Model):
    class Meta:
        db_table = 'products_photos'

    photo = models.ImageField(upload_to=upload_product_photo, blank=True)
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE, related_name='photos')


class ProductWrapModel(models.Model):
    class Meta:
        db_table = 'product_wrap'

    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE, related_name='orders')
    order = models.ForeignKey(OrderModel, on_delete=models.CASCADE, related_name='product_wraps')
    amount = models.IntegerField()
