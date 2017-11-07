from django.conf.urls import url

from . import views


app_name = 'questionnaires'
urlpatterns = [
	url(r'^$', views.home, name='home')
]