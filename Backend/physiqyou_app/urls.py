from django.urls import path
from .import views

urlpatterns = [
    path('register/',views.register_user),
    path('login/',views.login_view),
    path('logout/',views.logout_user),
    path('setup_profile/',views.setup_profile),
    path("csrf/", views.csrf_view),
]
