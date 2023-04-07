from typing import Type

from django.contrib.auth import get_user_model

from apps.users.models import UserModel as User
from rest_framework.serializers import ModelSerializer

UserModel: Type[User] = get_user_model()


class PasswordSerializer(ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('password',)
