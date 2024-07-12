from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


class Country(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=100, unique=True, db_index=True)
    meta_desc = models.TextField(blank=True, db_index=True)
    meta_keywords = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, db_index=True)
    currency_prefix = models.CharField(max_length=4, blank=True, default="$")
    photo = models.ImageField(blank=True, null=True, upload_to="photos/country/") 

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('country:country', kwargs={'country_slug': self.slug})

    class Meta:
        verbose_name = 'Страну'
        verbose_name_plural = 'Страны'    