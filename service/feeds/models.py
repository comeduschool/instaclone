from django.db import models

# Create your models here.

class Image(models.Model):
    feed = models.ForeignKey('feeds.Feed', 
                             null=False, 
                             related_name='feed_images', 
                             on_delete=models.PROTECT)

    image = models.ImageField(upload_to='feeds/%Y/%m/%d', 
                              null=False,
                              blank=False)

class FeedManager(models.Manager):
    pass

class Feed(models.Model):
    user = models.ForeignKey('users.User',
                             null=False,
                             related_name='+',
                             on_delete=models.PROTECT)

    content = models.CharField(max_length=511, blank=False)
    like = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = models.Manager()
    feeds = FeedManager()

    class Meta:
        ordering = ['created']

    def __str__(self):
        """admin page에서 사용"""
        return f"{self.pk}"
    
    def __repr__(self):
        return f"<Feed {self.pk}>"

    