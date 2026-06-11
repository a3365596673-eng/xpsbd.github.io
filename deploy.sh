#!/bin/bash
# XPSBD.COM Deployment Script
# Usage: bash deploy.sh [ssh_password_or_key_path]

set -e

SERVER="root@45.78.73.197"
DOMAIN="xpsbd.com"
LOCAL_DIR="$(cd "$(dirname "$0")" && pwd)"
REMOTE_DIR="/var/www/xpsbd"

echo "=== XPSBD Deployment ==="
echo "Source: $LOCAL_DIR"
echo "Target: $SERVER:$REMOTE_DIR"

# Upload files
echo ""
echo "Uploading website files..."
scp index.html "$SERVER:$REMOTE_DIR/index.html"
scp XPSBD-Product-Sheet.pdf "$SERVER:$REMOTE_DIR/XPSBD-Product-Sheet.pdf"

echo ""
echo "=== Done! ==="
echo "Website: https://$DOMAIN"
echo "PDF: https://$DOMAIN/XPSBD-Product-Sheet.pdf"
echo ""
echo "If nginx is not yet configured, run these on the server:"
echo "  apt update && apt install -y nginx"
echo "  cat > /etc/nginx/sites-available/xpsbd << 'NGINX'"
echo "  server {"
echo "    listen 80;"
echo "    server_name xpsbd.com www.xpsbd.com;"
echo "    root /var/www/xpsbd;"
echo "    index index.html;"
echo "  }"
echo "  NGINX"
echo "  ln -s /etc/nginx/sites-available/xpsbd /etc/nginx/sites-enabled/"
echo "  nginx -t && systemctl restart nginx"
echo "  certbot --nginx -d xpsbd.com -d www.xpsbd.com  # for HTTPS"
