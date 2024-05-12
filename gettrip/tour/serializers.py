from rest_framework import serializers
from .models import *

User = get_user_model()

# Полный вывод тегов
class TagSerializer(serializers.ModelSerializer):
    active_image = serializers.SerializerMethodField()
    inactive_image = serializers.SerializerMethodField()

    class Meta:
        model = TagTour
        fields = ['tag', 'slug', 'active_image', 'inactive_image']

    def get_active_image(self, tag):
        if tag.active_image:
            return tag.active_image.url
        return None

    def get_inactive_image(self, tag):
        if tag.inactive_image:
            return tag.inactive_image.url
        return None
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email', 'photo']     
    
 
class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reviews
        fields = '__all__'            


# Вывод всех туров
class TourListSerializer(serializers.ModelSerializer):
    """Выводим туры и цену из программы для превью"""

    min_price = serializers.SerializerMethodField()

    def get_min_price(self, tour):
        try:
            min_program = tour.programs.order_by('adult_price').first()
            return min_program.adult_price
        except AttributeError:
            return None
        
    country = serializers.SlugRelatedField(slug_field='name', read_only=True)  
    city = serializers.SlugRelatedField(slug_field='name', read_only=True)
    cat = serializers.SlugRelatedField(slug_field='name', read_only=True)
    average_rating = serializers.FloatField(default=0.00)

    tags = TagSerializer(many=True)

    class Meta:
        model = Tour
        fields = ('id', 'country', 'city', 'title', 'description', 'slug', 'cat', 'tags', 'min_price', 'photo', 'average_rating')

# Вывод всех туров конец        


# Добавление туров
class TourCreateSerializer(serializers.ModelSerializer):   
    tags = serializers.SlugRelatedField(slug_field='tag', queryset=TagTour.objects.all(), many=True)
    lang = serializers.SlugRelatedField(slug_field='name', queryset=LangTour.objects.all(), many=True)
    transfer = serializers.SlugRelatedField(slug_field='name', queryset=Transfer.objects.all(), many=True)
    faqs = serializers.SlugRelatedField(slug_field='question', queryset=FAQ.objects.all(), many=True)
    class Meta:
        model = Tour
        fields = ('country', 'city', 'title', 'slug', 'description', 'included', 'not_included', 'take_with_you', 'cat', 'tags', 'type', 'children_possible', 'what_age_child_free', 'pregnant_possible', 'lang', 'transfer', 'photo', 'faqs')     

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        langs_data = validated_data.pop('lang', [])
        transfers_data = validated_data.pop('transfer', [])
        faqs_data = validated_data.pop('faqs', [])
        
        tour = Tour.objects.create(**validated_data)
        tour.tags.set(tags_data)
        tour.lang.set(langs_data)
        tour.transfer.set(transfers_data)
        tour.faqs.set(faqs_data)
        
        return tour
    
# Добавление туров конец       


# Подробная информация о туре и возможность редактиров
class FaqSerializer(serializers.Serializer):
    question = serializers.CharField()
    answer = serializers.CharField()


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programm
        fields = ('id', 'title', 'description', 'adult_price', 'child_price')   



class TourDetailSerializer(serializers.ModelSerializer):

    country = serializers.SlugRelatedField(slug_field='name', read_only=True)
    city = serializers.SlugRelatedField(slug_field='name', read_only=True)
    cat = serializers.SlugRelatedField(slug_field='name', read_only=True)
    type = serializers.SlugRelatedField(slug_field='name', read_only=True)
    lang = serializers.SlugRelatedField(slug_field='name', read_only=True, many=True)
    transfer = serializers.SlugRelatedField(slug_field='name', read_only=True, many=True)
    faqs = FaqSerializer(many=True)
    programs = ProgramSerializer(many=True, read_only=True)
    average_rating = serializers.FloatField(default=0.00)

    tags = TagSerializer(many=True)

    reviews = ReviewSerializer(many=True)

    class Meta:
        model = Tour
        exclude = ('is_published', )

# Подробная информация о туре и возможность редактиров конец        


class TourUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Tour
        exclude = ('is_published', 'author', )

class CategoryListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('name', 'description',)


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'   



class AddToWishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__' 


class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'         

