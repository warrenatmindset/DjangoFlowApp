from django.shortcuts import render, get_object_or_404  # noqa
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from .models import User


def login(request):
	if request.method == 'GET':
		return get_login_or_redirect_profile(request)
	elif request.method == 'POST':
		return post_login_attempt_and_redirect(request)

def logout(request):
	if request.method == 'GET':
		return render(request, 'users/logout.html')
	elif request.method == 'POST':
		return post_logout_and_redirect(request)

def register(request):
	if request.method == 'GET':
		return render(request, 'users/register.html')
	elif request.method == 'POST':
		return post_registration_attempt_and_redirect(request)

@login_required
def profile(request, user_id):
	user_id = int(user_id)
	if request.user.id != user_id:
		return HttpResponseRedirect('/profile/{}'.format(request.user.id))
	else:	
		return render(request, 'users/profile.html', {'user': request.user})

def get_login_or_redirect_profile(request):
	if request.user.is_authenticated:
		return HttpResponseRedirect('/profile/{}'.format(request.user.id))
	else:
		return render(request, 'users/login.html')

def post_login_attempt_and_redirect(request):
	email = request.POST['email']
	password = request.POST['password']
	user = authenticate(request, username=email, password=password)
	if user is not None: 
		auth_login(request, user)
		return HttpResponseRedirect('/profile/{}'.format(user.id))
	else:
		messages.error(request, 'Incorrect email/password combination. Try again.')
		return HttpResponseRedirect(reverse('users:login'))

def post_logout_and_redirect(request):
	auth_logout(request)
	messages.success(request, 'Successfully logged out!')
	return HttpResponseRedirect(reverse('users:login'))

def post_registration_attempt_and_redirect(request):
	email = request.POST['email']
	password = request.POST['password']
	confirm_password = request.POST['confirm-password']
	error = False

	if not email.strip() or not password.strip() or not confirm_password.strip():
		messages.error(request, 'All fields must be filled. Please try again.')
		error = True

	try: 
		validate_email(email)
	except ValidationError:
		messages.error(request, 'Email invalid. Please use a valid email.')
		error = True

	user_exists = User.objects.filter(email=email).count()
	if user_exists:
		messages.error(request, 'Email already registered. Please use another email.')
		error = True

	if password != confirm_password:
		messages.error(request, 'Passwords do not match. Please try again.')
		error = True

	if not error: 
		User.objects.create_user(email=email, password=password)
		user = authenticate(request, username=email, password=password)
		auth_login(request, user)
		messages.success(request, '{} successfully registered!'.format(email))

	if error: 
		return HttpResponseRedirect(reverse('users:register'))
	else:
		return HttpResponseRedirect('/profile/{}'.format(user.id))
