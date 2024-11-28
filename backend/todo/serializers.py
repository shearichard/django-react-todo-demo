#  todo/serializers.py
from rest_framework import serializers
from .models import Todo


from rest_framework import serializers
from datetime import date

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'is_completed', 'should_be_completed_by_date')


    def to_internal_value(self, data):
        if 'should_be_completed_by_date' in data and data['should_be_completed_by_date'] == "":
            data['should_be_completed_by_date'] = None
        #
        return super().to_internal_value(data)


    def validate_should_be_completed_by_date(self, value):
        '''
        Check if the value is not null
        '''
        if value is not None:
            # Ensure the value is today or a later date
            if value < date.today():
                raise serializers.ValidationError(
                    "The should_be_completed_by_date must be today or a later date."
                )
        return value


    def validate(self, data):
        '''
        Check if this is an update and should_be_completed_by_date is going from null to non-null
        '''
        if self.instance:  # This is an update
            old_value = self.instance.should_be_completed_by_date
            new_value = data.get('should_be_completed_by_date', old_value)

            if old_value is None and new_value is not None:
                # Apply the same validation rules as for creation
                if new_value < date.today():
                    raise serializers.ValidationError({
                        'should_be_completed_by_date': (
                            "The should_be_completed_by_date must be today or a later date when updating from null."
                        )
                    })
        return data

    @property
    def errors(self):
        '''
         Use a verbose name in errors if one is defined

         This method is based on https://stackoverflow.com/a/55348104/364088
        '''
        # get errors
        errors = super().errors
        verbose_errors = {}

        # fields = { field.name: field.verbose_name } for each field in model
        fields = {field.name: field.verbose_name for field in
                   self.Meta.model._meta.get_fields() if hasattr(field, 'verbose_name')}

        # iterate over errors and replace error key with verbose name if exists
        for field_name, error in errors.items():
            if field_name in fields:
                verbose_errors[str(fields[field_name])] = error
            else:
                verbose_errors[field_name] = error
        #
        return verbose_errors
