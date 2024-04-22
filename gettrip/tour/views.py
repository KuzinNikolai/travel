from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly, IsOwnerOnly
from django_filters.rest_framework import DjangoFilterBackend
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