# Soft Ride — XAMPP + MySQL Setup (बहुत आसान तरीके से)

## 1. XAMPP चालू करें
XAMPP Control Panel खोलें और **Apache** तथा **MySQL** के सामने `Start` दबाएँ। दोनों green होने चाहिए।

## 2. Project कहाँ रखना है
इस पूरे `soft-ride-complete-mysql` folder को copy करके यहाँ रखें:

`C:\xampp\htdocs\soft-ride`

अंत में यह file मौजूद होनी चाहिए:

`C:\xampp\htdocs\soft-ride\index.html`

## 3. Database बनाना
Browser में खोलें:

`http://localhost/phpmyadmin`

आपके पास पहले से database `softride` बना हुआ है। उसे select करें।

ऊपर **Import** पर click करें → इस project की `database.sql` file select करें → नीचे **Import/Go** दबाएँ।

Import के बाद left side में ये tables दिखने चाहिए:

- `admins`
- `bookings`
- `enquiries`

## 4. Database connection
इस project में `api/config.php` पहले से तैयार है:

- Host: `localhost`
- Database: `softride`
- User: `root`
- Password: खाली

अगर आपके XAMPP MySQL root user पर password लगा है, तो `api/config.php` में `pass` बदलें।

## 5. Website खोलें

`http://localhost/soft-ride/`

## 6. Admin account बनाना
पहली बार खोलें:

`http://localhost/soft-ride/admin/setup.php`

अपना email और कम से कम 8 character का password डालें → **Create Admin**.

फिर login करें:

`http://localhost/soft-ride/admin/login.php`

## 7. Booking test
Website पर **Book a Ride** दबाएँ।

Name, Phone, Pickup, Drop, Date और Ride Type भरकर **Confirm Booking** दबाएँ।

फिर Admin Dashboard → Bookings में entry दिखेगी।

## 8. Contact test
Contact section में Name, Phone और Message भरें → **Send Enquiry**.

Admin Dashboard → Contact Enquiries में entry दिखेगी।

## 9. अगर Database Error आए
सबसे पहले check करें:

1. XAMPP में MySQL green है?
2. phpMyAdmin में `softride` database मौजूद है?
3. `softride` के अंदर `admins`, `bookings`, `enquiries` tables हैं?
4. `api/config.php` में database name `softride` है?
5. अगर MySQL root password है तो `pass` में वही password है?

## जरूरी बात
Production hosting पर जाने से पहले database credentials बदलें और `api/config.php` को public Git repository में upload न करें।
