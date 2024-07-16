from datetime import timezone
from django.db.models import Max
from django.utils.timezone import now
import os
from typing import Any
from django.db import models
from django.db.models.query import QuerySet
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from city.models import City
from country.models import Country
from parler.models import TranslatableModel, TranslatedFields
from parler.managers import TranslatableQuerySet


class PublishedManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_published=Tour.Status.PUBLISHED)


class Tour(TranslatableModel):
    class Status(models.IntegerChoices):
        DRAFT = 0, "Черновик"
        PUBLISHED = 1, "Опубликовано"

    class CustomQuerySet(TranslatableQuerySet):
        # Your custom queryset methods
        pass

    # country = models.ForeignKey(Country, on_delete=models.CASCADE)
    # city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="tours")
    # title = models.CharField(max_length=255, db_index=True)
    # duration = models.CharField(blank=True, max_length=50)
    # meta_desc = models.TextField(blank=True, db_index=True)
    # meta_keywords = models.CharField(max_length=255, blank=True, null=True)
    # slug = models.SlugField(max_length=255, unique=True, db_index=True)
    # description = models.TextField(blank=True, db_index=True)
    # included = models.ManyToManyField("Included", blank=True, verbose_name="Включено в тур")
    # notincluded = models.ManyToManyField("NotIncluded", blank=True, verbose_name="Не включено в тур")
    # take = models.ManyToManyField("Take", blank=True, verbose_name="Что взять с собой")
    # adult_price = models.IntegerField(
    #     blank=True,
    #     null=True,
    # )
    # child_price = models.IntegerField(
    #     blank=True,
    #     null=True,
    # )
    # children_possible = models.BooleanField(default=False, null=True, verbose_name="Возможно ли посещение с детьми?")
    # what_age_child_free = models.IntegerField(blank=True, null=True, verbose_name="До скольки лет дети бесплатно?")
    # pregnant_possible = models.BooleanField(default=False, null=True, verbose_name="Возможно ли посещение беременным?")
    # photo = models.ImageField(blank=True, null=True, upload_to="photos/%Y/%m/%d/")
    # usage_policy = models.TextField(
    #     blank=True,
    #     default="""
    # После подтверждения вашего бронирования, вам на указанную почту или месенжер придет письмо с ваучером. В нем будут указаны все данные: наши реквизиты, так же все ваши данные указанные при бронировании. Оператор подтвердит ваше время заблаговременно. Пожалуйста, выходите в лобби отеля (место пикапа) за 10 минут до назначенного времени!
    # В день когда вас будут забирать с вашего места проживания на экскурсию, вы можете предъявить водителю распечатанный или мобильный ваучер показав его прямо на телефоне. Ваучер действителен только в указанные дату и время тура.
    # Трансфер осуществляется в обе стороны с вашего отеля! С дальних районов взимается дополнительная плата за частный трансфер который и оплачивается непосредственно оператору.""",
    # )
    # time_create = models.DateTimeField(auto_now_add=True)
    # time_update = models.DateTimeField(auto_now=True)
    # is_published = models.IntegerField(choices=Status.choices, default=Status.DRAFT)
    # cat = models.ForeignKey("Category", on_delete=models.PROTECT, db_index=True, related_name="tours")
    # type = models.ForeignKey("Type", on_delete=models.PROTECT, verbose_name="Тип поездки")
    # transfer = models.ManyToManyField("Transfer", blank=True, verbose_name="Какой трансфер предусмотрен?")
    # tags = models.ManyToManyField("TagTour", blank=True, related_name="tags", verbose_name="Теги")
    # lang = models.ManyToManyField("LangTour", blank=True, related_name="lang")
    # faqs = models.ManyToManyField("FAQ", blank=True, related_name="faqs")
    # group_size = models.IntegerField(
    #     blank=True,
    #     null=True,
    # )
    # average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    # promotions = models.BooleanField(default=False, null=True)
    # author = models.ForeignKey(
    #     get_user_model(), on_delete=models.SET_NULL, related_name="tours", null=True, default=None
    # )

    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="tours")
    included = models.ManyToManyField("Included", blank=True, verbose_name="Включено в тур")
    notincluded = models.ManyToManyField("NotIncluded", blank=True, verbose_name="Не включено в тур")
    take = models.ManyToManyField("Take", blank=True, verbose_name="Что взять с собой")
    photo = models.ImageField(blank=True, null=True, upload_to="photos/%Y/%m/%d/")
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    is_published = models.IntegerField(choices=Status.choices, default=Status.DRAFT)
    cat = models.ForeignKey("Category", on_delete=models.PROTECT, db_index=True, related_name="tours")
    type = models.ForeignKey("Type", on_delete=models.PROTECT, verbose_name="Тип поездки")
    transfer = models.ManyToManyField("Transfer", blank=True, verbose_name="Какой трансфер предусмотрен?")
    tags = models.ManyToManyField("TagTour", blank=True, related_name="tags", verbose_name="Теги")
    lang = models.ManyToManyField("LangTour", blank=True, related_name="lang")
    faqs = models.ManyToManyField("FAQ", blank=True, related_name="faqs")
    group_size = (
        models.IntegerField(
            blank=True,
            null=True,
        ),
    )
    author = (
        models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, related_name="tours", null=True, default=None),
    )
    translations = TranslatedFields(
        title=models.CharField(max_length=255, db_index=True),
        duration=models.CharField(blank=True, max_length=50),
        meta_desc=models.TextField(blank=True, db_index=True),
        meta_keywords=models.CharField(max_length=255, blank=True, null=True),
        slug=models.SlugField(max_length=255, unique=True, db_index=True),
        description=models.TextField(blank=True, db_index=True),
        adult_price=models.IntegerField(
            blank=True,
            null=True,
        ),
        child_price=models.IntegerField(
            blank=True,
            null=True,
        ),
        children_possible=models.BooleanField(default=False, null=True, verbose_name="Возможно ли посещение с детьми?"),
        what_age_child_free=models.IntegerField(blank=True, null=True, verbose_name="До скольки лет дети бесплатно?"),
        pregnant_possible=models.BooleanField(
            default=False, null=True, verbose_name="Возможно ли посещение беременным?"
        ),
        usage_policy=models.TextField(
            blank=True,
            default="""
        После подтверждения вашего бронирования, вам на указанную почту или месенжер придет письмо с ваучером. В нем будут указаны все данные: наши реквизиты, так же все ваши данные указанные при бронировании. Оператор подтвердит ваше время заблаговременно. Пожалуйста, выходите в лобби отеля (место пикапа) за 10 минут до назначенного времени!
        В день когда вас будут забирать с вашего места проживания на экскурсию, вы можете предъявить водителю распечатанный или мобильный ваучер показав его прямо на телефоне. Ваучер действителен только в указанные дату и время тура.
        Трансфер осуществляется в обе стороны с вашего отеля! С дальних районов взимается дополнительная плата за частный трансфер который и оплачивается непосредственно оператору.""",
        ),
        average_rating=models.DecimalField(max_digits=3, decimal_places=2, default=0.00),
        promotions=models.BooleanField(default=False, null=True),
    )
    objects = CustomQuerySet.as_manager()

    published = PublishedManager()

    def __str__(self):  # type: ignore
        return self.title

    def get_absolute_url(self):
        if self.slug:
            return reverse("tour-detail", kwargs={"slug": str(self.slug)})
        return "/"

    class Meta:
        verbose_name = "Экскурсию"
        verbose_name_plural = "Экскурсии"


