# Generated by Django 5.0.3 on 2024-07-16 07:07

import django.db.models.deletion
import parler.fields
import parler.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('city', '0004_alter_city_options_city_is_published'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='city',
            name='description',
        ),
        migrations.RemoveField(
            model_name='city',
            name='description_en',
        ),
        migrations.RemoveField(
            model_name='city',
            name='meta_desc',
        ),
        migrations.RemoveField(
            model_name='city',
            name='meta_desc_en',
        ),
        migrations.RemoveField(
            model_name='city',
            name='meta_keywords',
        ),
        migrations.RemoveField(
            model_name='city',
            name='meta_keywords_en',
        ),
        migrations.RemoveField(
            model_name='city',
            name='name',
        ),
        migrations.RemoveField(
            model_name='city',
            name='name_en',
        ),
        migrations.RemoveField(
            model_name='city',
            name='title',
        ),
        migrations.RemoveField(
            model_name='city',
            name='title_en',
        ),
        migrations.CreateModel(
            name='CityTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('meta_desc', models.TextField(blank=True, db_index=True)),
                ('meta_keywords', models.CharField(blank=True, max_length=255, null=True)),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True, db_index=True)),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='city.city')),
            ],
            options={
                'verbose_name': 'Город Translation',
                'db_table': 'city_city_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases=(parler.models.TranslatableModel, models.Model),
        ),
    ]