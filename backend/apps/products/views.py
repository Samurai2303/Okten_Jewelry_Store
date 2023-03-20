from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import ProductModel
from .serializers import ProductPhotoSerializer, ProductSerializer


class ListCreateProductView(ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = ProductModel.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            return AllowAny(),
        return IsAdminUser(),

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


    