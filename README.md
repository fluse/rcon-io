# RCON IO

![RCON IO](./public/mood.png)

A simple, but useful web panel to control CS2 servers via RCON

Have a look at these CS2 Server Docker-Images
- [joedwards32/CS2](https://github.com/joedwards32/CS2)
- [Soren90/cs2-docker](https://github.com/Soren90/cs2-docker)

### Features
- Server Management
- Map Management with Workshop Support
- User & Permissions System
- Clustered Commands as Promts
- Upcoming - Automations

## How to Use

```bash
git clone git@github.com:fluse/rcon-io.git
cd rcon-io
```

### With Docker
```bash
docker compose build
docker compose up -d
```

### Without Docker

```bash
npm install
npm install -g nodemon
npm run build
nodemon --exec npm start
```

open [localhost](http://localhost:3000)

## Default login
- Name: gaben
- Password: money 

# License
MIT