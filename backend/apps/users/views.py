from typing import Type

from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import GenericAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from backend.apps.products.serializers import ProductSerializer

from .models import UserModel as User
from .permissions import IsSuperUser
from .serializers import UserSerializer

UserModel: Type[User] = get_user_model()


class ListCreateUsersView(GenericAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            return IsAdminUser(),
        return AllowAny(),

    def get(self, *args, **kwargs):
        users = self.queryset
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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


class RetrieveUpdateLoggedUserView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    def get_object(self):
        return self.request.user


class MakeAdminView(GenericAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsSuperUser,)

    def get_queryset(self):
        return self.queryset.exclude(pk=self.request.user.pk)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        user.is_admin = True
        user.save()
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MakeUserView(GenericAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsSuperUser,)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        user.is_admin = False
        user.save()
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FavoriteProductsView(GenericAPIView):
    serializer_class = ProductSerializer
    queryset = UserModel.objects.all()

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
