from django.urls import path, include
from .views import *
from . import views


urlpatterns = [
   path('cities/', views.CityListView.as_view()),
   path('city/<slug:slug>/', views.CityDetailView.as_view()),
   path('en/city/<slug:slug>/', views.CityDetailViewEn.as_view()),
   path('city/<slug:city_slug>/category/<slug:cat_slug>', views.CategoryDetailView.as_view()),
]