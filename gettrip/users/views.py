from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from permissions import IsOwnerOrAdmin
from djoser.views import UserViewSet
from .serializers import CustomUserCreateSerializer, CustomUserSerializer
from rest_framework.generics import RetrieveUpdateAPIView


class CustomUserViewSet(UserViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'pk'
    permission_classes = [IsOwnerOrAdmin]

    def get_serializer_class(self):
        if self.action == 'create':
            return CustomUserCreateSerializer
        return CustomUserSerializer
    

class UserUpdateView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer 
    permission_classes = [IsOwnerOrAdmin]   
    


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsOwnerOrAdmin]  # Только аутентифицированные пользователи

    def get_object(self):
        # Получаем текущего пользователя
        return self.request.user

