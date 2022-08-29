from django.db import migrations
from api.user.models import CustomUser


class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name="Omar",
                          email="omar.atef.2001@gmail.com",
                          is_staff=True,
                          is_superuser=True,
                          phone="1235456",
                          gender='Male'
                          )

        user.set_password("1010abab")
        user.save()


    dependencies = [

    ]
    operations = [
        migrations.RunPython(seed_data),
    ]
