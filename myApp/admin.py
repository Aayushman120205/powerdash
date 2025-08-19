from django.contrib import admin
from .models import Temperature,Voltage,Current,Humidity,Card
from import_export.admin import ImportExportModelAdmin
from import_export import resources

# Resources
class TemperatureResource(resources.ModelResource):
    class Meta:
        model = Temperature

class HumidityResource(resources.ModelResource):
    class Meta:
        model = Humidity

class VoltageResource(resources.ModelResource):
    class Meta:
        model = Voltage

class CurrentResource(resources.ModelResource):
    class Meta:
        model = Current

class CardResource(resources.ModelResource):
    class Meta:
        model = Card

# Admins
@admin.register(Temperature)
class TemperatureAdmin(ImportExportModelAdmin):
    resource_class = TemperatureResource
    list_display = ('date','temp')

@admin.register(Humidity)
class HumidityAdmin(ImportExportModelAdmin):
    resource_class = HumidityResource
    list_display = ('date','humidity')

@admin.register(Voltage)
class VoltageAdmin(ImportExportModelAdmin):
    resource_class = VoltageResource
    list_display = ('date','voltage')

@admin.register(Current)
class CurrentAdmin(ImportExportModelAdmin):
    resource_class = CurrentResource
    list_display = ('date','current')

@admin.register(Card)
class CardAdmin(ImportExportModelAdmin):
    resource_class = CardResource
    list_display = ('card_id','name','prop_type','value')
