from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_kwargs):
        extra_kwargs['is_active'] = False

        if not email:
            raise ValueError('The email is required')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_kwargs):
        extra_kwargs.setdefault('is_admin', True)
        extra_kwargs.setdefault('is_superuser', True)

        if not extra_kwargs.get('is_admin'):
            raise ValueError('is_admin field must be True')
        if not extra_kwargs.get('is_superuser'):
            raise ValueError('is_superuser field must be True')

        user = self.create_user(email, password, **extra_kwargs)
        return user
