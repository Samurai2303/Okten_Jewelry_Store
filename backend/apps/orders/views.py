from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from backend.apps.products.serializers import ProductWrapSerializer

from .models import OrderModel
from .serializers import OrderSerializer


class ListCreateOrderView(GenericAPIView):
    serializer_class = OrderSerializer
    queryset = OrderModel.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            return IsAdminUser(),
        return IsAuthenticated(),

    def get(self, *args, **kwargs):
        orders = self.get_object()
        serializer = self.serializer_class(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, *args, **kwargs):
        user = self.request.user
        order: dict = self.request.data
        products = order.pop('products')

        order_serializer = self.serializer_class(data=order)
        order_serializer.is_valid(raise_exception=True)
        order_serializer.save(user=user)

        for product in products:
            amount = product.pop('amount')
            wrap_serializer = ProductWrapSerializer(data={'amount': amount})
            wrap_serializer.is_valid(raise_exception=True)
            wrap_serializer.save(product=product, order=order_serializer.data)

        return Response(order_serializer.data, status=status.HTTP_201_CREATED)
