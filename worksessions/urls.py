from django.conf.urls import url

from . import views


app_name = 'worksessions'
urlpatterns = [
	url(r'^$', views.home, name='home'),
	url(r'save/$', views.session, name='save_session')
]