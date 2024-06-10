from rest_framework import serializers
from .models import *
from contacts.models import *
from contacts.serializers import *



class SupportListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Support
        fields = ('id', 'name', 'phone', 'description', 'link_whatsapp', 'link_telegram', 'link_facebook', 'link_instagram', 'link_youtube')