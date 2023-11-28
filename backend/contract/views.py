from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import auth
from .serializers import DocumentDetailsSerializer, OfficialsSerializer, MyTokenObtainPairSerializer
from .models import DocumentDetails, Officials
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
import random

# Create your views here.
class DocumentsView(APIView):
    def __init__(self):
        pass

    #get all documents from the data base and return it as response
    def get(self, request, *args, **kwargs):
        qs = DocumentDetails.objects.filter(submitted=False)
        documentSerializer = DocumentDetailsSerializer(qs, many=True)
        return Response(documentSerializer.data)

    #Receive data from the Client when processing officer creayes a document and save to database
    def post(self, request, *args, **kwargs):
        print('executed')
        requestdata = request.data
        requestdata['document_id'] = generateDocID()
        serializer = DocumentDetailsSerializer(data=requestdata)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print('serializer invalid')
        return Response(serializer.error)

class AddOfficial(APIView):
    def __init__(self):
        pass

#Receive data from the Client when processing officer creayes a document and save to database
    def post(self, request, *args, **kwargs):
        print('executed')
        requestdata = request.data
        serializer = OfficialsSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print('serializer invalid')
        return Response(serializer.data)

class MyTokenObtainPairView(TokenObtainPairView, APIView):
    serializer_class = MyTokenObtainPairSerializer

def generateDocID():
    alldoc = DocumentDetails.objects.all()
    docid = str(random.randint(100000, 999999))
    '''i = 0
    while i < len(alldoc):
        if docid == str(DocumentDetails[i].document_id):
            docid = str(random.randint(100000, 999999))
            i = 0
        i+=1'''
    return docid
      
@api_view(['GET'])#get all posts by the user's id
def signedDocuments(request):
    current_document = DocumentDetails.objects.filter(submitted=True)
    documentSerializer = DocumentDetailsSerializer(current_document, many=True)
    return Response(documentSerializer.data)


@api_view(['GET'])#get official
def allOfficials(request):
    query_item = request.GET.get('query','')
    official = Officials.objects.get(username=query_item)
    officialSerializer = OfficialsSerializer(official)
    return Response(officialSerializer.data)

@api_view(['GET'])#get document
def getDocument(request):
    query_item = request.GET.get('query','')
    document = DocumentDetails.objects.get(document_id=query_item)
    documentSerializer = DocumentDetailsSerializer(document)
    return Response(documentSerializer.data)

@csrf_exempt
@api_view(["PUT"])
def updateDocument(request):
    # Assuming you have an Item model with a boolean field named 'booleanField'
    query_item = request.GET.get('query','')
    document = get_object_or_404(DocumentDetails, document_id=query_item)

    # Assuming you have a serializer for your Item model
    serializer = DocumentDetailsSerializer(document, data=request.data, partial=True)

    if serializer.is_valid():
        # Update the boolean field
        serializer.save()
        return Response(serializer.data, status=200)
    else:
        return Response(serializer.errors, status=400)
