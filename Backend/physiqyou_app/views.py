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
        serializer.save(user=request.user, is_setup_complete=True)
        return Response({"message": "Profile setup completed"})

    return Response(serializer.errors)

from django.http import JsonResponse
