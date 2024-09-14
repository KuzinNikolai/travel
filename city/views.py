from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Prefetch
from filter import *

from .models import *
from tour.models import *
from .serializers import *


class CityListView(generics.ListAPIView):
    queryset = City.objects.all()
    serializer_class = CityListSerializer

    def get_serializer_context(self):
        return {'request': self.request}
        
    def get_queryset(self):
        return City.objects.filter(is_published=Status.PUBLISHED)    
    

class CityDetailView(generics.RetrieveAPIView):
    queryset = City.objects.all()
    serializer_class = CityDetailSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CityFilter
    lookup_field = 'slug'
    
    def get_queryset(self):
        return City.objects.all().prefetch_related(
            Prefetch(
                'tours',
                queryset=Tour.published.all()
            )
        )


class CategoryDetailView(ListAPIView):
    serializer_class = TourListSerializer

    def get_queryset(self):
        city_slug = self.kwargs.get('city_slug')
        cat_slug = self.kwargs.get('cat_slug')

        # Получаем все туры, принадлежащие выбранной категории
        tours = Tour.objects.filter(category__slug=cat_slug)

        # Фильтруем туры по выбранному городу
        tours_in_city = tours.filter(city__slug=city_slug)

        return tours_in_city
