from django.urls import path
from .views import *
from . import views


urlpatterns = [
   path('contacts/', views.SupportListView.as_view())
]