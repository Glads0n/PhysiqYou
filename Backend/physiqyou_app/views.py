from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer,ProfileSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .models import FoodLog
from .serializers import FoodLogSerializer,WorkoutSerializer,WorkoutLogSerializer


# Create your views here.
@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        
        return Response(
            {
                'message': 'User created !',
                'user': serializer.data
            },
            status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# from django.views.decorators.csrf import csrf_exempt
# @csrf_exempt
@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    username = serializer.validated_data['username']
    password = serializer.validated_data['password']

    user = authenticate(request, username=username, password=password)

    if user:
        login(request, user)
        session_id = request.session.session_key
        return Response({
            'message': 'Login successful',
            'session_id': session_id
        })

    return Response({'error': 'Invalid credentials'}, status=401)

@api_view(["GET"])
@ensure_csrf_cookie
def csrf_view(request):
    return JsonResponse({"message": "CSRF cookie set"})

@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({'message': 'Logged out successfully!'})


# @api_view(["GET"])
# def check_auth(request):
#     if request.user.is_authenticated:
#         return Response({"authenticated": True})
#     return Response({"authenticated": False})

@api_view(["POST"])
def setup_profile(request):

    if not request.user.is_authenticated:
        return Response({"error": "Login required"}, status=401)

    # Check if profile already exists
    profile = Profile.objects.filter(user=request.user).first()

    if profile:
        serializer = ProfileSerializer(profile, data=request.data)
    else:
        serializer = ProfileSerializer(data=request.data)

    if serializer.is_valid():
        profile = serializer.save(user=request.user, is_setup_complete=True)
        if not WeightLog.objects.filter(user=request.user).exists():
            WeightLog.objects.create(
                user=request.user,
                weight=profile.current_weight
            )
        return Response({"message": "Profile setup completed"})

    return Response(serializer.errors)

# from django.http import JsonResponse


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required

from .models import Profile
from .serializers import PlanSerializer
from .utils import calculate_plan


@api_view(["GET"])
def my_plan(request):

    user = request.user

    if not user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=401)

    try:
        profile = Profile.objects.get(user=user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile not setup"}, status=400)


    if not profile.is_setup_complete:
        return Response({"error": "Profile not setup"}, status=400)


    plan = calculate_plan(profile)

    serializer = PlanSerializer(profile)

    return Response({
        "profile": serializer.data,
        "plan": plan
    })


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileViewSerializer, UserSerializer


@api_view(["GET"])
def get_profile(request):

    if not request.user.is_authenticated:
        return Response({"error": "Login required"}, status=401)

    profile = Profile.objects.get(user=request.user)

    profile_data = ProfileViewSerializer(profile).data
    user_data = UserSerializer(request.user).data

    return Response({
        "profile": profile_data,
        "user": user_data
    })


@api_view(["PUT"])
def update_profile(request):

    if not request.user.is_authenticated:
        return Response({"error": "Login required"}, status=401)

    profile = Profile.objects.get(user=request.user)

    profile_serializer = ProfileViewSerializer(
        profile, data=request.data.get("profile"), partial=True
    )

    user_serializer = UserSerializer(
        request.user, data=request.data.get("user"), partial=True
    )

    if profile_serializer.is_valid() and user_serializer.is_valid():
        profile_serializer.save()
        user_serializer.save()

        return Response({"message": "Profile updated successfully"})

    return Response({
        "profile_errors": profile_serializer.errors,
        "user_errors": user_serializer.errors
    })


@api_view(['POST'])
def add_food(request):

    data = request.data.copy()
    data['user'] = request.user.id

    serializer = FoodLogSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)



from datetime import date

@api_view(['GET'])
def today_food(request):

    foods = FoodLog.objects.filter(
        user=request.user,
        date=date.today()
    )

    serializer = FoodLogSerializer(foods, many=True)

    return Response(serializer.data)



import requests

API_KEY = "KU9A3Lohm26U5hoi2VoOzaXcxqEaCSU113dV7Umq"

