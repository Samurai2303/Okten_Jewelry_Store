from django_filters import rest_framework as filters

from .models import OrderModel


class OrderFilters(filters.FilterSet):
    status = filters.CharFilter(field_name='status', lookup_expr='iexact')
    delivery_number = filters.CharFilter(field_name='delivery_number', lookup_expr='iexact')
    delivery_place = filters.CharFilter(field_name='delivery_place', lookup_expr='iexact')
    delivery_place_in = filters.BaseInFilter(field_name='delivery_place', lookup_expr='in')
    user_id = filters.NumberFilter(field_name='user_id', lookup_expr='exact')

    class Meta:
        model = OrderModel
        fields = ['status', 'delivery_number', 'delivery_place', 'user_id']
