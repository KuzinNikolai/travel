from django.urls import path, include
from .views import *
from . import views
from rest_framework import routers


urlpatterns = [
    path("tour/update/<int:pk>/", views.TourUpdateView.as_view(), name="tour_update"),
    path("tour/create/", views.TourCreateView.as_view(), name="tour-create"),
    path("tour/photo/", views.PhotoApiView.as_view(), name="tour-photo"),
    path("tour/program/", views.ProgramApiView.as_view(), name="tour_program"),
    path("tour/options/", views.OptionsApiView.as_view(), name="options"),
]
