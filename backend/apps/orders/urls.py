from django.urls import path

from .views import GetOrderByIdView, ListCreateOrderView

urlpatterns = [
    path('', ListCreateOrderView.as_view()),
    path('/<int:pk>', GetOrderByIdView.as_view()),
]
