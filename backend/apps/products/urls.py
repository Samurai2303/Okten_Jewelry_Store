from django.urls import path

from .views import ListCreateProductView, RetrieveUpdateDestroyProductView

urlpatterns = [
    path('', ListCreateProductView.as_view()),
    path('/<int:pk>', RetrieveUpdateDestroyProductView.as_view()),

]