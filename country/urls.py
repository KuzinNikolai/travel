from django.urls import path, include
from .views import *
from . import views


urlpatterns = [
   path('countries/', views.CountryListView.as_view()),
   path('country/<slug:slug>/', views.CountryDetailView.as_view()),
]