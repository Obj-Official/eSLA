# accounts/forms.py
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Officials

class OfficialsCreationForm(UserCreationForm):
    class Meta:
        model = Officials
        fields = ("first_name", "last_name", "email", "username", "officer_id", "isProcessingOfficer")

class OfficialsChangeForm(UserChangeForm):
    class Meta:
        model = Officials
        fields = ("first_name", "last_name", "email", "username", "officer_id", "isProcessingOfficer")