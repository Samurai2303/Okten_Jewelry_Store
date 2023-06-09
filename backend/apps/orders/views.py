from apps.products.models import ProductModel, ProductWrapModel
from apps.products.serializers import ProductWrapSerializer
from core.pagination.pagination_class import CustomPaginationClass
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from .filters import OrderFilters
from .models import OrderModel
from .serializers import OrderSerializer


class ListCreateOrderView(ListCreateAPIView):
    serializer_class = OrderSerializer
    queryset = OrderModel.objects.all()
    pagination_class = CustomPaginationClass
    filterset_class = OrderFilters

    def get_permissions(self):
        if self.request.method == 'GET':
            return IsAdminUser(),
        return IsAuthenticated(),

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def post(self, *args, **kwargs):
        user = self.request.user
        order: dict = self.request.data

        try:
            products = order.pop('products')
        except (Exception,):
            return Response(f'Order must have a list of products', status=status.HTTP_400_BAD_REQUEST)

        order_serializer = self.serializer_class(data=order)
        order_serializer.is_valid(raise_exception=True)
        order_serializer = order_serializer.save(user=user)

        for product in products:
            amount = product.pop('amount')

            exists = ProductModel.objects.filter(pk=product['id']).exists()
            if not exists:
                return Response('Not found', status=status.HTTP_404_NOT_FOUND)
            product_instance = ProductModel.objects.get(pk=product['id'])

            wrap_serializer = ProductWrapSerializer(data={'amount': amount})
            wrap_serializer.is_valid(raise_exception=True)
            wrap_serializer.save(product=product_instance, order=order_serializer)

        order_serializer = OrderSerializer(order_serializer)

        return Response(order_serializer.data, status=status.HTTP_201_CREATED)


class GetOrderByIdView(GenericAPIView):
    serializer_class = OrderSerializer
    queryset = OrderModel.objects.all()

    def get(self, *args, **kwargs):
        user = self.request.user
        order: OrderModel = self.get_object()
        if user.is_staff or order.user == user:
            serializer = self.serializer_class(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        exception_msg = {"detail": "You do not have permission to perform this action."}
        return Response(exception_msg, status=status.HTTP_403_FORBIDDEN)


class GetUserOrdersView(GenericAPIView):
    serializer_class = OrderSerializer
    queryset = OrderModel.objects.all()
    pagination_class = CustomPaginationClass

    def get(self, *args, **kwargs):
        user = self.request.user
        orders = self.get_queryset().filter(user=user)
        serializer = self.serializer_class(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CancelOrderView(GenericAPIView):
    serializer_class = OrderSerializer
    queryset = OrderModel.objects.all()

    def post(self, *args, **kwargs):
        user = self.request.user
        order: OrderModel = self.get_object()
        if user.is_staff or order.user == user:
            order.status = 'Cancelled'
            order.save()
            serializer = self.serializer_class(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        exception_msg = {"detail": "You do not have permission to perform this action."}
        return Response(exception_msg, status=status.HTTP_403_FORBIDDEN)


class ConfirmOrderView(GenericAPIView):
    serializer_class = OrderSerializer
    queryset = OrderModel.objects.all()
    permission_classes = (IsAdminUser,)

    def post(self, *args, **kwargs):
        order: OrderModel = self.get_object()

        if order.status == 'Confirmed':
            serializer = self.serializer_class(order)
            return Response(serializer.data, status=status.HTTP_200_OK)

        data: dict = self.request.data
        try:
            delivery_number = data.pop('delivery_number')
        except (Exception,):
            return Response('field "delivery_number" is required', status=status.HTTP_400_BAD_REQUEST)
        order.delivery_number = delivery_number
        order.status = 'Confirmed'
        order.save()
        product_wraps = order.product_wraps.all()
        for product_wrap in product_wraps:
            product_wrap: ProductWrapModel = product_wrap
            product_wrap.product.amount = product_wrap.product.amount - product_wrap.amount
            product = product_wrap.product
            product.save()

        serializer = self.serializer_class(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
