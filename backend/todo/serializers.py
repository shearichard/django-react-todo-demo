#  todo/serializers.py
from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'is_completed', 'should_be_completed_by_date')

    def to_internal_value(self, data):
        if 'should_be_completed_by_date' in data and data['should_be_completed_by_date'] == "":
            data['should_be_completed_by_date'] = None
        return super().to_internal_value(data)

