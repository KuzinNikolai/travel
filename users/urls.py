from django.urls import path
from .views import *
from .serializers import *

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('become-guide/', BecomeGuideView.as_view(), name='become-guide'),
    path('about/', StaticPageListView.as_view(), name='static_page_list'),
    path('about/<slug:slug>/', StaticPageDetailView.as_view(), name='static_page_detail'),
    
    path('profile/<int:pk>/', GuideProfileView.as_view(), name='guide-profile'),
    path('guide-orders/', GuideOrdersView.as_view(), name='guide-orders'),
]