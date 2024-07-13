from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics

from .models import *
from .serializers import *


class CountryListView(generics.ListAPIView):
    queryset = Country.objects.all().prefetch_related('cities')
    serializer_class = CountryListSerializer
    

class CountryDetailView(generics.RetrieveAPIView):
    queryset = Country.objects.all()
    serializer_class = CountryDetailSerializer
    lookup_field = 'slug'  # Указываем поле для поиска объекта по slug

    def get_object(self):
        slug = self.kwargs.get('slug')
        return get_object_or_404(Country, slug=slug)
