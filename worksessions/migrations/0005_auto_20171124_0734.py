# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-24 07:34
from __future__ import unicode_literals

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worksessions', '0004_worksession_todos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='worksession',
            name='todos',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), size=None), size=None),
        ),
    ]