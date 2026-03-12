from rest_framework import serializers
from .models import User,Profile
from .models import FoodLog
from .models import Profile, Workout,WorkoutLog
from django.contrib.auth import get_user_model


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        error_messages={
            "min_length": "Password must be at least 8 characters long."
        }
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(min_length=8)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ["user", "is_setup_complete"]


class PlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = [
            "age",
            "gender",
            "height",
            "current_weight",
            "activity_level",
            "goal_type",
            "target_weight",
            "weight_change_pace",
        ]



User = get_user_model()


class ProfileViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ["user"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email"]




class FoodLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodLog
        fields = '__all__'


class WorkoutSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workout
        fields = "__all__"


class WorkoutLogSerializer(serializers.ModelSerializer):

    # workout_name = serializers.CharField(source="workout.name", read_only=True)

    class Meta:
        model = WorkoutLog
        fields = ["id", "workout_name", "duration", "calories_burned", "date"]



from .models import WeightLog
class WeightLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = WeightLog
        fields = "__all__"