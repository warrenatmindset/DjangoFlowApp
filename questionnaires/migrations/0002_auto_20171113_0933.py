# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-13 09:33
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questionnaires', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='AttentionRelatedCognitiveErrors',
            new_name='AttentionRelatedCognitiveError',
        ),
    ]
