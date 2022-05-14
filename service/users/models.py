# Python modeuls
import hashlib
import string
import time

# Django modules
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    TIMEOUT = 60 * 5
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(max_length=256, unique=True)
    username = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=128)
    authcode = models.CharField(max_length=17, blank=True, default="")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = UserManager()

    class Meta:
        ordering = ['created']

    def __str__(self):
        """admin page에서 사용"""
        return f"({self.pk}) {self.email}"

    def __repr__(self):
        return f"<User pk={self.pk} {self.email} {self.username} {self.created}>"

    def _create_authcode(self):
        timestamp = int(time.time())
        authcode = hashlib.sha224(f"{repr(self)}:{timestamp}".encode()).hexdigest()[:6]
        while True:
            try: 
                User.objects.get(authcode__startswith=f"{authcode}:")
            except User.DoesNotExist:
                self.authcode = f"{authcode}:{timestamp}"
                break
        self.save()
        return authcode

    def create_authcode(self):
        
        if self.authcode != "":
            # chekctime
            splited = self.authcode.split(":")
            if time.time() - int(splited[1]) < self.TIMEOUT:
                raise ValidationError("5분 이후에 인증코드를 생성할 수 있습니다.")
        authcode = self._create_authcode()
        
        return authcode

    def check_authcode(self, authcode):
        if self.authcode == "":
            raise ValueError("인증코드가 없습니다. 먼저 인증코드를 생성하세요.")
        
        splited = self.authcode.split(":")

        if time.time() - int(splited[1]) > self.TIMEOUT: 
            raise ValidationError("인증코드가 만료됐습니다. 인증코드를 새로 생성하세요.")
        else: 
            if splited[0] == authcode:
                return True
            else:
                return False
            
    def change_lostpassword(self, password):
        self.authcode = ""
        self.set_password(password)
        self.save() 