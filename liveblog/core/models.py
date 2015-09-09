from django.db import models

# Create your models here.
class Update(models.Model):
	nick = models.CharField(max_length=100, default="Anonymous")
	message = models.TextField(blank=True)
	timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)

	class Meta:
		ordering = ['-timestamp']

	def __unicode__(self):
		return "[%s] %s" % (
			self.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
			self.message
			)