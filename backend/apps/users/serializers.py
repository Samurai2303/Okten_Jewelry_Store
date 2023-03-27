from typing import Type

from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import BaseUserManager
from django.db import transaction

# from apps.products.serializers import ProductSerializer
from rest_framework.serializers import ModelSerializer

from .models import ProfileModel
from .models import UserModel as User

UserModel: Type[User] = get_user_model()


class PhotoSerializer(ModelSerializer):
    class Meta:
        model = ProfileModel
        fields = ('photo',)


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = ProfileModel
        fields = ('name', 'surname', 'age', 'phone', 'photo')


class UserSerializer(ModelSerializer, BaseUserManager):
    profile = ProfileSerializer()

    # favorites = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = UserModel
        fields = (
            'id', 'email', 'password', 'is_active', 'is_staff', 'is_superuser', 'created_at', 'updated_at',
            'last_login', 'profile', 'favorites')
        read_only_fields = ('id', 'is_active', 'is_staff', 'is_superuser', 'created_at', 'updated_at', 'last_login',
                            'favorites')
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    @transaction.atomic
    def create(self, validated_data: dict):
        profile = validated_data.pop('profile')
        user = UserModel.objects.create_user(**validated_data)
        ProfileModel.objects.create(**profile, user=user)
        return user

    def update(self, instance: UserModel, validated_data: dict):
        try:
            password = validated_data.pop('password')
            instance.set_password(password)
        except (Exception,):
            pass
        try:
            email = validated_data.pop('email')
            email = self.normalize_email(email)
            setattr(instance, 'email', email)
            instance.save()
        except (Exception,):
            pass

        try:
            profile = validated_data.pop('profile')
            profile = dict(profile)
            for key, value in profile.items():
                setattr(instance.profile, key, value)
            instance.save()
        except (Exception,):
            pass
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance


