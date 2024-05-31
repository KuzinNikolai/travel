from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    photo = models.ImageField(upload_to='users/avatar', blank=True, null=True, verbose_name='Аватар')
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'photo']
