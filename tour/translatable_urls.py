from django.urls import path, include
from .views import *
from . import views



urlpatterns = [
   path('tours/', views.TourListView.as_view()),
   path('tours/<slug:slug>/', views.TourDetailView.as_view(), name='tour-detail'),
   path("tour/program/", views.ProgramApiView.as_view(), name="tour_program"),
   path("tour/options/", views.OptionsApiView.as_view(), name="options"),

   path('tour/categories/', views.CategoryView.as_view()),
   path('tour/category/tours', views.CategoryTourView.as_view()),

   path('myoffers/', views.MyOffersListView.as_view()),
   
   path('faq/', views.FAQView.as_view()),
]