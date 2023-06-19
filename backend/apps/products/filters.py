from django_filters import rest_framework as filters

from .models import ProductModel


class NumberRangeFilter(filters.BaseRangeFilter, filters.NumberFilter):
    pass


class ProductFilters(filters.FilterSet):
    category = filters.CharFilter(field_name='category', lookup_expr='iexact')
    category_in = filters.BaseInFilter(field_name='category', lookup_expr='in')
    producer = filters.CharFilter(field_name='producer', lookup_expr='iexact')
    producer_in = filters.BaseInFilter(field_name='producer', lookup_expr='in')
    material = filters.CharFilter(field_name='material', lookup_expr='iexact')
    material_in = filters.BaseInFilter(field_name='material', lookup_expr='in')
    length_gte = filters.NumberFilter(field_name='length', lookup_expr='gte')
    length_lte = filters.NumberFilter(field_name='length', lookup_expr='lte')
    length_range = NumberRangeFilter(field_name='length', lookup_expr='range')
    clasp = filters.CharFilter(field_name='clasp', lookup_expr='iexact')
    clasp_in = filters.BaseInFilter(field_name='clasp', lookup_expr='in')
    price_gte = filters.NumberFilter(field_name='price', lookup_expr='gte')
    price_lte = filters.NumberFilter(field_name='price', lookup_expr='lte')
    price_range = NumberRangeFilter(field_name='price', lookup_expr='range')
    discounts_gte = filters.NumberFilter(field_name='discounts', lookup_expr='gte')
    discounts_lte = filters.NumberFilter(field_name='discounts', lookup_expr='lte')
    discounts_range = NumberRangeFilter(field_name='discounts', lookup_expr='range')
    amount_gte = filters.NumberFilter(field_name='amount', lookup_expr='gte')
    amount_lte = filters.NumberFilter(field_name='amount', lookup_expr='lte')
    solded_gte = filters.NumberFilter(field_name='solded', lookup_expr='gte')
    solded_lte = filters.NumberFilter(field_name='solded', lookup_expr='lte')

    class Meta:
        model = ProductModel
        fields = ['category', 'producer', 'material', 'length', 'clasp', 'price', 'discounts', 'amount', 'solded']
