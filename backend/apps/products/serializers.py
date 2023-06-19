from rest_framework.serializers import ModelSerializer

from .models import ProductModel, ProductPhotosModel, ProductWrapModel


class ProductPhotoSerializer(ModelSerializer):
    class Meta:
        model = ProductPhotosModel
        fields = ('id', 'photo')

    def to_representation(self, instance: ProductPhotosModel):
        return {
            "id": instance.id,
            "photo": instance.photo.url
        }


class ProductSerializer(ModelSerializer):
    photos = ProductPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = ProductModel
        fields = (
            'id', 'created_at', 'category', 'producer', 'material', 'length', 'clasp', 'price', 'discounts', 'amount', 'solded',
            'photos')


class ProductWrapSerializer(ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = ProductWrapModel
        fields = ('id', 'amount', 'product')
