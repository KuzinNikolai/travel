# Generated by Django 5.0.3 on 2024-06-20 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tour', '0018_order_created_at_order_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='tour',
            name='video_link',
            field=models.URLField(blank=True, default='', null=True),
        ),
    ]
