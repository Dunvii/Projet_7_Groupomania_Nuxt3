
![Logo](http://5.39.84.218:3000/_nuxt/assets/images/groupomania.webp)


## Installation

Pour l'installation du réseau social une base de données MySQL ou MariaDB est requise.
Pour ce qu'il en est du déploiement des tables Sequelize s'occupe de l'initialisation de celles ci.
Auquels cas un fichier SQL est présent dans le repos.

⚠ Le dossier et les dossiers parents ne doivent pas contenir d'espace dans leur nom. Un soucis avec le framework est actuellement connus et pas encore résolu à ce jour ⚠

Commandes à effectuer depuis le dossier root :
```bash
  cd back
  npm install
  cd ../front
  npm install
```

Pour le deploiement de ce projet un fichier .env est necessaire à la racine du dossier back : 

```js
# SQL DEV
DB_HOST_DEV="HOST"
DB_DTB_DEV="DATABASE"
DB_USER_DEV="USER"
DB_PASSWORD_DEV="PASSWORD"

# SQL TEST
DB_HOST_DEV="HOST"
DB_DTB_DEV="DATABASE"
DB_USER_DEV="USER"
DB_PASSWORD_DEV="PASSWORD"

# SQL PROD
DB_HOST_DEV="HOST"
DB_DTB_DEV="DATABASE"
DB_USER_DEV="USER"
DB_PASSWORD_DEV="PASSWORD"

# TOKEN

SECRET_TOKEN="UNTOKEN"

# PROFILE 

DEFAULT_AVATAR="DEFAULT URL AVATAR"

# ADMIN ACCOUNT

USERNAME=""
PASSWORD=""

# BACKEND PORT
BACKENDPORT="3000"
```

Un autre fichier .env est necessaire à la racine du dossier front :

```js

APIURL=""

```
### MISE EN SERVICE

Commandes à effectuer depuis le dossier back et front :

```bash
  DEV : npm run dev
  BUILD : npm run build
```

Par default le port 3000 est définis pour le fonctionnement du serveur