@api_view(['GET'])
def search_food(request):

    query = request.GET.get("query")

    url = f"https://api.nal.usda.gov/fdc/v1/foods/search"

    params = {
        "query": query,
        "api_key": API_KEY
    }

    response = requests.get(url, params=params)

    data = response.json()

    foods = []

    for food in data.get("foods", [])[:10]:

        calories = None

        for nutrient in food.get("foodNutrients", []):
            if nutrient["nutrientName"] == "Energy":
                calories = nutrient["value"]

        foods.append({
            "name": food["description"],
            "calories": calories
        })

    return Response(foods)


from rest_framework import status
from .models import FoodLog


@api_view(['DELETE'])
def delete_food(request, id):

    try:
        food = FoodLog.objects.get(id=id, user=request.user)

    except FoodLog.DoesNotExist:
        return Response({"error": "Food not found"}, status=404)

    food.delete()

    return Response({"message": "Food deleted"}, status=status.HTTP_204_NO_CONTENT)




from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Workout


@api_view(["GET"])
def seed_workouts(request):

    workouts = [
        {"name": "Walking", "met_value": 3.5},
        {"name": "Jogging", "met_value": 7},
        {"name": "Running", "met_value": 9.8},
        {"name": "Cycling", "met_value": 8},
        {"name": "Swimming", "met_value": 8},
        {"name": "Jump Rope", "met_value": 12},
        {"name": "Pushups", "met_value": 8},
        {"name": "Weight Training", "met_value": 6},
        {"name": "Yoga", "met_value": 3},
        {"name": "HIIT", "met_value": 10}
    ]

    for w in workouts:
        Workout.objects.get_or_create(
            name=w["name"],
            met_value=w["met_value"]
        )

    return Response({"message": "Workouts added successfully"})


@api_view(["GET"])
def workouts(request):

    workouts = Workout.objects.all()

    serializer = WorkoutSerializer(workouts, many=True)

    return Response(serializer.data)



from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Workout, WorkoutLog, Profile
from .serializers import WorkoutLogSerializer


