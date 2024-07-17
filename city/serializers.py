from rest_framework import serializers
from .models import *
from tour.models import *
from tour.serializers import *
# from country.serializers import *


class CityListSerializer(serializers.ModelSerializer):

    tour_count = serializers.SerializerMethodField()
    popular_tours = serializers.SerializerMethodField()
    photo_alt = serializers.SerializerMethodField()
    country = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = City
        fields = ('id', 'name', 'title', 'slug', 'meta_desc', 'description', 'photo', 'photo_alt', 'tour_count', 'country', 'popular_tours')

    def get_tour_count(self, city):
        return city.tours.filter(is_published=True).count() 

    def get_photo_alt(self, city):
        return city.title   

    def get_popular_tours(self, city):
        popular_tours = city.tours.filter(average_rating=5)[:3]
        context = {'request': self.context.get('request')}
        return TourListSerializer(popular_tours, many=True, context=context).data  
        
        
        
class CityListForCountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name', 'slug')        


# Вывод города со списком туров в нем   
class CityDetailSerializer(serializers.ModelSerializer):
    tours = TourListSerializer(read_only=True, many=True)
    tour_count = serializers.SerializerMethodField()
    photo_alt = serializers.SerializerMethodField()

    def get_photo_alt(self, city):
        return city.title 

    class Meta:
        model = City
        fields = ('id', 'name', 'title', 'slug', 'description', 'tour_count', 'tours', 'photo','photo_alt')

    def get_tour_count(self, city):
        return city.tours.count()


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