from django.urls import path, include
from .views import *
from . import views


urlpatterns = [
   path('tours/', views.TourListView.as_view()),
   path('tour/create/', views.TourCreateView.as_view(), name='tour-create'),
   path('tours/<slug:slug>/', views.TourDetailView.as_view(), name='tour-detail'),
   path('tour/update/<int:pk>', views.TourUpdateView.as_view()),

   path('tour/categories/', views.CategoryView.as_view()),
   path('tour/category/tours', views.CategoryTourView.as_view()),

   path('myoffers/', views.MyOffersListView.as_view()),
]
