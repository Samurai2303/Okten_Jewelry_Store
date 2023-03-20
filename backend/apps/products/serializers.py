from rest_framework.serializers import ModelSerializer

from backend.apps.orders.serializers import OrderSerializer

from .models import ProductModel, ProductPhotosModel, ProductWrapModel


class ProductPhotoSerializer(ModelSerializer):
    class Meta:
        model = ProductPhotosModel
        fields = ('photo',)

    def to_representation(self, instance: ProductPhotosModel):
        return instance.photo.url


class ProductSerializer(ModelSerializer):
    photo = ProductPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = ProductModel
        fields = ('id', 'category', 'material', 'length', 'clasp', 'price', 'discounts', 'amount', 'solded')


class ProductWrapSerializer(ModelSerializer):
    product = ProductSerializer(read_only=True)
    order = OrderSerializer(read_only=True)

    class Meta:
        model = ProductWrapModel
        fields = ('id', 'amount')
