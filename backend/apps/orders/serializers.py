from rest_framework.serializers import ModelSerializer

from backend.apps.users.serializers import UserSerializer

from .models import OrderModel


class OrderSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = OrderModel
        fields = ('id', 'status', 'delivery_number', 'delivery_place', 'comment', 'created_at')
