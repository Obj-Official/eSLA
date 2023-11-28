from rest_framework import serializers
from .models import DocumentDetails, Officials
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class DocumentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model =   DocumentDetails
        fields = (
             'document_id', 'document_title', 'document_description','document_body', 'created_at', 'signature1_added', 'signature2_added', 'signature3_added', 'signature1', 'signature2', 'signature3', 'submitted', 'submitted_at'
        )

class OfficialsSerializer(serializers.ModelSerializer):       
    class Meta:
        model =   Officials
        fields = (
            'first_name', 'last_name' , 'username' , 'email',  'password', 'officer_id', 'officer_department','isProcessingOfficer','signature'
        )

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token