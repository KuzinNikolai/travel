from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import Tour

class TourAPISitemap(Sitemap):
    priority = 1.0

    def items(self):
        return Tour.objects.all()

    def location(self, obj):
        return reverse('tour-detail', args=[obj.pk])

    def lastmod(self, obj):
        return obj.time_update
