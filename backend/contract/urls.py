from django.urls import path
from .views import signedDocuments, AddOfficial, allOfficials, DocumentsView, MyTokenObtainPairView, updateDocument, getDocument
from rest_framework_simplejwt.views import  TokenRefreshView

urlpatterns = [
    path('signedDocuments/', signedDocuments, name='signedDocuments'),  
    path('official/', allOfficials, name='officials'),
    path('addOfficial/', AddOfficial.as_view(), name='add-official'), 
    path('getDocument/', getDocument, name='get-document'), 
    path('documents', DocumentsView.as_view(), name='documents'), 
    path('updateDocument/', updateDocument, name='update-documents'), 
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]


