from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core import validators as V
from django.db import models

from .enums import RegEx
from .managers import UserManager
from .services import upload_user_photo


class UserModel(AbstractBaseUser, PermissionsMixin):
    class Meta:
        db_table = 'auth_user'

    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, validators=[
        V.RegexValidator(RegEx.PASSWORD.pattern, RegEx.PASSWORD.msg)
    ])
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    favorites = models.ManyToManyField('products.ProductModel', through='UsersProductsModel', related_name='users')

    USERNAME_FIELD = 'email'

    objects = UserManager()


class ProfileModel(models.Model):
    class Meta:
        db_table = 'profiles'

    name = models.CharField(max_length=16, validators=[
        V.RegexValidator(RegEx.NAME.pattern, RegEx.NAME.msg)
    ])
    surname = models.CharField(max_length=24, validators=[
        V.RegexValidator(RegEx.SURNAME.pattern, RegEx.SURNAME.msg)
    ])
    age = models.IntegerField(validators=[
        V.MinValueValidator(14, 'Minimal age is 14'),
        V.MaxValueValidator(99, 'Maximum age is 99')
    ])
    phone = models.CharField(max_length=18, validators=[
        V.RegexValidator(RegEx.PHONE.pattern, RegEx.PHONE.msg)
    ])
    photo = models.ImageField(upload_to=upload_user_photo, blank=True)
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='profile')


class UsersProductsModel(models.Model):
    class Meta:
        db_table = 'users_products'

    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    product = models.ForeignKey('products.ProductModel', on_delete=models.CASCADE)
