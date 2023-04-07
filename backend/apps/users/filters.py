from typing import Type

from django.contrib.auth import get_user_model

from apps.users.models import UserModel as User
from django_filters import rest_framework as filters

UserModel: Type[User] = get_user_model()


class UserFilters(filters.FilterSet):
    email = filters.CharFilter(field_name='email', lookup_expr='iexact')
    is_active = filters.BooleanFilter(field_name='is_active', lookup_expr='exact')
    is_staff = filters.BooleanFilter(field_name='is_staff', lookup_expr='exact')

    class Meta:
        model = UserModel
        fields = ['email', 'is_active', 'is_staff']
