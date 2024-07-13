from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from country.models import Country

class Status(models.IntegerChoices):
    DRAFT = 0, 'Draft'
    PUBLISHED = 1, 'Published'
    

class City(models.Model):
    country = models.ForeignKey(Country, null=True, on_delete=models.CASCADE, related_name='cities')
    title = models.CharField(max_length=255, blank=True, null=True)
    meta_desc = models.TextField(blank=True, db_index=True)
    meta_keywords = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=100, unique=True, db_index=True)
    description = models.TextField(blank=True, db_index=True)

    title_en = models.CharField(max_length=255, blank=True, null=True)
    meta_desc_en = models.TextField(blank=True, db_index=True)
    meta_keywords_en = models.CharField(max_length=255, blank=True, null=True)
    name_en = models.CharField(max_length=50, blank=True, null=True)
    description_en = models.TextField(blank=True, db_index=True)
    photo = models.ImageField(blank=True, null=True, upload_to="photos/city/") 
    is_published = models.IntegerField(choices=Status.choices, default=Status.DRAFT)

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        if self.slug:
            return reverse('city:city', kwargs={'city_slug': str(self.slug)})

    class Meta:
        verbose_name = 'Город'
        verbose_name_plural = 'Города'

