from django.db import models

class Temperature(models.Model):
    date = models.DateTimeField()
    temp = models.FloatField()

    def __str__(self):
        return f"{self.temp} °C"
    
class Humidity(models.Model):
    date = models.DateTimeField()
    humidity = models.FloatField()

    def __str__(self):
        return f"{self.humidity} %"
    
class Current(models.Model):
    date = models.DateTimeField()
    current = models.FloatField()

    def __str__(self):
        return f"{self.current} A"
    
class Voltage(models.Model):
    date = models.DateTimeField()
    voltage = models.FloatField()

    def __str__(self):
        return f"{self.voltage} V"

class Card(models.Model):
    CARD_CHOICES = [
        ('Card1', 'Card 1'),
        ('Card2', 'Card 2'),
        ('Card3', 'Card 3'),
        ('Card4', 'Card 4'),
    ]

    card_id = models.CharField(max_length=10, choices=CARD_CHOICES, unique=True)
    name = models.CharField(max_length=50)
    prop_type = models.CharField(max_length=10)
    value = models.FloatField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.card_id}) — {self.value}{self.prop_type}"
