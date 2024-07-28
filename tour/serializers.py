from django.contrib.auth import get_user_model
from parler_rest.fields import TranslatedFieldsField
from parler_rest.serializers import TranslatableModelSerializer
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied

from .models import *

User = get_user_model()


# Полный вывод тегов
class TagSerializer(serializers.ModelSerializer):
    active_image = serializers.SerializerMethodField()
    inactive_image = serializers.SerializerMethodField()

    class Meta:
        model = TagTour
        fields = ["tag", "slug", "active_image", "inactive_image"]

    def get_active_image(self, tag):
        request = self.context.get("request")
        if tag.active_image and request:
            return request.build_absolute_uri(tag.active_image.url)
        return None

    def get_inactive_image(self, tag):
        request = self.context.get("request")
        if tag.inactive_image and request:
            return request.build_absolute_uri(tag.inactive_image.url)
        return None


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "email", "photo"]


class IncludedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Included
        fields = ["id", "name"]


class NotIncludedSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotIncluded
        fields = ["id", "name"]


class TakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Take
        fields = ["id", "name"]


class TransferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transfer
        fields = ["id", "name"]


class LangTourSerializer(serializers.ModelSerializer):
    class Meta:
        model = LangTour
        fields = ["id", "name"]


# Подробная информация о туре и возможность редактиров
class FaqSerializer(serializers.Serializer):
    question = serializers.CharField()
    answer = serializers.CharField()

    class Meta:
        model = FAQ
        fields = ["id", "question", "answer"]


class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ["id", "name"]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer"]


class ReviewSerializer(TranslatableModelSerializer):
    user_full_name = serializers.SerializerMethodField()
    user_photo = serializers.SerializerMethodField()  # Добавляем поле для вывода полного имени пользователя
    translations = TranslatedFields(shared_model=Reviews)

    class Meta:
        model = Reviews
        fields = [
            "id",
            "user_full_name",
            "user_photo",
            "user",
            "tour",
            "rating",
            "text",
            "created_date",
            "translations",
        ]  # Указываем новое поле
        extra_kwargs = {"translations": {"required": False}}

    def get_user_full_name(self, obj):
        return obj.user.get_full_name()

    def get_user_photo(self, obj):
        if obj.user.photo:
            return self.context["request"].build_absolute_uri(obj.user.photo.url)
        return None


class ProgramSerializer(serializers.ModelSerializer):

    class Meta:
        model = Programm
        fields = [
            "id",
            "title",
            "type",
            "group_size",
            "duration",
            "description",
            "adult_price",
            "child_price",
            "individual_price",
        ]


class TourListSerializer(serializers.ModelSerializer):
    """Выводим туры и цену из программы для превью"""

    min_price = serializers.SerializerMethodField()

    def get_min_price(self, tour):
        try:
            min_program = tour.programs.order_by("adult_price").first()
            return min_program.adult_price
        except AttributeError:
            return None

    def get_currency_prefix(self, tour):
        return tour.country.currency_prefix

    country = serializers.SlugRelatedField(slug_field="name", read_only=True)
    country_slug = serializers.SlugRelatedField(slug_field="slug", source="country", read_only=True)

    city = serializers.SlugRelatedField(slug_field="name", read_only=True)
    city_slug = serializers.SlugRelatedField(slug_field="slug", source="city", read_only=True)

    photo_alt = serializers.SerializerMethodField()
    currency_prefix = serializers.SerializerMethodField()
    cat = serializers.SlugRelatedField(slug_field="name", read_only=True)
    average_rating = serializers.FloatField(default=0.00)
    type = serializers.SlugRelatedField(slug_field="name", read_only=True)

    tags = TagSerializer(many=True)

    # photos = PhotoSerializer(many=True, required=False)
    photos = serializers.SerializerMethodField()

    def get_photos(self, tour):
        request = self.context.get("request")
        return [
            request.build_absolute_uri(photo.image.url) if request else photo.image.url for photo in tour.photos.all()
        ]

    def get_photo(self, tour):
        request = self.context.get("request")
        if tour.photo and hasattr(tour.photo, "url"):
            if request is not None:
                return request.build_absolute_uri(tour.photo.url)
            return tour.photo.url
        return None

    def get_photo_alt(self, tour):
        return tour.title

    class Meta:
        model = Tour
        fields = (
            "id",
            "country",
            "country_slug",
            "city",
            "city_slug",
            "title",
            "meta_desc",
            "description",
            "duration",
            "type",
            "slug",
            "cat",
            "tags",
            "min_price",
            "photo",
            "photos",
            "photo_alt",
            "average_rating",
            "currency_prefix",
            "is_published",
        )


