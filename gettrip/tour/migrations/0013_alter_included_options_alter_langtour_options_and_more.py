# Generated by Django 5.0.3 on 2024-06-09 22:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tour', '0012_alter_photo_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='included',
            options={'verbose_name': 'Включено в тур', 'verbose_name_plural': 'Включено в тур'},
        ),
        migrations.AlterModelOptions(
            name='langtour',
            options={'verbose_name': 'Язык ьура', 'verbose_name_plural': 'Языки туров'},
        ),
        migrations.AlterModelOptions(
            name='take',
            options={'verbose_name': 'Взять с собой', 'verbose_name_plural': 'Взять с собой'},
        ),
        migrations.AlterModelOptions(
            name='tour',
            options={'verbose_name': 'Экскурсия', 'verbose_name_plural': 'Экскурсии'},
        ),
    ]