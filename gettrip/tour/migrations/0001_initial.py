# Generated by Django 5.0 on 2024-03-20 03:50

import django.db.models.deletion
import tour.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('city', '0001_initial'),
        ('country', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('description', models.TextField(blank=True, db_index=True)),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='photos/category/')),
                ('background_color', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FAQ',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=255)),
                ('answer', models.TextField()),
            ],
            options={
                'verbose_name': 'Часто задаваемый вопрос',
                'verbose_name_plural': 'Часто задаваемые вопросы',
            },
        ),
        migrations.CreateModel(
            name='LangTour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='photos/language/')),
            ],
        ),
        migrations.CreateModel(
            name='TagTour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(db_index=True, max_length=100, verbose_name='Тег')),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('active_image', models.ImageField(blank=True, null=True, upload_to='photos/tag/active/', verbose_name='Изображение для активного тега')),
                ('inactive_image', models.ImageField(blank=True, null=True, upload_to='photos/tag/inactive/', verbose_name='Изображение для неактивного тега')),
            ],
        ),
        migrations.CreateModel(
            name='Transfer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('slug', models.SlugField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=255)),
                ('duration', models.CharField(blank=True, max_length=50)),
                ('meta_desc', models.TextField(blank=True, db_index=True)),
                ('meta_keywords', models.CharField(blank=True, max_length=255, null=True)),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('description', models.TextField(blank=True, db_index=True)),
                ('included', models.TextField(blank=True, default='Обед, \nМаски и трубки, \nТрансфер из отеля,\nЗавтрак, \nРусский гид')),
                ('not_included', models.TextField(blank=True, default='Сувениры, \nЛичные покупки,\nТрансфер из дальних районов')),
                ('take_with_you', models.TextField(blank=True, default='Солнцезащитный крем, \nСолнцезащитные очки,\nДеньги на личные расходы, \nПолотенце, \nКупальник, \nШляпу,\nСменную одежду')),
                ('adult_price', models.IntegerField(blank=True, null=True)),
                ('child_price', models.IntegerField(blank=True, null=True)),
                ('children_possible', models.BooleanField(default=False, null=True)),
                ('what_age_child_free', models.IntegerField(blank=True, null=True)),
                ('pregnant_possible', models.BooleanField(default=False, null=True)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='photos/%Y/%m/%d/')),
                ('usage_policy', models.TextField(blank=True, default='После подтверждения вашего бронирования, вам на указанную почту или месенжер придет письмо с ваучером. В нем будут указаны все данные: наши реквизиты, так же все ваши данные указанные при бронировании. Оператор подтвердит ваше время заблаговременно. Пожалуйста, выходите в лобби отеля (место пикапа) за 10 минут до назначенного времени!\n    В день когда вас будут забирать с вашего места проживания на экскурсию, вы можете предъявить водителю распечатанный или мобильный ваучер показав его прямо на телефоне. Ваучер действителен только в указанные дату и время тура. \n    Трансфер осуществляется в обе стороны с вашего отеля! С дальних районов взимается дополнительная плата за частный трансфер который и оплачивается непосредственно оператору.')),
                ('time_create', models.DateTimeField(auto_now_add=True)),
                ('time_update', models.DateTimeField(auto_now=True)),
                ('is_published', models.IntegerField(choices=[(0, 'Черновик'), (1, 'Опубликовано')], default=1)),
                ('promotions', models.BooleanField(default=False, null=True)),
                ('author', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tours', to=settings.AUTH_USER_MODEL)),
                ('cat', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='tours', to='tour.category')),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='city.city')),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='country.country')),
                ('faqs', models.ManyToManyField(blank=True, related_name='faqs', to='tour.faq')),
                ('lang', models.ManyToManyField(blank=True, related_name='lang', to='tour.langtour')),
                ('tags', models.ManyToManyField(blank=True, related_name='tags', to='tour.tagtour')),
                ('transfer', models.ManyToManyField(blank=True, to='tour.transfer')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='tour.type')),
            ],
        ),
        migrations.CreateModel(
            name='Programm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=255)),
                ('duration', models.CharField(blank=True, max_length=50)),
                ('description', models.TextField(blank=True, db_index=True)),
                ('adult_price', models.IntegerField(blank=True)),
                ('child_price', models.IntegerField(blank=True)),
                ('tour', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='programs', to='tour.tour')),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=tour.models.get_upload_path)),
                ('tour', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='tour.tour')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity_adults', models.IntegerField(default=0)),
                ('quantity_children', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('program', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tour.programm')),
                ('transfer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tour.transfer')),
            ],
        ),
        migrations.CreateModel(
            name='Wishlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tour', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tour.tour')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
