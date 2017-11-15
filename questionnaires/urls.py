from django.conf.urls import url

from . import views


app_name = 'questionnaires'
urlpatterns = [
	url(r'^$', views.home, name='home'),
	url(r'mental_fatigue/$', views.mental_fatigue_scale, name='mental_fatigue'),
	url(r'cognitive_error/$', views.attention_related_cognitive_error_scale, name='cognitive_error'),
	url(r'daydream/$', views.daydream_frequency_scale, name='daydream'),
	url(r'mindful/$', views.mindful_attention_awareness_scale, name='mindful')
]