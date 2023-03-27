from django.urls import path

from .views import AddProductPhoto, DeleteProductPhotoByIdView, ListCreateProductView, RetrieveUpdateDestroyProductView

urlpatterns = [
    path('', ListCreateProductView.as_view()),
    path('/<int:pk>', RetrieveUpdateDestroyProductView.as_view()),
    path('/<int:pk>/photo', AddProductPhoto.as_view()),
    path('/delete_photo/<int:pk>', DeleteProductPhotoByIdView.as_view()),

]
