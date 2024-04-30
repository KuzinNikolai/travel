import os
import random
from django.contrib.auth import get_user_model
from django.urls import reverse
from faker import Faker
from tour.models import *
from city.models import City
from country.models import Country
import django




# Создаем экземпляр Faker для генерации случайных данных
fake = Faker()
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "/gettrip/settings.py")
django.setup()

# Функция для создания случайного тура
def create_random_tour():
    # Получаем случайный город из базы данных
    city = City.objects.order_by('?').first()
    # Получаем случайную категорию из базы данных
    category = Category.objects.order_by('?').first()
    # Получаем случайный тип из базы данных
    tour_type = Type.objects.order_by('?').first()
    # Получаем случайный автор (пользователь) из базы данных
    author = get_user_model().objects.order_by('?').first()

    # Создаем случайный тур
    tour = Tour.objects.create(
        country=city.country,
        city=city,
        title=fake.sentence(),
        duration=fake.random_element(elements=('3 дня', '5 дней', '7 дней')),
        meta_desc=fake.sentence(),
        meta_keywords=fake.words(),
        slug=fake.slug(),
        description=fake.text(),
        adult_price=random.randint(50, 500),
        child_price=random.randint(20, 250),
        children_possible=fake.boolean(),
        what_age_child_free=random.randint(3, 12),
        pregnant_possible=fake.boolean(),
        photo=fake.image_url(),
        usage_policy=fake.paragraph(),
        is_published=Tour.Status.PUBLISHED,
        cat=category,
        type=tour_type,
        average_rating=random.uniform(1.0, 5.0),
        promotions=fake.boolean(),
        author=author
    )

    # Добавляем случайные теги
    for _ in range(random.randint(1, 5)):
        tag = TagTour.objects.order_by('?').first()
        if tag:
            tour.tags.add(tag)

    # Добавляем случайные языки
    for _ in range(random.randint(1, 3)):
        lang = LangTour.objects.order_by('?').first()
        if lang:
            tour.lang.add(lang)

    # Добавляем случайные FAQ
    for _ in range(random.randint(1, 3)):
        faq = FAQ.objects.order_by('?').first()
        if faq:
            tour.faqs.add(faq)

    return tour

# Создаем 100 случайных туров
for _ in range(100):
    create_random_tour()
