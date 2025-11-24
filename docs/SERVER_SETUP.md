# Server Setup & Security Guide

This guide details how to provision a Linux server (e.g., Linode running Ubuntu 22.04/24.04 LTS) to host the V-Portfolio application securely.

## 1. Initial Server Setup

### User Management
Avoid using `root` for daily operations or deployment.

```bash
# Create a new user
adduser deployer

# Add to sudo group
usermod -aG sudo deployer
```

### SSH Hardening
Edit `/etc/ssh/sshd_config`:

```ssh
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
ChallengeResponseAuthentication no
```

Restart SSH: `sudo systemctl restart ssh`

## 2. Firewall (UFW)

Enable the firewall and allow only necessary ports.

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

## 3. Web Server (Nginx)

### Install Nginx
```bash
sudo apt update
sudo apt install nginx
```

### Configuration for SPA (Single Page App)
Create a config file: `/etc/nginx/sites-available/v-portfolio`

```nginx
server {
    listen 80;
    server_name vienna.nexusgit.info;

    root /var/www/v-portfolio; # Matches LINODE_TARGET_DIR
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API Reverse Proxy
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
}
```

### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/v-portfolio /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

## 4. SSL/TLS (HTTPS)

Use Certbot to automatically obtain and renew Let's Encrypt certificates.

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d vienna.nexusgit.info
```

## 5. Deployment Directory Permissions

Ensure the directories exist and the deploy user has ownership.

```bash
# Frontend
sudo mkdir -p /var/www/v-portfolio
sudo chown -R deployer:deployer /var/www/v-portfolio
sudo chmod -R 755 /var/www/v-portfolio

# Backend
sudo mkdir -p /var/www/v-portfolio-server
sudo chown -R deployer:deployer /var/www/v-portfolio-server
sudo chmod -R 755 /var/www/v-portfolio-server
```

## 6. Backend Setup (Node.js & PM2)

### Install Node.js (v20)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
sudo pm2 startup systemd
```

### Environment Variables
Create a `.env` file for the backend:
```bash
nano /var/www/v-portfolio-server/.env
```
Add your secrets:
```
MONGODB_URI=mongodb://localhost:27017/v-portfolio
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

## 7. Additional Security (Fail2Ban)

Protect against brute-force attacks.

```bash
sudo apt install fail2ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban
```

Default configuration usually protects SSH automatically. Check status with `sudo fail2ban-client status sshd`.
