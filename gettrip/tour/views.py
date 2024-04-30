from django.http import Http404
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly, IsOwnerOnly, IsOwnerOrderOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import render
from filter import *

from .models import *
from .serializers import *


class TourListView(generics.ListAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourListSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TourFilter  
    
    
# Добавление тура   
class TourCreateView(generics.CreateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourCreateSerializer 
    permission_classes = (IsAdminOrReadOnly, )   
        
    def post(self, request):
        serializer = TourCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()    
            return Response({'tours': serializer.data}, status=status.HTTP_201_CREATED)
        
        # Если данные неверны, возвращаем сообщение об ошибке
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
# Подробная информация о туре
class TourDetailView(generics.RetrieveAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourDetailSerializer
    lookup_field = 'slug'


# Подробная информация о туре и возможность редактировать
class TourUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourUpdateSerializer
    permission_classes = (IsOwnerOrReadOnly, )


# Вывод туров только для автора
class MyOffersListView(generics.ListAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourListSerializer

    def get_queryset(self):
        # Получаем всех туры
        queryset = Tour.objects.all()

        # Если пользователь аутентифицирован (вошел в систему),
        # отфильтровываем только те туры, которые добавил текущий пользователь
        if self.request.user.is_authenticated:
            queryset = queryset.filter(author=self.request.user)

        return queryset 
    

class CategoryView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer
    filter_backends = (DjangoFilterBackend,)


class CategoryTourView(generics.ListAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourListSerializer
    filter_backends = (DjangoFilterBackend,) 


# VIEWS ORDERS ------------------------------

class OrderCreateAPIView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers) 


class OrderUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsOwnerOrderOnly, )


# Вывод заказов только для пользователя автора
class MyOrdersListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsOwnerOrderOnly] 

    def get_queryset(self):
        # Фильтруем queryset, чтобы пользователь видел только свои заказы
        user = self.request.user
        if not user.is_authenticated:
            raise PermissionDenied("Для просмотра заказов необходимо войти в систему")  # Вызываем исключение PermissionDenied
        return Order.objects.filter(user=user)

    # Обработка исключения PermissionDenied
    def handle_permission_denied(self, exc):
        return Response({"error": str(exc)}, status=status.HTTP_403_FORBIDDEN)

    def dispatch(self, request, *args, **kwargs):
        try:
            return super().dispatch(request, *args, **kwargs)
        except PermissionDenied as exc:
            return self.handle_permission_denied(exc)

# VIEWS ORDERS END ------------------------------    


# VIEWS REVIEWS ------------------------------
class ReviewCreateAPIView(generics.CreateAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewSerializer
    lookup_field = 'slug'
# VIEWS REVIEWS END ------------------------------


# VIEWS ADD TO WISHLIST ------------------------------
class AddToWishlistView(generics.CreateAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = AddToWishlistSerializer
    lookup_field = 'slug'

    def create(self, request, *args, **kwargs):
        # Проверяем, существует ли уже объект вишлиста для этого тура и текущего пользователя
        if Wishlist.objects.filter(user=request.user, tour__slug=request.data.get('slug')).exists():
            return Response({"detail": "Этот тур уже добавлен в избранное."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)  # Сохраняем пользователя, отправившего запрос
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    


class WishlistListView(generics.ListAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [IsOwnerOrderOnly]

    def get_queryset(self):
        # Фильтруем queryset, чтобы пользователь видел только свои заказы
        user = self.request.user
        if not user.is_authenticated:
            raise PermissionDenied("Для просмотра сохраненных туров необходимо войти в систему")  # Вызываем исключение PermissionDenied
        return Wishlist.objects.filter(user=user)

    # Обработка исключения PermissionDenied
    def handle_permission_denied(self, exc):
        return Response({"error": str(exc)}, status=status.HTTP_403_FORBIDDEN)

    def dispatch(self, request, *args, **kwargs):
        try:
            return super().dispatch(request, *args, **kwargs)
        except PermissionDenied as exc:
            return self.handle_permission_denied(exc)
    


class RemoveFromWishlistView(generics.DestroyAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = (IsOwnerOrderOnly, )

    def get_queryset(self):
        # Ограничиваем запросы только элементами вишлиста текущего пользователя
        return self.queryset.filter(user=self.request.user)    
# VIEWS ADD TO WISHLIST END ------------------------------

      