class TourCreateSerializer(TranslatableModelSerializer):
    programs = ProgramSerializer(many=True, required=False)
    photo = serializers.ImageField(required=False)
    author = UserSerializer(read_only=True)
    translations = TranslatedFieldsField(shared_model=Tour)
    photos_urls = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = (
            "id",
            "country",
            "city",
            "title",
            "slug",
            "duration",
            "description",
            "included",
            "notincluded",
            "take",
            "cat",
            "tags",
            "type",
            "children_possible",
            "what_age_child_free",
            "pregnant_possible",
            "lang",
            "transfer",
            "photo",
            "faqs",
            "programs",
            "photos",
            "author",
            "translations",
            "photos_urls",
        )

    def create(self, validated_data):
        included_data = validated_data.pop("included", [])
        notincluded_data = validated_data.pop("notincluded", [])
        take_data = validated_data.pop("take", [])
        transfers_data = validated_data.pop("transfer", [])
        tags_data = validated_data.pop("tags", [])
        langs_data = validated_data.pop("lang", [])
        faqs_data = validated_data.pop("faqs", [])
        photos_data = validated_data.pop("photos", [])

        tour = Tour.objects.create(**validated_data)
        tour.included.set(included_data)
        tour.notincluded.set(notincluded_data)
        tour.take.set(take_data)
        tour.transfer.set(transfers_data)
        tour.tags.set(tags_data)
        tour.lang.set(langs_data)
        tour.faqs.set(faqs_data)
        tour.photos.set(photos_data)

        return tour

    def get_photos_urls(self, obj):
        return obj.photos.all().values_list("file", flat=True)


# Добавление туров конец


class TourDetailSerializer(TranslatableModelSerializer):
    country = serializers.SlugRelatedField(slug_field="name", read_only=True)
    country_slug = serializers.SlugRelatedField(slug_field="slug", source="country", read_only=True)

    city = serializers.SlugRelatedField(slug_field="name", read_only=True)
    city_slug = serializers.SlugRelatedField(slug_field="slug", source="city", read_only=True)

    photo_alt = serializers.SerializerMethodField()

    currency_prefix = serializers.SerializerMethodField()
    cat = serializers.SlugRelatedField(slug_field="name", read_only=True)
    type = serializers.SlugRelatedField(slug_field="name", read_only=True)
    lang = serializers.SlugRelatedField(slug_field="name", read_only=True, many=True)
    transfer = serializers.SlugRelatedField(slug_field="name", read_only=True, many=True)
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
    min_price = serializers.SerializerMethodField()

    def get_photos(self, obj):
        return [photo.image.file.url for photo in obj.photos.all()]

    def get_min_price(self, tour):
        try:
            min_program = tour.programs.order_by("adult_price").first()
            return min_program.adult_price
        except AttributeError:
            return None

    def get_currency_prefix(self, tour):
        return tour.country.currency_prefix

    def get_photo_alt(self, tour):
        return tour.title

    class Meta:
        model = Tour
        exclude = ("is_published",)

    # Метод для получения ссылки на текущий тур
    def get_tour_link(self, obj):
        request = self.context.get("request")
        if request is not None:
            return request.build_absolute_uri(obj.get_absolute_url())


# Подробная информация о туре и возможность редактиров конец


class TourUpdateSerializer(TranslatableModelSerializer):
    programs = ProgramSerializer(many=True, required=False)
    photos_urls = serializers.SerializerMethodField()
    translations = TranslatedFields(shared_model=Tour)

    class Meta:
        model = Tour
        fields = (
            "id",
            "country",
            "city",
            "title",
            "slug",
            "duration",
            "description",
            "included",
            "notincluded",
            "take",
            "cat",
            "tags",
            "type",
            "children_possible",
            "what_age_child_free",
            "pregnant_possible",
            "lang",
            "transfer",
            "photo",
            "faqs",
            "programs",
            "photos",
            "photos_urls",
            "author",
            "translations",
        )
        read_only_fields = ("photos",)
        # exclude = ('is_published',)

    def update(self, instance, validated_data):
        request = self.context.get("request")

        if request.user != instance.author:
            if not request.user.is_superuser:
                raise PermissionDenied("You do not have permission to edit this tour.")

        return super().update(instance, validated_data)

    def get_photos_urls(self, obj):
        results = []
        for photo in obj.photos.all():
            results.append(photo.image.url)
        return results


class CategoryListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = (
            "name",
            "description",
        )


