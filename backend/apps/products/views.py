from core.pagination.pagination_class import CustomPaginationClass
from rest_framework import status
from rest_framework.generics import DestroyAPIView, GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .filters import ProductFilters
from .models import ProductModel, ProductPhotosModel
from .serializers import ProductPhotoSerializer, ProductSerializer


class ListCreateProductView(ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = ProductModel.objects.all()
    pagination_class = CustomPaginationClass
    filterset_class = ProductFilters

    def get_permissions(self):
        if self.request.method == 'GET':
            return AllowAny(),
        return IsAdminUser(),

    def post(self, *args, **kwargs):
        data = self.request.data
        files = self.request.FILES
        product = ProductSerializer(data=data)
        product.is_valid(raise_exception=True)
        product.save()
        for key in files:
            serializer = ProductPhotoSerializer(data={'photo': files[key]})
            serializer.is_valid(raise_exception=True)
            serializer.save(product=product)
        return Response(product.data, status=status.HTTP_200_OK)


class RetrieveUpdateDestroyProductView(RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    queryset = ProductModel.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            return AllowAny(),
        return IsAdminUser(),


class AddProductPhoto(GenericAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer

    def post(self, *args, **kwargs):
        product = self.get_object()
        files = self.request.FILES
        for key in files:
            serializer = ProductPhotoSerializer(data={'photo': files[key]})
            serializer.is_valid(raise_exception=True)
            serializer.save(product=product)
        serializer = self.serializer_class(product)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DeleteProductPhotoByIdView(DestroyAPIView):
    serializer_class = ProductPhotoSerializer
    queryset = ProductPhotosModel.objects.all()
    permission_classes = (IsAdminUser,)
