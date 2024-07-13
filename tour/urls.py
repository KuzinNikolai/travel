from django.urls import path, include
from .views import *
from . import views
from rest_framework import routers



urlpatterns = [
   path('tours/', views.TourListView.as_view()),
   path('tours/<slug:slug>/', views.TourDetailView.as_view(), name='tour-detail'),
   path('tour/update/<int:pk>/', views.TourUpdateView.as_view()),
   path('tour/create/', views.TourCreateView.as_view(), name='tour-create'),

   path('tour/categories/', views.CategoryView.as_view()),
   path('tour/category/tours', views.CategoryTourView.as_view()),

   path('myoffers/', views.MyOffersListView.as_view()),
   
   path('faq/', views.FAQView.as_view()),
]
