from django.conf.urls import url

from . import views


app_name = 'users'
urlpatterns = [
	url(r'^$', views.login, name='login'),
	url(r'logout/$', views.logout, name='logout'),
	url(r'register/$', views.register, name='register'),
	url(r'profile/(?P<user_id>[0-9]+)$', views.profile, name='profile')
]