from rest_framework import serializers
from .models import *
from city.serializers import CityListForCountrySerializer, CityListSerializer

class CountryListSerializer(serializers.ModelSerializer):
    cities = CityListForCountrySerializer(read_only=True, many=True)
    tour_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Country
        fields = ('id', 'name', 'slug', 'title', 'description', 'photo', 'tour_count', 'cities')

    # Метод для получения количества туров в каждой стране
    def get_tour_count(self, obj):
        # Используем агрегацию Count для подсчета туров в каждой стране
        return obj.tour_set.count()    


class CountryDetailSerializer(serializers.ModelSerializer):

    cities = CityListSerializer(read_only=True, many=True)

    class Meta:
        model = Country
        fields = ('id', 'name', 'slug', 'title', 'description', 'cities')
        
        
# class CountryListForCitySerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = Country
# 		fields = ('id', 'name', 'slug', 'title')
	