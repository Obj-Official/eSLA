# Generated by Django 4.2.3 on 2023-11-11 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contract', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documentdetails',
            name='signature1',
            field=models.FileField(blank=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='documentdetails',
            name='signature2',
            field=models.FileField(blank=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='documentdetails',
            name='signature3',
            field=models.FileField(blank=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='documentdetails',
            name='signed_document',
            field=models.FileField(blank=True, upload_to=''),
        ),
    ]