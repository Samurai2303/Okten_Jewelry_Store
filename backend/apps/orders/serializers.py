from apps.products.serializers import ProductWrapSerializer
from apps.users.serializers import UserSerializer
from rest_framework.serializers import ModelSerializer

from .models import OrderModel


class OrderSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    product_wraps = ProductWrapSerializer(read_only=True, many=True)

    class Meta:
        model = OrderModel
        fields = ('id', 'status', 'delivery_number', 'delivery_place', 'comment', 'price', 'created_at', 'user',
                  'product_wraps')

    def create(self, validated_data: OrderModel):
        validated_data.status = 'Created'
        return super().create(validated_data)
