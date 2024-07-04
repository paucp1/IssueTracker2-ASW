from django.db import models
from django.contrib.auth.models import User
from issues import choices

# Create your models here.

class Issue(models.Model):
    Subject = models.CharField(max_length=250, null=True, blank=True)
    Description = models.TextField(max_length=500, null=True, blank=True)
    Created_at = models.DateTimeField(auto_now_add=True)
    Status = models.CharField(max_length=50, choices=choices.status, null=True, blank=True, default='New')
    Type = models.CharField(max_length=50, choices=choices.type, null=True, blank=True, default='Bug')
    Severity = models.CharField(max_length=50, choices=choices.severity, null=True, blank=True, default='Normal')
    Priority = models.CharField(max_length=50, choices=choices.priority, null=True, blank=True, default='Normal')
    Due_Date = models.DateTimeField(null=True, blank=True)
    Creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    Block_reason = models.TextField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.Subject


class Comment(models.Model):
    Comment = models.TextField(max_length=1000)
    Created_at = models.DateTimeField(auto_now_add=True)
    Issue = models.ForeignKey(Issue, to_field='id', related_name='comments', null=False, on_delete=models.CASCADE)
    Creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', null=True)


class Activity(models.Model):
    Creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='creator_activities')
    Created_at = models.DateTimeField(auto_now_add=True)
    Issue = models.ForeignKey(Issue, to_field='id', null=False, on_delete=models.CASCADE, related_name='activities')
    Type = models.CharField(max_length=50, choices=choices.activities, null=True, blank=True)
    Old_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='old_assigned_user_activities')
    User = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='activities')


class AsignedUser(models.Model):
    User = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_users')
    Issue = models.ForeignKey(Issue, to_field='id', null=False, on_delete=models.CASCADE, related_name='assigned_users')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['User', 'Issue'], name='unique_migration_asignedUser_combination'
            )
        ]


class Watcher(models.Model):
    User = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='watchers')
    Issue = models.ForeignKey(Issue, to_field='id', null=False, on_delete=models.CASCADE, related_name='watchers') 
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['User', 'Issue'], name='unique_migration_watcher_combination'
            )
        ]

class AttachedFile(models.Model):
    Name = models.TextField(max_length=500, null=True, blank=True)
    File = models.FileField(null=True, blank=True)
    Created_at = models.DateTimeField(auto_now_add=True)
    Issue = models.ForeignKey(Issue, to_field='id', related_name='files', null=False, on_delete=models.CASCADE)
