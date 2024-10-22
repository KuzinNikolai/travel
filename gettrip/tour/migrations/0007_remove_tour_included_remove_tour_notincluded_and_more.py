# Generated by Django 5.0.3 on 2024-05-20 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tour', '0006_remove_tour_not_included_remove_tour_take_with_you_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tour',
            name='included',
        ),
        migrations.RemoveField(
            model_name='tour',
            name='notincluded',
        ),
        migrations.RemoveField(
            model_name='tour',
            name='take',
        ),
        migrations.AddField(
            model_name='tour',
            name='included',
            field=models.ManyToManyField(blank=True, to='tour.included'),
        ),
        migrations.AddField(
            model_name='tour',
            name='notincluded',
            field=models.ManyToManyField(blank=True, to='tour.notincluded'),
        ),
        migrations.AddField(
            model_name='tour',
            name='take',
            field=models.ManyToManyField(blank=True, to='tour.take'),
        ),
    ]
