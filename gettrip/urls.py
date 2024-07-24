from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from gettrip import settings
from tour import views
from tour.views import *
from users.views import *



urlpatterns = [
    path('api/v1/', include('city.urls')),
    path('api/v1/en/', include('city.urls')),
    path('api/v1/', include('tour.urls')),

    path('api/v1/orders/', OrderCreateAPIView.as_view(), name='order-create'),
    path('api/v1/orders/<int:pk>/edit/', OrderUpdateView.as_view(), name='order-edit'),

    path('api/v1/tours/add_review/<int:pk>', ReviewCreateAPIView.as_view(), name='create-review'),

    path('api/v1/add_wishlist/<int:pk>', AddToWishlistView.as_view(), name='add-wishlist'),
    path('api/v1/remove_wishlist/<int:pk>', RemoveFromWishlistView.as_view(), name='remove-wishlist'),
    path('api/v1/my_wishlist/', WishlistListView.as_view(), name='wishlist-list'),

    path('api/v1/help/', HelpCreateAPIView.as_view(), name='get-help'),
    path('api/v1/my_help/', MyHelpListView.as_view(), name='my-help'),
    
    path('rosetta/', include('rosetta.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/auth/', include('djoser.urls')),
    re_path('api/v1/auth/', include('djoser.urls.authtoken')),
    path('api/v1/', include('users.urls')),
]

translatable_urlpatterns = i18n_patterns(
    path('admin/', admin.site.urls),
    
    path('api/v1/', include('users.translatable_urls')),
    path('api/v1/', include('tour.translatable_urls')),
    path('api/v1/', include('country.urls')),
    path('api/v1/', include('contacts.urls')),
    path('api/v1/cities/', include('city.urls')),
    
    path('api/v1/my_orders/', MyOrdersListView.as_view(), name='my-orders'),
    
    path('api/v1/tours/<int:pk>/reviews/', TourReviewListAPIView.as_view(), name='tour-reviews'),
    
)

urlpatterns += translatable_urlpatterns


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)         