@api_view(["POST"])
def add_workout(request):

    workout_id = request.data.get("workout_id")
    duration = request.data.get("duration")
    print(request.data)

    # validate input
    if not workout_id or not duration:
        return Response(
            {"error": "workout_id and duration are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        duration = int(duration)
    except ValueError:
        return Response(
            {"error": "Duration must be a number"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        workout = Workout.objects.get(id=workout_id)
    except Workout.DoesNotExist:
        return Response(
            {"error": "Workout not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    profile = Profile.objects.get(user=request.user)
    weight = profile.current_weight

    duration_hours = duration / 60

    calories = workout.met_value * weight * duration_hours

    log = WorkoutLog.objects.create(
        user=request.user,
        workout_name=workout.name,
        duration=duration,
        calories_burned=calories
    )

    serializer = WorkoutLogSerializer(log)

    return Response(serializer.data, status=status.HTTP_201_CREATED)
    

from datetime import date

@api_view(["GET"])
def today_workouts(request):

    logs = WorkoutLog.objects.filter(
        user=request.user,
        date=date.today()
    )

    serializer = WorkoutLogSerializer(logs, many=True)

    return Response(serializer.data)


@api_view(["DELETE"])
def delete_workout(request, id):

    log = WorkoutLog.objects.get(id=id, user=request.user)

    log.delete()

    return Response({"message": "deleted"})

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Workout

@api_view(['GET'])
def search_workout(request):

    query = request.GET.get('query', '')

    workouts = Workout.objects.filter(name__icontains=query)[:10]

    data = []

    for workout in workouts:
        data.append({
            "name": workout.name,
        })

    return Response(data)


from django.db.models import Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import FoodLog, WorkoutLog, Profile
from .utils import calculate_plan


@api_view(["GET"])
def dashboard_data(request):

    user = request.user

    profile = Profile.objects.filter(user=user).first()

    if not profile or not profile.is_setup_complete:
        return Response({
            "setup_required": True
        })

    # calculate calorie plan
    plan = calculate_plan(profile)

    calorie_target = plan["daily_calories"]
    burn_target = plan["daily_burn"]

    # calories consumed today
    food_today = FoodLog.objects.filter(user=user).aggregate(
        total=Sum("calories")
    )

    calories_consumed = food_today["total"] or 0


    # calories burned today
    workout_today = WorkoutLog.objects.filter(user=user).aggregate(
        total=Sum("calories_burned")
    )

    calories_burned = workout_today["total"] or 0


    # progress
    progress = 0
    if calorie_target > 0:
        progress = (calories_consumed / calorie_target) * 100


    return Response({
        "setup_required": False,
        "name": user.first_name or user.username,

        "calories_consumed": round(calories_consumed),
        "calorie_target": calorie_target,

        "calories_burned": round(calories_burned),
        "burn_target": burn_target,

        "weight": profile.current_weight,

        "progress": round(progress)
    })



from .models import WeightLog
@api_view(["POST"])
def update_weight(request):

    weight = request.data.get("weight")

    if not weight:
        return Response(
            {"error": "Weight is required"},
            status=400
        )

    try:
        weight = float(weight)
    except:
        return Response(
            {"error": "Invalid weight"},
            status=400
        )

    profile = Profile.objects.get(user=request.user)

    # update current weight
    profile.current_weight = weight
    profile.save()

    # save weight history
    WeightLog.objects.create(
        user=request.user,
        weight=weight
    )

    return Response({
        "message": "Weight updated successfully",
        "weight": weight
    })



from django.db.models import Sum
from datetime import date, timedelta
@api_view(["GET"])
def progress_data(request):

    user = request.user

    profile = Profile.objects.filter(user=user).first()
    if not profile:
        return Response({"error": "Profile not found"}, status=404)

    today = date.today()

    # -------- Daily --------
    food_today = FoodLog.objects.filter(user=user, date=today).aggregate(
        total=Sum("calories")
    )
    workout_today = WorkoutLog.objects.filter(user=user, date=today).aggregate(
        total=Sum("calories_burned")
    )

    daily = {
        "calories_consumed": food_today["total"] or 0,
        "calories_burned": workout_today["total"] or 0
    }

    # -------- Weekly --------
    last7 = today - timedelta(days=6)

    food_week = (
        FoodLog.objects.filter(user=user, date__gte=last7)
        .values("date")
        .annotate(total=Sum("calories"))
    )

    workout_week = (
        WorkoutLog.objects.filter(user=user, date__gte=last7)
        .values("date")
        .annotate(total=Sum("calories_burned"))
    )

    weekly_food = {str(i["date"]): i["total"] for i in food_week}
    weekly_workout = {str(i["date"]): i["total"] for i in workout_week}

    week_labels = []
    food_data = []
    workout_data = []

    for i in range(7):
        d = last7 + timedelta(days=i)
        ds = str(d)

        week_labels.append(ds)
        food_data.append(weekly_food.get(ds, 0))
        workout_data.append(weekly_workout.get(ds, 0))

    # -------- Weight Progress --------
    weights = WeightLog.objects.filter(user=user).order_by("date")

    weight_dates = [str(w.date) for w in weights]
    weight_values = [w.weight for w in weights]

    return Response({
        "daily": daily,
        "weekly": {
            "labels": week_labels,
            "food": food_data,
            "workout": workout_data
        },
        "weight": {
            "dates": weight_dates,
            "values": weight_values
        }
    })


from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User


@api_view(['POST'])
def send_feedback(request):

    user = request.user

    message = request.data.get("message")

    if not message:
        return Response({"error": "Feedback message required"}, status=400)

    email_message = f"""
    Feedback from user: {user.username}

    {message}
    """

    send_mail(

        subject="New PhysiqYou Feedback",

        message=email_message,

        from_email=None,

        recipient_list=["yourgmail@gmail.com"],

        fail_silently=False,

    )

    return Response({"message": "Feedback sent successfully"})