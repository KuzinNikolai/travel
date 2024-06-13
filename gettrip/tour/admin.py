
from django.contrib import admin
from django import forms
from .models import *
from contacts.models import *

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


class SupportAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('name',)


class CityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


class TagTourAdmin(admin.ModelAdmin):
    list_display = ('id', 'tag', 'slug')
    list_display_links = ('id', 'tag')
    search_fields = ('tag',)
    prepopulated_fields = {'slug': ('tag',)}

class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 1


class ProgrammInline(admin.StackedInline):
    model = Programm
    extra = 1 


class TourAdmin(admin.ModelAdmin):
    inlines = [ProgrammInline, PhotoInline]  # Объедините оба включения в одном списке

    list_display = ('id', 'title', 'time_create', 'photo', 'is_published')
    list_display_links = ('id', 'title')
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)} 

class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'answer') 


class OrderAdmin(admin.ModelAdmin):
    list_display = ('tour', 'trip_date')       

admin.site.register(Tour, TourAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(TagTour, TagTourAdmin)
admin.site.register(FAQ, FAQAdmin)
admin.site.register(Support, SupportAdmin)
admin.site.register(Order, OrderAdmin)
#admin.site.register(Programm)