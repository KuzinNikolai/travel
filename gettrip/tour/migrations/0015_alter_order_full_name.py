# Generated by Django 5.0.3 on 2024-06-10 02:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tour', '0014_alter_order_email_alter_order_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='full_name',
            field=models.CharField(max_length=50),
        ),
    ]
