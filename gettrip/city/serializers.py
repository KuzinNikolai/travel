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
        fields = ('id', 'name', 'title', 'slug', 'description', 'tours', 'photo')


# Сериализатор для английской версии города
class CityDetailSerializerEn(serializers.ModelSerializer):

    tours = TourListSerializer(read_only=True, many=True)

    class Meta:
        model = City
        fields = ('id', 'name_en', 'title_en', 'slug', 'description_en', 'tours', 'photo')        


# Вывод category со списком туров в нем   
class CategoryDetailSerializer(serializers.ModelSerializer):

    tours = TourListSerializer(read_only=True, many=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'tours')