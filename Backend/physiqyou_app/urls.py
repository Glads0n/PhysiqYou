from django.urls import path
from .import views

urlpatterns = [
    path('register/',views.register_user),
    path('login/',views.login_view),
    path('logout/',views.logout_user),
    path('setup_profile/',views.setup_profile),
    path("csrf/", views.csrf_view),
    path("my_plan/", views.my_plan),
    path("profile/", views.get_profile),
    path("profile/update/", views.update_profile),
    path('add-food/', views.add_food),
    path('today-food/', views.today_food),
    path("search-food/", views.search_food),
    path("delete-food/<int:id>/", views.delete_food),
    path("seed-workouts/", views.seed_workouts),
    path("workouts/", views.workouts),
    path("add-workout/", views.add_workout),
    path("today-workouts/", views.today_workouts),
    path("delete-workout/<int:id>/", views.delete_workout),
    path("search-workout/",views.search_workout),
    path("dashboard/", views.dashboard_data),
    path("update-weight/", views.update_weight),
    path("progress/", views.progress_data),
    path("send-feedback/",views.send_feedback),

]