def get_upload_path(instance, filename):
    city_id = instance.tour.city.id if instance.tour.city else "no_city_id"
    tour_id = instance.tour.id if instance.tour else "no_tour_id"
    filename = filename.encode("utf-8").decode("utf-8")
    return os.path.join("tour_photos", f"city_{city_id}", f"tour_{tour_id}", filename)


class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    description = models.TextField(blank=True, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    photo = models.ImageField(blank=True, null=True, upload_to="photos/category/")
    background_color = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("city:category_details", kwargs={"cat_slug": self.slug})

    class Meta:
        verbose_name = "Категорию"
        verbose_name_plural = "Категории"


class Type(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тип экскурсии"
        verbose_name_plural = "Тип экскурсий"


class Programm(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, null=True, db_index=True, related_name="programs")
    type = models.ForeignKey(Type, on_delete=models.CASCADE, null=True, related_name="type")
    group_size = models.IntegerField(
        blank=True,
        null=True,
    )
    title = models.CharField(max_length=255, db_index=True)
    duration = models.CharField(blank=True, max_length=50)
    description = models.TextField(blank=True, db_index=True)
    adult_price = models.IntegerField(blank=True, null=True)
    child_price = models.IntegerField(blank=True, null=True)
    individual_price = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.title


class Transfer(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Трансфер"
        verbose_name_plural = "Трансферы"


class NotIncluded(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Не включено в тур"
        verbose_name_plural = "Не включено в тур"


class Included(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Включено в тур"
        verbose_name_plural = "Включено в тур"


class Take(models.Model):
    name = models.CharField(max_length=100, verbose_name="Взять с собой")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Взять с собой"
        verbose_name_plural = "Взять с собой"


class TagTour(models.Model):
    tag = models.CharField(max_length=100, db_index=True, verbose_name="Тег")
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    active_image = models.ImageField(
        upload_to="photos/tag/active/", blank=True, null=True, verbose_name="Изображение для активного тега"
    )
    inactive_image = models.ImageField(
        upload_to="photos/tag/inactive/", blank=True, null=True, verbose_name="Изображение для неактивного тега"
    )

    def __str__(self):
        return self.tag

    def get_absolute_url(self):
        if self.slug and self.tags.exists():
            city_slug = self.tags.first().city.slug
            return reverse("city:city_tag", kwargs={"city_slug": city_slug, "tag_slug": self.slug})
        else:
            return reverse("city:city_tag", kwargs={"tag_slug": self.slug})

    class Meta:
        verbose_name = "тег"
        verbose_name_plural = "Теги"


class LangTour(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    photo = models.ImageField(blank=True, null=True, upload_to="photos/language/")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("name", kwargs={"lang_slug": self.slug})

    class Meta:
        verbose_name = "язык"
        verbose_name_plural = "Языки"


class Photo(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name="photos")
    image = models.ImageField(upload_to=get_upload_path)

    def __str__(self):
        return self.tour.title


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return self.question

    class Meta:
        verbose_name = "Частый вопрос"
        verbose_name_plural = "Частые вопросы"


class Wishlist(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name="wishlist")


class Area(models.Model):
    name = models.CharField(max_length=255)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "район"
        verbose_name_plural = "Районы"


class Hotel(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.TextField()
    phone_number = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "отель"
        verbose_name_plural = "Отели"


class Order(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    full_name = models.CharField(max_length=50, blank=False, null=False)
    email = models.EmailField(max_length=254, blank=False, null=False)
    phone = models.CharField(max_length=30, blank=False, null=False)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, default=None)
    program = models.ForeignKey(Programm, on_delete=models.CASCADE, related_name="orders")
    hotel = models.CharField(max_length=150, blank=True, null=True)
    room_number = models.CharField(max_length=30, blank=True, null=True)
    pickup_time = models.CharField(max_length=20, blank=True, null=True)
    text = models.TextField(default=None, max_length=200, blank=True, null=True)
    transfer = models.IntegerField(default=0)
    deposit = models.IntegerField(default=0)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    cash_on_tour = models.IntegerField(default=0)
    quantity_adults = models.IntegerField(default=1)
    quantity_children = models.IntegerField(default=0)
    quantity_infant = models.IntegerField(default=0)
    trip_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)
    order_number = models.CharField(max_length=255, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = self.generate_order_number()
        self.cash_on_tour = self.calculate_cash_on_tour()
        super().save(*args, **kwargs)

    def generate_order_number(self):
        country_letter = self.tour.country.slug[0].upper()
        city_letter = self.tour.city.slug[0].upper()
        today_date = timezone.now().strftime("%d%m%y")
        last_order = Order.objects.filter(created_at__date=timezone.now().date()).aggregate(Max("id"))
        last_order_id = last_order["id__max"] if last_order["id__max"] is not None else 0
        new_order_id = last_order_id + 1

        return f"{country_letter}{city_letter}{today_date}{new_order_id}"

    def total_price(self):
        total_price = (self.quantity_adults * self.program.adult_price) + (
            self.quantity_children * self.program.child_price
        )
        total_price += self.transfer
        return total_price

    def total_price_adult(self):
        total_price_adult = self.quantity_adults * self.program.adult_price
        return total_price_adult

    def total_price_child(self):
        total_price_child = self.quantity_children * self.program.child_price
        return total_price_child

    def calculate_cash_on_tour(self):
        return self.total_price() - self.deposit

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"


class Reviews(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name="reviews")
    text = models.TextField()
    rating = models.IntegerField(
        choices=[
            (1, "Очень плохо"),
            (2, "Плохо"),
            (3, "Удовлетворительно"),
            (4, "Хорошо"),
            (5, "Отлично"),
        ]
    )
    created_date = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.user.first_name} - {self.created_date}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Обновляем средний рейтинг тура после сохранения отзыва
        tour_reviews = Reviews.objects.filter(tour=self.tour)
        total_rating = sum(review.rating for review in tour_reviews)
        average_rating = total_rating / tour_reviews.count()

        # Обновляем средний рейтинг тура
        self.tour.average_rating = average_rating
        self.tour.save(update_fields=["average_rating"])

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"


class NeedHelp(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True, blank=True)
    full_name = models.CharField(max_length=50, blank=True, null=False)
    email = models.EmailField(max_length=254, blank=True, null=False)
    phone = models.CharField(max_length=30, blank=True, null=True)
    tour = models.ForeignKey(Tour, on_delete=models.SET_NULL, null=True, blank=True)
    text = models.TextField(max_length=500, blank=True, null=False)

    def __str__(self):
        return self.full_name
