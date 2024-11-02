from django.contrib import admin
'''
from .models import Todo
'''


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'deletable')

'''
class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'is_completed', 'should_be_completed_by_date', 'created', 'last_updated', 'category')
'''

# Register your models here.
admin.site.register(Category, CategoryAdmin)
'''
admin.site.register(Todo, TodoAdmin)
'''
