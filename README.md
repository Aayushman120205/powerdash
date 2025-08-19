# ⚡ PowerDash – Dynamic Dashboard
Monitor. Analyze. Optimize.

PowerDash is a smart, real-time monitoring dashboard built using Django (Backend), HTML/CSS/JavaScript (Frontend), and external Weather APIs. It provides insights into Temperature, Humidity, Voltage, and Current, with flexible data visualization and reporting.

🚀 Features
🌐 Landing Page

SVG-based logo with the name PowerDash.

Navigation Bar – Home | About | Contact Us.

Contact Us (SMTP):

Integrated email system using Django SMTP.

Send messages to a selected list of recipients.

Attach PDF/Excel reports with a default body message.

📊 Dashboard

Header Cards:

Real-time Temperature, Humidity, Voltage, and Current values.

Cards are interchangeable, so users can choose which metric to display.

Graphs & Reports:

Temperature & Humidity Graph

X-axis: Date

Y-axis: Temperature (°C) & Humidity (g/m³)

Voltage & Current Graph

X-axis: Date & Time

Y-axis: Voltage (V) & Current (A)

Pie Charts (Reports):

Daily, Weekly, Monthly, and Yearly reports.

Breakdown of Temperature, Humidity, Voltage, and Current.

🔧 Admin Panel (Django)

Manage Cards, Currents, Humidities, Temperatures, and Voltages.

Import/Export sensor data.

Django’s default authentication for user and group management.

🛠️ Tech Stack

Backend: Django (Python)

Frontend: HTML5, CSS3, JavaScript

Database: SQLite (default, configurable to PostgreSQL/MySQL)

APIs: External Weather API integration for live humidity & temperature

SMTP: Email system for sending automated messages with attachments

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/powerdash.git
cd powerdash

2️⃣ Create Virtual Environment & Install Dependencies
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt

3️⃣ Database Migration
python manage.py migrate
python manage.py createsuperuser

4️⃣ Run Development Server
python manage.py runserver


Visit 👉 http://127.0.0.1:8000/

📬 SMTP Setup

In settings.py, configure your SMTP:

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "your_email@gmail.com"
EMAIL_HOST_PASSWORD = "your_app_password"


Navigate to Contact Us Page.

Select recipients, attach PDF/Excel, and send with default body.

📂 Project Structure
DYNAMICDASHBOARD/
│── myApp/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│
│── static/
│   ├── scripter.js
│   ├── scriptings.js
│   ├── scripts.js
│   ├── styler.css
│   ├── styles.css
│   ├── stylings.css
│
│── templates/
│   ├── ChangeEquipment.html
│   ├── dynamicDb.html
│   ├── emailing.html
│   ├── Inkscapeing.html
│
│── db.sqlite3
│── manage.py

📊 Demo (Screenshots)

Landing Page with PowerDash SVG Logo

SMTP Contact Us Page (send mail + attachments)

Dashboard with Real-time Cards

Temperature/Humidity & Voltage/Current Graphs

Pie Charts for Reports

Django Admin Panel

📌 Future Enhancements

Role-based dashboards (Admin/User/Viewer).

AI-based anomaly detection on sensor data.

Export reports directly from dashboard.

✅ With PowerDash, you can monitor, analyze, and optimize your energy zone in real-time.
