from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import OfficialsCreationForm, OfficialsChangeForm
from .models import Officials

# Register your models here.
class OfficialsAdmin(UserAdmin):
    add_form = OfficialsCreationForm
    form = OfficialsChangeForm
    model = Officials
    list_display = ["first_name", "last_name", "email", "username", "officer_id", "isProcessingOfficer"]

admin.site.register(Officials, OfficialsAdmin)