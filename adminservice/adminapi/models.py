from django.db import models


class Reservations(models.Model):
    room = models.ForeignKey('Rooms', models.DO_NOTHING)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_deleted = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reservations'


class Rooms(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.IntegerField()
    is_active = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rooms'


class Users(models.Model):
    username = models.CharField(unique=True, max_length=50)
    password_hash = models.CharField(max_length=256)
    role = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'