# Generated by Django 5.1.7 on 2025-05-27 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.URLField(null=True, verbose_name='image'),
        ),
    ]
