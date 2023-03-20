from typing import Type

from django.contrib.auth import get_user_model
from django.db import transaction

from rest_framework.serializers import ModelSerializer

from backend.apps.products.serializers import ProductSerializer

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


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer()
    favorites = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = UserModel
        fields = (
            'id', 'email', 'password', 'is_active', 'is_admin', 'is_superuser', 'created_at', 'updated_at',
            'last_login', 'profile', 'favorites')
        read_only_fields = ('id', 'is_active', 'is_admin', 'is_superuser', 'created_at', 'updated_at', 'last_login',
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
