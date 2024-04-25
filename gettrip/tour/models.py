from datetime import timezone
import os
from typing import Any
from django.db import models
from django.db.models.query import QuerySet
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from city.models import City
from country.models import Country 

class PublishedManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_published=Tour.Status.PUBLISHED)


class Tour(models.Model):
    class Status(models.IntegerChoices):
        DRAFT = 0, 'Черновик'
        PUBLISHED = 1, 'Опубликовано'

    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='tours')
    title = models.CharField(max_length=255, db_index=True)
    duration = models.CharField(blank=True, max_length=50)
    meta_desc = models.TextField(blank=True, db_index=True)
    meta_keywords = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    description = models.TextField(blank=True, db_index=True)
    included = models.TextField(blank=True, default="""Обед, 
Маски и трубки, 
Трансфер из отеля,
Завтрак, 
Русский гид""")
    not_included = models.TextField(blank=True, default="""Сувениры, 
Личные покупки,
Трансфер из дальних районов""")
    take_with_you = models.TextField(blank=True, default="""Солнцезащитный крем, 
Солнцезащитные очки,
Деньги на личные расходы, 
Полотенце, 
Купальник, 
Шляпу,
Сменную одежду""")
    adult_price = models.IntegerField(blank=True, null=True,)
    child_price = models.IntegerField(blank=True, null=True,)
    children_possible = models.BooleanField(default=False, null=True)
    what_age_child_free = models.IntegerField(blank=True, null=True)
    pregnant_possible = models.BooleanField(default=False, null=True)
    photo = models.ImageField(blank=True, null=True, upload_to="photos/%Y/%m/%d/")
    usage_policy = models.TextField(blank=True, default="""После подтверждения вашего бронирования, вам на указанную почту или месенжер придет письмо с ваучером. В нем будут указаны все данные: наши реквизиты, так же все ваши данные указанные при бронировании. Оператор подтвердит ваше время заблаговременно. Пожалуйста, выходите в лобби отеля (место пикапа) за 10 минут до назначенного времени!
    В день когда вас будут забирать с вашего места проживания на экскурсию, вы можете предъявить водителю распечатанный или мобильный ваучер показав его прямо на телефоне. Ваучер действителен только в указанные дату и время тура. 
    Трансфер осуществляется в обе стороны с вашего отеля! С дальних районов взимается дополнительная плата за частный трансфер который и оплачивается непосредственно оператору.""")
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    is_published = models.IntegerField(choices=Status.choices, default=Status.PUBLISHED)
    cat = models.ForeignKey('Category', on_delete=models.PROTECT, db_index=True, related_name='tours')
    type = models.ForeignKey('Type', on_delete=models.PROTECT)
    transfer = models.ManyToManyField('Transfer', blank=True)
    tags = models.ManyToManyField('TagTour', blank=True, related_name='tags')
    lang = models.ManyToManyField('LangTour', blank=True, related_name='lang')
    faqs = models.ManyToManyField('FAQ', blank=True, related_name='faqs')
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    promotions = models.BooleanField(default=False, null=True)
    author = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, related_name='tours', null=True, default=None)

    objects = models.Manager()
    published = PublishedManager()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        if self.slug:
            return reverse('tour', kwargs={'tour_slug': str(self.slug)})
        return '/'
    

def get_upload_path(instance, filename):
    city_id = instance.tour.city.id if instance.tour.city else 'no_city_id'
    title = instance.tour.title if instance.tour else 'no_title'
    return os.path.join("tour_photos", f"city_{city_id}", f"tour_{title}", filename)  


class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    description = models.TextField(blank=True, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    photo = models.ImageField(blank=True, null=True, upload_to="photos/category/") 
    background_color = models.CharField(max_length=50, blank=True, null=True) 


    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('city:category_details', kwargs={'cat_slug': self.slug})


class Type(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True) 

    def __str__(self):
        return self.name
    

class Programm(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, null=True, db_index=True, related_name='programs')
    title = models.CharField(max_length=255, db_index=True)
    duration = models.CharField(blank=True, max_length=50)
    description = models.TextField(blank=True, db_index=True)
    adult_price = models.IntegerField(blank=True)
    child_price = models.IntegerField(blank=True)

    def __str__(self):
        return self.title
    

class Transfer(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

class TagTour(models.Model):
    tag = models.CharField(max_length=100, db_index=True, verbose_name='Тег')
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    active_image = models.ImageField(upload_to='photos/tag/active/', blank=True, null=True, verbose_name='Изображение для активного тега')
    inactive_image = models.ImageField(upload_to='photos/tag/inactive/', blank=True, null=True, verbose_name='Изображение для неактивного тега')

    def __str__(self):
        return self.tag
    
    def get_absolute_url(self):
        if self.slug and self.tags.exists():
            city_slug = self.tags.first().city.slug
            return reverse('city:city_tag', kwargs={'city_slug': city_slug, 'tag_slug': self.slug})
        else:
            return reverse('city:city_tag', kwargs={'tag_slug': self.slug})
    

class LangTour(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    photo = models.ImageField(blank=True, null=True, upload_to="photos/language/")  

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('name', kwargs={'lang_slug': self.slug})
    

class Photo(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to=get_upload_path)    


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return self.question

    class Meta:
        verbose_name = 'Часто задаваемый вопрос'
        verbose_name_plural = 'Часто задаваемые вопросы'


class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)
    

class Order(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    full_name = models.CharField(max_length=50, blank=True, null=False)
    phone = models.CharField(max_length=30, blank=True, null=False)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, default=None)
    program = models.ForeignKey(Programm, on_delete=models.CASCADE, related_name='orders')
    transfer = models.ForeignKey(Transfer, on_delete=models.CASCADE, blank=True, null=True)
    hotel = models.CharField(max_length=150, blank=True, null=True)
    text = models.TextField(default=None, max_length=200, blank=True, null=True)
    quantity_adults = models.IntegerField(default=1)
    quantity_children = models.IntegerField(default=0)
    quantity_infant = models.IntegerField(default=0)

    

    def total_price(self):
        # Реализуйте логику подсчета общей стоимости заказа
        total_price = 0

        if self.program:
            total_price += self.program.adult_price * self.quantity_adults
            if self.program.child_price:
                total_price += self.program.child_price * self.quantity_children

        if self.transfer:
            # Добавьте цену за трансфер, если он выбран
            total_price += self.transfer.price

        return total_price
    
    class Meta:
        verbose_name = ("Заказ")
        verbose_name_plural = ("Заказы")
    


class Reviews(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)
    text = models.TextField()
    rating = models.IntegerField(choices=[
        (1, 'Очень плохо'),
        (2, 'Плохо'),
        (3, 'Удовлетворительно'),
        (4, 'Хорошо'),
        (5, 'Отлично'),
    ])
    created_date = models.DateTimeField(default=timezone) 

    def __str__(self):
        return f"{self.user.first_name} - {self.created_at}"
    

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Обновляем средний рейтинг тура после сохранения отзыва
        tour_reviews = Reviews.objects.filter(tour=self.tour)
        total_rating = sum(review.rating for review in tour_reviews)
        average_rating = total_rating / tour_reviews.count()

        # Обновляем средний рейтинг тура
        self.tour.average_rating = average_rating
        self.tour.save(update_fields=['average_rating'])

    class Meta:
        verbose_name = ("Отзыв")
        verbose_name_plural = ("Отзывы")     