from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=20, primary_key=True, unique=True, blank=False)
    deletable = models.BooleanField(default=True)

    class Meta:
        verbose_name = "To Do Category"
        verbose_name_plural = "To Do Categories"

    def __str__(self):
        return str(self.title)


    def delete(self, *args, **kwargs):
        # Prevent deletion if the object is marked as non-deletable
        if not self.deletable:
            raise ValueError("This object cannot be deleted.")
        #
        super().delete(*args, **kwargs)


    def save(self, *args, **kwargs):
        # Ensure the title is stored in uppercase
        if self.title:
            self.title = self.title.upper()
        #
        super().save(*args, **kwargs)

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    is_completed = models.BooleanField(default=False)
    should_be_completed_by_date = models.DateField(null=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    last_updated = models.DateTimeField(auto_now=True, editable=False)
    category = models.ForeignKey(Category, to_field="title", on_delete=models.PROTECT, default="N/A")

    class Meta:
        verbose_name = "To Do"
        verbose_name_plural = "To Do"

    def __str__(self):
        return str(self.title)
