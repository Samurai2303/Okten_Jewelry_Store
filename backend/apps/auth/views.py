from apps.users.serializers import UserSerializer
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import PasswordSerializer


class ActivateUserByTokenView(GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, *args, **kwargs):
        token = kwargs.get('token')
        user = JWTService.validate_token(token, ActivateToken)
        user.is_active = True
        user.save()
        return Response(status=status.HTTP_200_OK)


class RecoveryPasswordView(GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )

    def post(self, *args, **kwargs):
        token = kwargs.get('token')
        data = self.request.data
        password = PasswordSerializer(data=data)
        password.is_valid(raise_exception=True)

        user = JWTService.validate_token(token, RecoveryToken)
        user.set_password(data['password'])
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
