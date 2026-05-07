# Hostinger VPS Deployment Guide

## Step 1: Server Setup
```bash
# SSH into your Hostinger VPS
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker

# Install Docker Compose
apt install docker-compose -y
```

## Step 2: Upload Project
```bash
# On your local machine, compress the project
zip -r powermax-website.zip power-backup-website/

# Upload to server (use SCP or SFTP)
scp powermax-website.zip root@your-server-ip:/root/

# On server, extract
unzip powermax-website.zip
cd power-backup-website
```

## Step 3: Configure Environment
```bash
cd backend
cp .env.example .env
nano .env

# Edit the following:
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongo:27017/powermax_solutions
JWT_SECRET=your-256-bit-secret-key-here
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-password
FRONTEND_URL=https://yourdomain.com
```

## Step 4: Build & Run
```bash
cd /root/power-backup-website
docker-compose up --build -d

# Verify containers are running
docker-compose ps

# View logs
docker-compose logs -f
```

## Step 5: Configure Nginx Reverse Proxy
```bash
apt install nginx -y

# Create config
nano /etc/nginx/sites-available/powermax
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /uploads/ {
        proxy_pass http://localhost:5000/uploads/;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/powermax /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## Step 6: SSL Certificate (Let's Encrypt)
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
```

## Step 7: Seed Database
```bash
cd /root/power-backup-website/backend
docker-compose exec backend node scripts/seed.js
```

## Step 8: Firewall (Optional but Recommended)
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## Maintenance Commands
```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart services
docker-compose restart

# Update after code changes
docker-compose up --build -d

# Backup MongoDB
docker-compose exec mongo mongodump --out /data/backup

# Restore MongoDB
docker-compose exec mongo mongorestore /data/backup
```

## Troubleshooting

### Port Already in Use
```bash
# Find what's using port 5000
lsof -i :5000
# Kill process or change port in docker-compose.yml
```

### Permission Denied on Uploads
```bash
chmod -R 755 backend/uploads
chown -R www-data:www-data backend/uploads
```

### MongoDB Connection Issues
```bash
# Check MongoDB container
docker-compose logs mongo

# Restart MongoDB
docker-compose restart mongo
```
