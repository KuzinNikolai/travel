from rest_framework import serializers
from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth import get_user_model
from .models import *

User = get_user_model()

class CustomUserCreateSerializer(UserCreateSerializer):
    photo = serializers.ImageField(required=False)

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'password', 'first_name', 'last_name', 'photo')


class CustomUserSerializer(UserSerializer):
    photo = serializers.ImageField()

    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'photo')