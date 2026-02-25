from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from base.serializers import UserSerializer
from base.serializers import UserSerializerWithToken
from rest_framework.status import *
from django.http import JsonResponse
from django.db import connection
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.template.loader import render_to_string
from django.conf import settings

# from django.http import JsonResponse
# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
     def validate(self, attrs):
        data = super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer
    def post(self,request, *args, **kwargs):
        response=super().post(request,*args,**kwargs)
        access_token=response.data.get('access')
        refresh_token=response.data.get('refresh')
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=True,
            samesite='None',
            path='/'
        )
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite='None',
            path='/'
        )
        
        return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    user=request.user
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserById(request,id):
    user=User.objects.get(id=id)
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserAdmin(request,id):
    user=User.objects.get(id=id)
    user.first_name=request.data['name']
    user.email=request.data['email']
    user.is_staff=request.data['isAdmin']
    user.save()
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    user=request.user
    # print(request.COOKIES)
    serializer=UserSerializerWithToken(user,many=False)
    user.first_name=request.data['email']
    user.email=request.data['email']

    if request.data['password']!='':
        user.set_password(request.data['password'])

    user.save()
    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user=User.objects.all()
    serializer=UserSerializer(user,many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,id):
    # print("id ",id)
    user=User.objects.get(id=id)
    try:
        user.delete()
        return Response("deleted succesfully",status=HTTP_200_OK)
    except:
        return Response("Not found",status=HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def registerUsers(request):
    data=request.data
    try:
        validate_email(data['email'])
        validate_password(data['password'])
        user=User.objects.create_user(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=data['password']
        )
        # serializer=UserSerializerWithToken(user,many=False)
        # return Response(serializer.data)
        user.is_active=False
        user.save()
        email=data.get("email")

        user=User.objects.filter(email=email).first()

        if user:
            
            uid=urlsafe_base64_encode(force_bytes(user.pk))
            token=token_generator.make_token(user)
            # print("uid "+uid)
            email_url=(
                f"{settings.FRONTEND_URL}/verify-email?uid={uid}&token={token}"
            )
            # print("flag 3")
            html_content=render_to_string(
                "users/verify_email.html",
                {"email_url":email_url}
            )
            
            try:
                print(settings.DEFAULT_FROM_EMAIL,"\n",settings.SENDGRID_API_KEY)
                message=Mail(
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to_emails=user.email,
                    subject="Proshop verify email request",
                    html_content=html_content
                )
                sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                sg.send(message)
            except Exception as e:
                print("sendgrid error:",e)
        return Response({"message":"Verify email sent"},status=HTTP_200_OK)       
        
    except ValidationError as e:
        message={"message":e.messages}
        return Response(message,status=HTTP_400_BAD_REQUEST)
    except:
        message={'detail':'User already exist with same username'}
        return Response(message,status=HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getUserWithToken(request):
    user=request.user
    serializer=UserSerializerWithToken(user,many=False)
    return Response(serializer.data)


@api_view(['POST'])
def logoutUser(request):
    response=Response({"detail":"Logout successfully"},status=HTTP_200_OK)
    response.set_cookie(
            key='access_token',
            value='',
            max_age=0,
            expires='Thu, 01 Jan 1970 00:00:00 GMT',
            httponly=True,
            secure=True,
            samesite='None',
            path='/'
        )
    response.set_cookie(
            key='refresh_token',
            value='',
            max_age=0,
            expires='Thu, 01 Jan 1970 00:00:00 GMT',
            httponly=True,
            secure=True,
            samesite='None',
            path='/'
        )
    return response

def health_check(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1;")
        row=cursor.fetchone()
    return JsonResponse({"status":"ok","db":row[0]})


token_generator=PasswordResetTokenGenerator()
@api_view(['POST'])
def forgot_password(request):
    data=request.data
    email=data.get("email")

    if not email:
        return Response({"message":"If user exit, email sent"})
    
    user=User.objects.filter(email=email).first()

    if user:
        uid=urlsafe_base64_encode(force_bytes(user.pk))
        token=token_generator.make_token(user)
        # print("uid "+uid)
        reset_link=(
            f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"
        )
        html_content=render_to_string(
            "users/reset_password_email.html",
            {"reset_link":reset_link}
        )
        
        try:
            message=Mail(
                from_email=settings.DEFAULT_FROM_EMAIL,
                to_emails=user.email,
                subject="Proshop password reset request",
                html_content=html_content
            )
            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            sg.send(message)
        except Exception as e:
            print("sendgrid error:",e)
    return Response({"message":"If user exit, email sent"},status=HTTP_200_OK)


#verify email for register  
@api_view(['POST'])
def verify_email(request):
    data=request.data
    uid=data['uid']
    token=data['token']
    

    if not uid or not token :
        return Response({"message":"Invalid attempt"},status=HTTP_400_BAD_REQUEST)
    try:
        user_id=force_str(urlsafe_base64_decode(uid))
        user=User.objects.get(id=user_id)
    except :
        return Response(
            {"message": "Invalid verify link"},
            status=HTTP_400_BAD_REQUEST
        )

    if not token_generator.check_token(user,token):
        return Response({"message":" Token expired or invalid"},status=HTTP_400_BAD_REQUEST)
    
    user.is_active=True
    user.save()

    return Response({"message":"Email verified Successfully"},
                    status=HTTP_200_OK)


@api_view(['POST'])
def reset_password(request):
    data=request.data
    uid=data['uid']
    token=data['token']
    password=data['password']

    if not uid or not token or not password:
        return Response({"message":"Invalid attempt"},status=HTTP_400_BAD_REQUEST)
    try:
        user_id=force_str(urlsafe_base64_decode(uid))
        user=User.objects.get(id=user_id)
    except :
        return Response(
            {"message": "Invalid reset link"},
            status=HTTP_400_BAD_REQUEST
        )

    if not token_generator.check_token(user,token):
        return Response({"message":" Token expired or invalid"},status=HTTP_400_BAD_REQUEST)
    
    user.set_password(password)
    user.save()

    return Response({"message":"Password reset Successfully"},
                    status=HTTP_200_OK)
