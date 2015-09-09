# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20150906_1756'),
    ]

    operations = [
        migrations.AddField(
            model_name='update',
            name='nick',
            field=models.CharField(default=b'Anonymous', max_length=100),
        ),
    ]
