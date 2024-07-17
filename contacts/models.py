from django.db import models
from parler.models import TranslatableModel, TranslatedFields

class Support(TranslatableModel):
    translations = TranslatedFields(
        name = models.CharField(max_length=100),
        description = models.TextField(max_length=500, null=True, blank=True)
    )

    phone = models.CharField(max_length=20, null=True, blank=True) 
    email = models.EmailField(max_length=254, null=True, blank=True)
    link_whatsapp = models.CharField(max_length=100, null=True, blank=True)
    link_telegram = models.CharField(max_length=100, null=True, blank=True)
    link_viber = models.CharField(max_length=100, null=True, blank=True)
    link_facebook = models.CharField(max_length=100, null=True, blank=True)
    link_instagram = models.CharField(max_length=100, null=True, blank=True)
    link_youtube = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name