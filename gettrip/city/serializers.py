from rest_framework import serializers
from .models import *
from tour.models import *
from tour.serializers import *


class CityListSerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = ('id', 'name', 'title', 'slug', 'photo')


# Вывод города со списком туров в нем   
class CityDetailSerializer(serializers.ModelSerializer):

    tours = TourListSerializer(read_only=True, many=True)

    class Meta:
        model = City
        fields = ('id', 'name', 'title', 'description', 'tours', 'photo')


# Вывод category со списком туров в нем   
class CategoryDetailSerializer(serializers.ModelSerializer):

    tours = TourListSerializer(read_only=True, many=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'tours')