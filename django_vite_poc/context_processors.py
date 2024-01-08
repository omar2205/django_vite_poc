from django.conf import settings

def debug_mode(context):
    return { 'DEBUG': settings.DEBUG }