from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.files import File
from django.contrib.auth.hashers import make_password
from datetime import datetime

# Create your models here.
class Officials(AbstractUser):
    officer_id = models.CharField(max_length=100)
    officer_department = models.CharField(max_length=100)
    isProcessingOfficer = models.BooleanField(default = False)
    signature = models.FileField()

    def __str__(self):
        return self.username
    
    def save(self, *args,**kwargs):
        self.password = make_password(self.password)
        super(Officials, self).save(*args, **kwargs)
        

class DocumentDetails(models.Model):
    document_id = models.CharField(max_length=100)
    document_title = models.CharField(max_length=100)
    document_description = models.CharField(max_length=10000)
    document_body = models.CharField(max_length=1000000)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    signature1_added = models.BooleanField(default = False)
    signature2_added = models.BooleanField(default = False)
    signature3_added = models.BooleanField(default = False)
    signature1 = models.FileField(blank=True)
    signature2 = models.FileField(blank=True)
    signature3 = models.FileField(blank=True)
    signed_document = models.FileField(blank=True)
    submitted = models.BooleanField(default = False)
    submitted_at = models.DateTimeField(default= datetime.now, blank=True)

    
    def __str__(self):
        return self.submitted_at.date()
