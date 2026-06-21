#!/bin/bash

# Render assigns a dynamic port via the PORT environment variable.
# We need to tell Apache to listen on this port.
if [ -n "$PORT" ]; then
    sed -i "s/80/$PORT/g" /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf
fi

# Cache Laravel configuration for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Optional: run database migrations automatically on start
# php artisan migrate --force

# Start Apache in the foreground
exec apache2-foreground
