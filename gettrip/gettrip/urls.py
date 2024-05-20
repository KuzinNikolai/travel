"""
URL configuration for gettrip project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from gettrip import settings
from tour import views
from users.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('tour.urls')),
    path('', include('country.urls')),
    path('api/v1/cities', include('city.urls')),
    path('api/v1/', include('city.urls')),
    path('api/v1/en/', include('city.urls')),
    path('', include('tour.urls')), 

    path('api/v1/orders/', views.OrderCreateAPIView.as_view(), name='order-create'),
    path('api/v1/my_orders/', views.MyOrdersListView.as_view(), name='my-orders'),
    path('api/v1/orders/<int:pk>/edit/', views.OrderUpdateView.as_view(), name='order-edit'),

    path('api/v1/tours/add_review/<int:pk>', views.ReviewCreateAPIView.as_view(), name='create-review'),

    path('api/v1/add_wishlist/<int:pk>', views.AddToWishlistView.as_view(), name='add-wishlist'),
    path('api/v1/remove_wishlist/<int:pk>', views.RemoveFromWishlistView.as_view(), name='remove-wishlist'),
    path('api/v1/my_wishlist/', views.WishlistListView.as_view(), name='wishlist-list'),

    path('api/v1/help/', views.HelpCreateAPIView.as_view(), name='get-help'),
    path('api/v1/my_help/', views.MyHelpListView.as_view(), name='my-help'),
    
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/users/', CustomUserViewSet.as_view({'get': 'list', 'post': 'create'}), name='user-list'),
    path('api/v1/users/<int:pk>/', CustomUserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='user-detail'),
    path('api/v1/users/update/<int:pk>/', UserUpdateView.as_view(), name='user-update'),

    re_path(r'^auth/', include('djoser.urls.authtoken')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)         
