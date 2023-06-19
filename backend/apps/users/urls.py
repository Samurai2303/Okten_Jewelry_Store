from django.urls import path

from .views import (
    ActivateUserView,
    BlockUserView,
    GetFavoritesView,
    ForgotPasswordView,
    GetUserByIdView,
    ListCreateUsersView,
    MakeAdminView,
    MakeUserView,
    RetrieveUpdateLoggedUserView,
    AddDeleteFavoritesView
)

urlpatterns = [
    path('', ListCreateUsersView.as_view()),
    path('/<int:pk>', GetUserByIdView.as_view()),
    path('/<int:pk>/block', BlockUserView.as_view()),
    path('/<int:pk>/activate', ActivateUserView.as_view()),
    path('/retrieveUpdate', RetrieveUpdateLoggedUserView.as_view()),
    path('/<int:pk>/admin', MakeAdminView.as_view()),
    path('/<int:pk>/user', MakeUserView.as_view()),
    path('/favorites', GetFavoritesView.as_view()),
    path('/<int:pk>/favorites', AddDeleteFavoritesView.as_view()),
    path('/forgot_password/<str:email>', ForgotPasswordView.as_view()),
    
]