class OrderSerializer(TranslatableModelSerializer):
    tour_title = serializers.SerializerMethodField()
    program_title = serializers.SerializerMethodField()
    country_name = serializers.SerializerMethodField()
    city_name = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    order_number = serializers.ReadOnlyField()
    manager = serializers.SerializerMethodField()
    manager_phone = serializers.SerializerMethodField()
    manager_email = serializers.SerializerMethodField()
    cash_on_tour = serializers.SerializerMethodField()
    translations = TranslatedFields(shared_model=Order)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_number",
            "country_name",
            "city_name",
            "tour_title",
            "full_name",
            "user",
            "tour",
            "email",
            "phone",
            "program_title",
            "program",
            "hotel",
            "room_number",
            "pickup_time",
            "quantity_adults",
            "quantity_children",
            "quantity_infant",
            "trip_date",
            "total_price",
            "text",
            "manager",
            "manager_phone",
            "manager_email",
            "transfer",
            "deposit",
            "cash_on_tour",
            "translations",
        ]
        extra_kwargs = {
            "email": {"required": True},
            "phone": {"required": True},
            # 'full_name': {'required': True},
            "trip_date": {"required": True},
        }

    def get_tour_title(self, obj):
        return obj.tour.title

    def get_manager(self, obj):
        return obj.tour.author.get_full_name() if obj.tour.author else "No manager"

    def get_manager_phone(self, obj):
        return obj.tour.author.phone if obj.tour.author else "No phone"

    def get_manager_email(self, obj):
        return obj.tour.author.email if obj.tour.author else "No email"

    def get_program_title(self, obj):
        return obj.program.title

    def get_country_name(self, obj):
        return obj.tour.country.name

    def get_city_name(self, obj):
        return obj.tour.city.name

    def get_total_price(self, obj):
        total_price = (obj.quantity_adults * obj.program.adult_price) + (
            obj.quantity_children * obj.program.child_price
        )
        total_price += obj.transfer
        return total_price

    def get_cash_on_tour(self, obj):
        total_price = self.get_total_price(obj)
        return total_price - obj.deposit

    def validate(self, data):
        if not data.get("email"):
            raise serializers.ValidationError({"email": "Поле email обязательно для заполнения."})
        if not data.get("phone"):
            raise serializers.ValidationError({"phone": "Поле phone обязательно для заполнения."})
        return data

    def __init__(self, *args, **kwargs):
        super(OrderSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request", None)

        if request and not request.user.is_staff:  # Удаляем поля для не-администраторов
            self.fields.pop("pickup_time")


class HelpSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    tour = serializers.PrimaryKeyRelatedField(queryset=Tour.objects.all(), required=False, allow_null=True)

    class Meta:
        model = NeedHelp
        fields = "__all__"

    def validate(self, data):
        """
        Переопределяем метод validate для дополнительной валидации полей.
        """
        email = data.get("email")
        phone = data.get("phone")
        full_name = data.get("full_name")

        if not email:
            raise serializers.ValidationError({"email": "Это поле обязательно для заполнения."})

        if not phone:
            raise serializers.ValidationError({"phone": "Это поле обязательно для заполнения."})

        if not full_name:
            raise serializers.ValidationError({"full_name": "Поле имя обязательно для заполнения."})

        return data


class AddToWishlistSerializer(serializers.Serializer):
    tour_id = serializers.IntegerField()

    def validate_tour_id(self, value):
        # Проверяем, существует ли такой тур по его ID
        if not Tour.objects.filter(id=value).exists():
            raise serializers.ValidationError("Тур с указанным ID не найден.")
        return value

    def create(self, validated_data):
        user = self.context["request"].user
        tour_id = validated_data["tour_id"]

        # Проверяем, существует ли уже объект вишлиста для этого тура и текущего пользователя
        if Wishlist.objects.filter(user=user, tour__id=tour_id).exists():
            raise serializers.ValidationError("Этот тур уже добавлен в избранное.")

        wishlist = Wishlist.objects.create(user=user, tour_id=tour_id)
        return wishlist


class WishlistSerializer(serializers.ModelSerializer):
    tour = TourListSerializer(read_only=True)

    class Meta:
        model = Wishlist
        fields = ["id", "user", "tour"]


class PhotoSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = "__all__"

    def create(self, validated_data):
        user = self.context["request"].user
        tour = validated_data["tour"]

        if tour.author != user:
            raise PermissionDenied("You don't have permission to add phot to this tour.")

        return super().create(validated_data)

    def get_photo_url(self, obj):
        return obj.image.url
