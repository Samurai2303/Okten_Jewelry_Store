from typing import Type

from django.contrib.auth import get_user_model
from django.db import models

from backend.apps.users.models import UserModel as User

UserModel: Type[User] = get_user_model()


class OrderModel(models.Model):
    class Meta:
        db_table = 'Orders'

    status = models.CharField(max_length=16, default='created')
    delivery_number = models.CharField(max_length=20, blank=True)
    delivery_place = models.CharField(max_length=48)
    comment = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='orders')
