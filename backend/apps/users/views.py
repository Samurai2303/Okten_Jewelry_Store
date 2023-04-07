from typing import Type

from django.contrib.auth import get_user_model

from apps.products.serializers import ProductSerializer
from core.pagination.pagination_class import CustomPaginationClass
from core.services.email_service import EmailService
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .filters import UserFilters
from .models import UserModel as User
from .permissions import IsSuperUser
from .serializers import ProfileSerializer, UserSerializer

UserModel: Type[User] = get_user_model()


class ListCreateUsersView(ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    pagination_class = CustomPaginationClass
    filterset_class = UserFilters

    def get_permissions(self):
        if self.request.method == 'GET':
            return IsAdminUser(),
        return AllowAny(),

    # def get(self, *args, **kwargs):
    #     users = self.get_queryset()
    #     serializer = self.serializer_class(users, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class BlockUserView(GenericAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        return self.queryset.exclude(pk=self.request.user.pk)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        user.is_active = False
        user.save()
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ActivateUserView(GenericAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        return self.queryset.exclude(pk=self.request.user.pk)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        user.is_active = True
        user.save()
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetUserByIdView(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsAdminUser,)


class RetrieveUpdateLoggedUserView(GenericAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    def get_object(self):
        return self.request.user

    def get(self, *args, **kwargs):
        user = self.get_object()
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, *args, **kwargs):
        user = self.get_object()
        data = self.request.data
        files = self.request.FILES
        serializer = self.serializer_class(instance=user, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        for key in files:
            serializer1 = ProfileSerializer(instance=user.profile, data={'photo': files[key]}, partial=True)
            serializer1.is_valid(raise_exception=True)
            serializer1.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        data = self.request.data
        files = self.request.FILES
        serializer = self.serializer_class(instance=user, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        for key in files:
            serializer1 = ProfileSerializer(instance=user.profile, data={'photo': files[key]}, partial=True)
            serializer1.is_valid(raise_exception=True)
            serializer1.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class MakeAdminView(GenericAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsSuperUser,)

    def get_queryset(self):
        return self.queryset.exclude(pk=self.request.user.pk)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        user.is_staff = True
        user.save()
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MakeUserView(GenericAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsSuperUser,)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        user.is_staff = False
        user.save()
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FavoriteProductsView(GenericAPIView):
    serializer_class = ProductSerializer
    queryset = UserModel.objects.all()
    pagination_class = CustomPaginationClass

    def get(self, *args, **kwargs):
        user: UserModel = self.request.user
        serializer = UserSerializer(user)
        return Response(serializer.data['favorites'], status=status.HTTP_200_OK)

    def post(self, *args, **kwargs):
        user: UserModel = self.request.user
        product = self.request.data
        product = self.serializer_class(product)
        user.favorites.add(product)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, *args, **kwargs):
        user: UserModel = self.request.user
        product = self.request.data
        product = self.serializer_class(product)
        user.favorites.remove(product)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ForgotPasswordView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    def get(self, *args, **kwargs):
        email = kwargs.get('email')
        user = get_object_or_404(self.get_queryset(), email=email)
        EmailService.recovery_email(user)
        return Response(status=status.HTTP_200_OK)
