# Generated by Django 4.2.3 on 2023-11-11 14:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contract', '0002_alter_documentdetails_signature1_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documentdetails',
            name='submitted_at',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
    ]
