from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings



class User(AbstractUser):

    def __str__(self):
        return str(self.username)


class Profile(models.Model):

    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
        ("other", "Other"),
    ]

    ACTIVITY_LEVEL_CHOICES = [
        ("sedentary", "Sedentary"),
        ("light", "Lightly Active"),
        ("moderate", "Moderately Active"),
        ("very", "Very Active"),
        ("extreme", "Extremely Active"),
    ]

    GOAL_TYPE_CHOICES = [
        ("lose", "Lose Weight"),
        ("maintain", "Maintain Weight"),
        ("gain", "Gain Weight"),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Basic info
    age = models.IntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    height = models.FloatField()  # in cm
    current_weight = models.FloatField()  # in kg

    # Activity
    activity_level = models.CharField(max_length=20, choices=ACTIVITY_LEVEL_CHOICES)

    # Goals
    goal_type = models.CharField(max_length=20, choices=GOAL_TYPE_CHOICES)
    target_weight = models.FloatField()

    weight_change_pace = models.FloatField(default=0.5)  # kg per week

    is_setup_complete = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


class FoodLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food_name = models.CharField(max_length=255)
    calories = models.FloatField()
    quantity = models.FloatField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.food_name}"


class WorkoutLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    workout_name = models.CharField(max_length=255)
    calories_burned = models.FloatField()
    duration = models.IntegerField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.workout_name}"
    

class Workout(models.Model):
    name = models.CharField(max_length=100)
    met_value = models.FloatField()

    def __str__(self):
        return self.name
    

class WeightLog(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    weight = models.FloatField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.weight}kg"