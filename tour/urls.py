from django.urls import path, include
from .views import *
from . import views
from rest_framework import routers



urlpatterns = [
    path('tour/update/<int:pk>/', views.TourUpdateView.as_view(), name="tour_update"),
    path('tour/create/', views.TourCreateView.as_view(), name='tour-create'),
    path('tour/file/', views.FileApiView.as_view(), name="tour-file")
]
