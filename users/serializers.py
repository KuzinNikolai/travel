# serializers.py
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework import serializers
from .models import User, StaticPage
from city.models import City
from country.models import Country
from django.utils.crypto import get_random_string
from tour.models import Tour, Order, Reviews        
from tour.serializers import *



class CustomUserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'age', 'photo', 'is_staff', 'phone', 'country', 'city', "description")
        
    def to_representation(self, instance):
        data = super().to_representation(instance)

        if instance.is_staff:
            data["company_name"] = instance.company_name
            data["company_address"] = instance.company_address
            data["company_vat"] = instance.company_vat
            data["director_name"] = instance.director_name 
        
        return data
        

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'age', 'photo']
        extra_kwargs = {
            'email': {'required': True},
            'username': {'required': False, 'allow_blank': True, 'allow_null': True},
        }

    def validate(self, attrs):
        if not attrs.get('email'):
            raise serializers.ValidationError({'email': 'Это поле обязательно'})
        return attrs

    def create(self, validated_data):
        username = validated_data.get('username', validated_data['email'].split('@')[0])
        if User.objects.filter(username=username).exists():
            username += get_random_string(length=5)
        user = User.objects.create_user(
            username=username,
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            age=validated_data.get('age'),
            photo=validated_data.get('photo'),
            password=validated_data['password'],
            is_active=False  # Деактивируем пользователя до подтверждения почты
        )
        user.generate_verification_code()
        return user
        
        
        

class BecomeGuideSerializer(serializers.ModelSerializer):
    country = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all())
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())

    class Meta:
        model = User
        fields = ['country', 'city', 'phone', 'is_staff']

    def update(self, instance, validated_data):
        instance.country = validated_data.get('country', instance.country)
        instance.city = validated_data.get('city', instance.city)
        instance.phone = validated_data.get('phone', instance.phone)

        # Ensure is_staff is set to True only if it is currently False
        if not instance.is_staff:
            instance.is_staff = True

        instance.save(update_fields=['country', 'city', 'phone', 'is_staff'])
        return instance     
        
        
        
class StaticPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaticPage
        fields = ['title', 'content', 'image', 'slug'] 
        
        

class GuideProfileSerializer(serializers.ModelSerializer):
    country = serializers.SlugRelatedField(slug_field='name', queryset=Country.objects.all())
    city = serializers.SlugRelatedField(slug_field='name', queryset=City.objects.all())
    tours = serializers.SerializerMethodField()
    count_tours = serializers.SerializerMethodField()
    total_customers = serializers.SerializerMethodField()
    total_reviews = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'photo', 'country', 'city', 'company_name', 'company_address', 'company_vat', 'director_name', 'count_tours', 'total_customers', 'total_reviews', 'average_rating', 'tours']

    def get_tours(self, user):
        tours = Tour.objects.filter(author=user)
        return TourListSerializer(tours, many=True, context=self.context).data
        
        
    def get_count_tours(self, user):
        return Tour.objects.filter(author=user).count()  
        
        
    def get_total_customers(self, user):
        orders = Order.objects.filter(tour__author=user)
        total_customers = sum(order.quantity_adults + order.quantity_children + order.quantity_infant for order in orders)
        return total_customers  
        
        
    def get_total_reviews(self, user):
        tours = Tour.objects.filter(author=user)
        total_reviews = Reviews.objects.filter(tour__in=tours).count()
        return total_reviews
        

    def get_average_rating(self, user):
        tours = Tour.objects.filter(author=user)
        reviews = Reviews.objects.filter(tour__in=tours)
        total_rating = sum(review.rating for review in reviews)
        review_count = reviews.count()
        return total_rating / review_count if review_count > 0 else 0
        
        
        
class GuideOrderSerializer(serializers.ModelSerializer):
    tour = TourDetailSerializer()  # Используем сериализатор тура для отображения подробной информации о туре

    class Meta:
        model = Order
        fields = ['id', 'tour', 'program', 'order_number', 'full_name', 'email', 'phone', 'hotel', 'room_number', 'pickup_time', 'text', 'quantity_adults', 'quantity_children', 'quantity_infant', 'trip_date', 'created_at', 'updated_at']      
      
        
        
       