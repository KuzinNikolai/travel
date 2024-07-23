from django.urls import path
from .views import *
urlpatterns = [
    path('about/<slug:slug>/', StaticPageDetailView.as_view(), name='static_page_detail'),
    path('profile/<int:pk>/', GuideProfileView.as_view(), name='guide-profile'),
    path('guide-orders/', GuideOrdersView.as_view(), name='guide-orders'),
    path('about/', StaticPageListView.as_view(), name='static_page_list'),
]