# Soft Ride — MySQL Complete Website

This package converts the original front-end demo into a working PHP + MySQL website.

## Included
- Responsive public website
- Real booking form → MySQL `bookings`
- Contact/enquiry form → MySQL `enquiries`
- Admin login
- Admin dashboard
- Booking status management
- Delete booking/enquiry
- Prepared SQL statements and basic server-side validation
- `database.sql` schema
- `api/config.example.php`

## Recommended local setup (XAMPP)
1. Install XAMPP and start **Apache** + **MySQL**.
2. Copy this entire folder into `C:\xampp\htdocs\soft-ride`.
3. Open `http://localhost/phpmyadmin`.
4. Import `database.sql`.
5. Copy `api/config.example.php` to `api/config.php`.
6. For default XAMPP MySQL:
   - host: localhost
   - db: softride
   - user: root
   - pass: empty
7. Open `http://localhost/soft-ride/`.
8. Open `http://localhost/soft-ride/admin/setup.php`.
9. Create your own admin email/password (minimum 8 characters).
10. Login at `http://localhost/soft-ride/admin/login.php`.

## Important
- Do not upload `api/config.php` with database credentials to a public Git repository.
- Change the phone, email, social links and images in `index.html`.
- For production hosting, create a MySQL database/user in your hosting panel and put those credentials in `api/config.php`.
- The app requires PHP with PDO MySQL enabled.
- Payment gateway, live driver tracking, SMS/WhatsApp notifications and real-time dispatch are not included because they require separate third-party credentials/services.

## Main database tables
- `admins`
- `bookings`
- `enquiries`
