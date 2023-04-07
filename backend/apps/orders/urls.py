from django.urls import path

from .views import CancelOrderView, ConfirmOrderView, GetOrderByIdView, GetUserOrdersView, ListCreateOrderView

urlpatterns = [
    path('', ListCreateOrderView.as_view()),
    path('/<int:pk>', GetOrderByIdView.as_view()),
    path('/user_orders', GetUserOrdersView.as_view()),
    path('/<int:pk>/cancel', CancelOrderView.as_view()),
    path('/<int:pk>/confirm', ConfirmOrderView.as_view())
]
