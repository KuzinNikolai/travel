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
        request = self.context.get('request')
        if tag.active_image and request:
            return request.build_absolute_uri(tag.active_image.url)
        return None

    def get_inactive_image(self, tag):
        request = self.context.get('request')
        if tag.inactive_image and request:
            return request.build_absolute_uri(tag.inactive_image.url)
        return None
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email', 'photo']    


class IncludedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Included
        fields = ['id', 'name']   


class NotIncludedSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotIncluded
        fields = ['id', 'name'] 


class TakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Take
        fields = ['id', 'name']         
    
 

class ReviewSerializer(serializers.ModelSerializer):
    user_full_name = serializers.SerializerMethodField()  # Добавляем поле для вывода полного имени пользователя

    class Meta:
        model = Reviews
        fields = ['id', 'user_full_name', 'user', 'tour', 'rating', 'text', 'created_date']

    def get_user_full_name(self, obj):
        return obj.user.get_full_name()            


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
        

    def get_currency_prefix(self, tour):
        return tour.country.currency_prefix    
    
    photo = serializers.SerializerMethodField()
        
    country = serializers.SlugRelatedField(slug_field='name', read_only=True)
    country_slug = serializers.SlugRelatedField(slug_field='slug', source='country', read_only=True)
    
    city = serializers.SlugRelatedField(slug_field='name', read_only=True)
    city_slug = serializers.SlugRelatedField(slug_field='slug', source='city', read_only=True)

    photo_alt = serializers.SerializerMethodField()
    currency_prefix = serializers.SerializerMethodField()
    cat = serializers.SlugRelatedField(slug_field='name', read_only=True)
    average_rating = serializers.FloatField(default=0.00)
    type = serializers.SlugRelatedField(slug_field='name', read_only=True)

    tags = TagSerializer(many=True)

    def get_photo(self, tour):
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(tour.photo.url)
        return tour.photo.url
    
    def get_photo_alt(self, tour):
        return tour.title

    class Meta:
        model = Tour
        fields = ('id', 'country', 'country_slug', 'city', 'city_slug', 'title', 'meta_desc', 'description', 'duration', 'type', 'slug', 'cat', 'tags', 'min_price', 'photo', 'photo_alt', 'average_rating','currency_prefix')

# Вывод всех туров конец        


# Добавление туров
class TourCreateSerializer(serializers.ModelSerializer):   
    tags = serializers.SlugRelatedField(slug_field='tag', queryset=TagTour.objects.all(), many=True)
    lang = serializers.SlugRelatedField(slug_field='name', queryset=LangTour.objects.all(), many=True)
    transfer = serializers.SlugRelatedField(slug_field='name', queryset=Transfer.objects.all(), many=True)
    faqs = serializers.SlugRelatedField(slug_field='question', queryset=FAQ.objects.all(), many=True)
    programs = serializers.SlugRelatedField(slug_field='tour', queryset=Programm.objects.all(), many=True)
    class Meta:
        model = Tour
        fields = ('country', 'city', 'title', 'slug', 'description', 'included', 'notincluded', 'take', 'cat', 'tags', 'type', 'children_possible', 'what_age_child_free', 'pregnant_possible', 'lang', 'transfer', 'photo', 'faqs', 'programs')     

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        langs_data = validated_data.pop('lang', [])
        transfers_data = validated_data.pop('transfer', [])
        faqs_data = validated_data.pop('faqs', [])
        programs_data = validated_data.pop('programs', [])
        
        tour = Tour.objects.create(**validated_data)
        tour.tags.set(tags_data)
        tour.lang.set(langs_data)
        tour.transfer.set(transfers_data)
        tour.faqs.set(faqs_data)
        tour.programs.set(programs_data)
        
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
    country_slug = serializers.SlugRelatedField(slug_field='slug', source='country', read_only=True)
    
    city = serializers.SlugRelatedField(slug_field='name', read_only=True)
    city_slug = serializers.SlugRelatedField(slug_field='slug', source='city', read_only=True)

    photo_alt = serializers.SerializerMethodField()
    
    currency_prefix = serializers.SerializerMethodField()
    cat = serializers.SlugRelatedField(slug_field='name', read_only=True)
    type = serializers.SlugRelatedField(slug_field='name', read_only=True)
    lang = serializers.SlugRelatedField(slug_field='name', read_only=True, many=True)
    transfer = serializers.SlugRelatedField(slug_field='name', read_only=True, many=True)
    faqs = FaqSerializer(many=True)
    programs = ProgramSerializer(many=True, read_only=True)
    average_rating = serializers.FloatField(default=0.00)
    tags = TagSerializer(many=True)
    included = IncludedSerializer(many=True)
    notincluded = NotIncludedSerializer(many=True)
    take = TakeSerializer(many=True)
    reviews = ReviewSerializer(many=True)
    tour_link = serializers.SerializerMethodField()
    photos = serializers.SerializerMethodField()

    def get_photos(self, obj):
        request = self.context.get('request')
        if request is not None:
            return [request.build_absolute_uri(photo.image.url) for photo in obj.photos.all()]
        return [photo.image.url for photo in obj.photos.all()]

    min_price = serializers.SerializerMethodField()

    def get_min_price(self, tour):
        try:
            min_program = tour.programs.order_by('adult_price').first()
            return min_program.adult_price
        except AttributeError:
            return None
        

    def get_currency_prefix(self, tour):
        return tour.country.currency_prefix
    
    def get_photo_alt(self, tour):
        return tour.title
        

    class Meta:
        model = Tour
        exclude = ('is_published', )

     # Метод для получения ссылки на текущий тур
    def get_tour_link(self, obj):
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.get_absolute_url()) 
     
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
    tour_title = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'tour_title', 'full_name', 'user', 'tour', 'email', 'phone', 'program', 'hotel', 
                  'room_number', 'pickup_time', 'quantity_adults', 'quantity_children', 'quantity_infant', 'trip_date', 'transfer', 'text']
        extra_kwargs = {
            'email': {'required': True},
            'phone': {'required': True},
            'full_name': {'required': True}
        }

    def get_tour_title(self, obj):
        return obj.tour.title 
    
    def validate(self, data):
        if not data.get('email'):
            raise serializers.ValidationError({"email": "Поле email обязательно для заполнения."})
        if not data.get('phone'):
            raise serializers.ValidationError({"phone": "Поле phone обязательно для заполнения."})
        return data


class HelpSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    tour = serializers.PrimaryKeyRelatedField(queryset=Tour.objects.all(), required=False, allow_null=True)

    class Meta:
        model = NeedHelp
        fields = '__all__'    


class AddToWishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__' 


class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'         

