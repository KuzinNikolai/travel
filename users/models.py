from django.db import models
from django.contrib.auth.models import AbstractUser
import random
import string
from django.urls import reverse
from city.models import City
from country.models import Country
from django.utils.crypto import get_random_string
from parler.models import TranslatableModel, TranslatedFields
from django.core.validators import MinValueValidator
class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    email = models.EmailField(unique=True)
    photo = models.ImageField(upload_to='users/avatar', blank=True, null=True, verbose_name='Аватар')
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True, validators=[MinValueValidator(16)])
    email_verification_code = models.CharField(max_length=6, blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    phone = models.CharField(max_length=15, null=True, blank=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    company_address = models.CharField(max_length=255, blank=True, null=True) 
    company_vat = models.CharField(max_length=255, blank=True, null=True) 
    director_name = models.CharField(max_length=255, blank=True, null=True) 
    description = models.CharField(max_length=255, blank=True, null=True) 

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email.split('@')[0]
            if User.objects.filter(username=self.username).exists():
                self.username += get_random_string(length=5)

        # Ensure is_staff is not altered unintentionally
        if 'update_fields' in kwargs and 'is_staff' not in kwargs['update_fields']:
            kwargs['update_fields'] = list(kwargs['update_fields']) + ['is_staff']

        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

    def generate_verification_code(self):
        self.email_verification_code = ''.join(random.choices(string.digits, k=6))
        self.save()
        
        
        
class StaticPage(TranslatableModel):
    translations = TranslatedFields(
        title = models.CharField(max_length=255),
        content = models.TextField()
    )
    image = models.ImageField(blank=True, null=True, upload_to="users/static/%Y/%m/%d/")
    slug = models.SlugField(max_length=255, unique=True, db_index=True)

    def __str__(self):
        return self.title
        
        
    def get_absolute_url(self):
        return reverse('static_page_detail', kwargs={'slug': self.slug})