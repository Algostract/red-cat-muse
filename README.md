<p align="center">
  <img src="./public/logo.png" lt="Logo" width="65" />
<p>

# Gold Fish Bowl

<p align="center">
  <a href="https://shirsendu-bairagi.betteruptime.com">
    <img src="https://uptime.betterstack.com/status-badges/v3/monitor/10aqw.svg" alt="uptime status">
  </a>
</p>

![Landing](public/previews/landing.webp)

> Locality‑focused, talent marketplace app

- 📦 SSR
- 🖼️ OG Tags
- 🚀 PWA
- ✋ Push Notification
- 🤖 Automation (Email, Whatsapp)
- 🐋 Containerized
- 🪄 CI/CD (Github Action)
- 🎭 Authentication (OAuth 2.0)
- ⚡️ API Route Caching
- 📐 Analytics

## Change Placeholder Value

### In tailwind.config.ts change the following

- fontFamily
  - head
  - body
- colors
  - light
  - dark
  - primary
  - success
  - warning
  - alert

## Change the Icons and Screenshots

dir public/pwa

## How to Deploy

1. Initialize Swarm on the Manager Node

```bash
docker swarm init --advertise-addr <MANAGER-IP>
```

2. Join Worker Nodes to the Swarm

```bash
docker swarm join --token <WORKER-TOKEN> <MANAGER-IP>:2377
```

3. Check Node Status

```bash
docker node ls
```

4. Create a docker volume

```bash
docker volume create \
  --name gold-fish-bowl_static \
  --driver local \
  --opt type=none \
  --opt device=~/Algostract/gold-fish-bowl/static \
  --opt o=bind

docker volume create \
  --name gold-fish-bowl_data \
  --driver local \
  --opt type=none \
  --opt device=~/Algostract/gold-fish-bowl/.data \
  --opt o=bind
```

5. Use Docker Stack to deploy multi-container application

```bash
docker stack deploy --compose-file docker-compose.prod.yml gold-fish-bowl
```

6. Scale service

```bash
docker service scale gold-fish-bowl_app=2
```

7. Verify

```bash
docker service ls
docker service ps gold-fish-bowl_app
```
