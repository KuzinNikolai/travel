# Generated by Django 5.0.3 on 2024-07-16 07:07

import django.db.models.deletion
import parler.fields
import parler.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tour', '0028_alter_tour_take'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='area',
            name='name',
        ),
        migrations.RemoveField(
            model_name='category',
            name='background_color',
        ),
        migrations.RemoveField(
            model_name='category',
            name='description',
        ),
        migrations.RemoveField(
            model_name='category',
            name='name',
        ),
        migrations.RemoveField(
            model_name='category',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='hotel',
            name='address',
        ),
        migrations.RemoveField(
            model_name='hotel',
            name='name',
        ),
        migrations.RemoveField(
            model_name='included',
            name='name',
        ),
        migrations.RemoveField(
            model_name='langtour',
            name='name',
        ),
        migrations.RemoveField(
            model_name='notincluded',
            name='name',
        ),
        migrations.RemoveField(
            model_name='order',
            name='full_name',
        ),
        migrations.RemoveField(
            model_name='order',
            name='hotel',
        ),
        migrations.RemoveField(
            model_name='order',
            name='pickup_time',
        ),
        migrations.RemoveField(
            model_name='order',
            name='room_number',
        ),
        migrations.RemoveField(
            model_name='order',
            name='text',
        ),
        migrations.RemoveField(
            model_name='programm',
            name='description',
        ),
        migrations.RemoveField(
            model_name='programm',
            name='duration',
        ),
        migrations.RemoveField(
            model_name='programm',
            name='title',
        ),
        migrations.RemoveField(
            model_name='reviews',
            name='text',
        ),
        migrations.RemoveField(
            model_name='tagtour',
            name='tag',
        ),
        migrations.RemoveField(
            model_name='tourtranslation',
            name='adult_price',
        ),
        migrations.RemoveField(
            model_name='tourtranslation',
            name='average_rating',
        ),
        migrations.RemoveField(
            model_name='tourtranslation',
            name='child_price',
        ),
        migrations.RemoveField(
            model_name='tourtranslation',
            name='children_possible',
        ),
        migrations.RemoveField(
            model_name='tourtranslation',
            name='pregnant_possible',
        ),
        migrations.RemoveField(
            model_name='tourtranslation',
            name='promotions',
        ),
        migrations.RemoveField(
            model_name='tourtranslation',
            name='what_age_child_free',
        ),
        migrations.RemoveField(
            model_name='transfer',
            name='name',
        ),
        migrations.RemoveField(
            model_name='type',
            name='name',
        ),
        migrations.CreateModel(
            name='AreaTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('name', models.CharField(max_length=255)),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.area')),
            ],
            options={
                'verbose_name': 'район Translation',
                'db_table': 'tour_area_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases = (parler.models.TranslatableModel, models.Model)
        ),
        migrations.CreateModel(
            name='CategoryTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('description', models.TextField(blank=True, db_index=True)),
                ('background_color', models.CharField(blank=True, max_length=50, null=True)),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.category')),
            ],
            options={
                'verbose_name': 'Категорию Translation',
                'db_table': 'tour_category_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases = (parler.models.TranslatableModel, models.Model)
        ),
        migrations.CreateModel(
            name='HotelTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('name', models.CharField(max_length=255)),
                ('address', models.TextField()),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.hotel')),
            ],
            options={
                'verbose_name': 'отель Translation',
                'db_table': 'tour_hotel_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases = (parler.models.TranslatableModel, models.Model)
        ),
        migrations.CreateModel(
            name='IncludedTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('name', models.CharField(max_length=100)),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.included')),
            ],
            options={
                'verbose_name': 'Включено в тур Translation',
                'db_table': 'tour_included_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases = (parler.models.TranslatableModel, models.Model)
        ),
        migrations.CreateModel(
            name='LangTourTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.langtour')),
            ],
            options={
                'verbose_name': 'язык Translation',
                'db_table': 'tour_langtour_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases = (parler.models.TranslatableModel, models.Model)
        ),
        migrations.CreateModel(
            name='NotIncludedTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('name', models.CharField(max_length=100)),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.notincluded')),
            ],
            options={
                'verbose_name': 'Не включено в тур Translation',
                'db_table': 'tour_notincluded_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases = (parler.models.TranslatableModel, models.Model)
        ),
        migrations.CreateModel(
            name='OrderTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('full_name', models.CharField(max_length=50)),
                ('hotel', models.CharField(blank=True, max_length=150, null=True)),
                ('room_number', models.CharField(blank=True, max_length=30, null=True)),
                ('pickup_time', models.CharField(blank=True, max_length=20, null=True)),
                ('text', models.TextField(blank=True, default=None, max_length=200, null=True)),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.order')),
            ],
            options={
                'verbose_name': 'Заказ Translation',
                'db_table': 'tour_order_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases = (parler.models.TranslatableModel, models.Model)
        ),
        migrations.CreateModel(
            name='ProgrammTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('title', models.CharField(db_index=True, max_length=255)),
                ('duration', models.CharField(blank=True, max_length=50)),
                ('description', models.TextField(blank=True, db_index=True)),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.programm')),
            ],
            options={
                'verbose_name': 'programm Translation',
                'db_table': 'tour_programm_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases = (parler.models.TranslatableModel, models.Model)
        ),
        migrations.CreateModel(
            name='ReviewsTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('text', models.TextField()),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.reviews')),
            ],
            options={
                'verbose_name': 'Отзыв Translation',
                'db_table': 'tour_reviews_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases = (parler.models.TranslatableModel, models.Model)
        ),
        migrations.CreateModel(
            name='TagTourTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('tag', models.CharField(db_index=True, max_length=100, verbose_name='Тег')),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.tagtour')),
            ],
            options={
                'verbose_name': 'тег Translation',
                'db_table': 'tour_tagtour_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases = (parler.models.TranslatableModel, models.Model)
        ),
        migrations.CreateModel(
            name='TransferTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('name', models.CharField(max_length=100)),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.transfer')),
            ],
            options={
                'verbose_name': 'Трансфер Translation',
                'db_table': 'tour_transfer_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases=(parler.models.TranslatableModel, models.Model),
        ),
        migrations.CreateModel(
            name='TypeTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='tour.type')),
            ],
            options={
                'verbose_name': 'Тип экскурсии Translation',
                'db_table': 'tour_type_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases=(parler.models.TranslatableModel, models.Model),
        ),
    ]
