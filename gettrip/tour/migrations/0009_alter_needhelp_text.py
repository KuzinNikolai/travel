# Generated by Django 5.0.3 on 2024-05-20 23:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tour', '0008_needhelp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='needhelp',
            name='text',
            field=models.TextField(blank=True, max_length=500),
        ),
    ]
