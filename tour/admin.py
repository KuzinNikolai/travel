from django.contrib import admin
from django import forms
from django.http import HttpRequest
from django.http.response import HttpResponse
from parler.admin import TranslatableAdmin, TranslatableInlineModelAdmin

from .models import *
from contacts.models import *
from users.models import *


class CategoryAdmin(TranslatableAdmin):
    list_display = ("id", "name", "slug")
    list_display_links = ("id", "name")
    search_fields = ("name",)

    def get_prepopulated_fields(self, request, obj=None):
        # # can't use `prepopulated_fields = ..` because it breaks the admin validation
        # # for translated fields. This is the official django-parler workaround.
        return {"slug": ("name",)}


class CountryAdmin(TranslatableAdmin):
    list_display = ("id", "name", "slug")
    list_display_links = ("id", "name")
    search_fields = ("name",)

    def get_prepopulated_fields(self, request, obj=None):
        return {"slug": ("name",)}


class CityAdmin(TranslatableAdmin):
    list_display = ("id", "name", "slug", "is_published")
    list_display_links = ("id", "name")
    search_fields = ("name",)

    def get_prepopulated_fields(self, request, obj=None):
        return {"slug": ("name",)}


class TagTourAdmin(TranslatableAdmin):
    list_display = ("id", "tag", "slug")
    list_display_links = ("id", "tag")
    search_fields = ("tag",)

    def get_prepopulated_fields(self, request, obj=None):
        return {"slug": ("tag",)}


class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 1


class ProgrammInline(TranslatableInlineModelAdmin, admin.StackedInline):
    model = Programm
    extra = 1


class TourAdmin(TranslatableAdmin):
    inlines = [ProgrammInline, PhotoInline]  # Объедините оба включения в одном списке
    list_display = ("id", "title", "time_create", "author", "photo", "is_published")
    list_display_links = ("id", "title", "author")
    search_fields = ("title",)

    def get_prepopulated_fields(self, request, obj=None):
        return {"slug": ("title",)}


class FAQAdmin(TranslatableAdmin):
    list_display = ("question", "answer")


class LangTourAdmin(TranslatableAdmin):
    list_display = ("name", "slug", "photo")


class TransferAdmin(TranslatableAdmin):
    list_display = ("id", "name")


class TakeAdmin(TranslatableAdmin):
    list_display = ("id", "name")


class IncludedAdmin(TranslatableAdmin):
    list_display = ("id", "name")


class NotIncludedAdmin(TranslatableAdmin):
    list_display = ("id", "name")


class SupportAdmin(TranslatableAdmin):
    list_display = ("id", "name")
    list_display_links = ("id", "name")
    search_fields = ("name",)


class OrderAdmin(TranslatableAdmin):
    list_display = (
        "order_number",
        "tour",
        "full_name",
        "quantity_adults",
        "trip_date",
        "total_price",
        "deposit",
        "cash_on_tour_display",
    )
    readonly_fields = ("order_number", "total_price_display", "cash_on_tour_display")

    fieldsets = (
        (None, {"fields": ("order_number", "full_name", "email", "phone")}),
        ("Tour Details", {"fields": ("tour", "program", "hotel", "room_number", "pickup_time", "trip_date", "user")}),
        ("Count of costumers", {"fields": ("quantity_adults", "quantity_children", "quantity_infant")}),
        ("Financial", {"fields": ("transfer", "total_price_display", "deposit", "cash_on_tour_display", "text")}),
    )

    def total_price_display(self, obj):
        return obj.total_price()

    total_price_display.short_description = "Total Price"

    def cash_on_tour_display(self, obj):
        return obj.calculate_cash_on_tour()

    cash_on_tour_display.short_description = "Cash on Tour"


class StaticPageAdmin(TranslatableAdmin):
    list_display = ("id", "title", "slug")
    list_display_links = ("id", "title")
    search_fields = ("title",)

    def get_prepopulated_fields(self, request, obj=None):
        return {"slug": ("title",)}


class HotelAdmin(TranslatableAdmin):
    # fields = ["name", "area", "address", "phone_number", "country"]
    list_display = ("id", "name", "country", "city", "area")
    list_display_links = ("id", "name")
    search_fields = ("name",)


class AreaAdmin(TranslatableAdmin):
    fields = ["name"]
    list_display = ("id", "name", "country", "city")
    list_display_links = ("id", "name")
    search_fields = ("name",)


class TourPhotoAdmin(admin.ModelAdmin):
    list_display = ("id", "tour_id")


class ProgramAdmin(TranslatableAdmin):
    list_display = ("id", "title")


admin.site.register(Programm, ProgramAdmin)
admin.site.register(Photo, TourPhotoAdmin)
admin.site.register(Tour, TourAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(TagTour, TagTourAdmin)
admin.site.register(FAQ, FAQAdmin)
admin.site.register(Transfer, TransferAdmin)
admin.site.register(LangTour, LangTourAdmin)
admin.site.register(Take, TakeAdmin)
admin.site.register(Included, IncludedAdmin)
admin.site.register(NotIncluded, NotIncludedAdmin)
admin.site.register(Support, SupportAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(StaticPage, StaticPageAdmin)
admin.site.register(Hotel, HotelAdmin)
admin.site.register(Area, AreaAdmin)
# admin.site.register(Programm)
