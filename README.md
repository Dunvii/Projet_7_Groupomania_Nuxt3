
![Logo](https://i.ibb.co/2qhQN04/groupomania.png)

Réseau social interne d'entreprise réalisé via Nuxt 3 (Front-end), Express / Sequelize (Back-end).


## Installation

Pour l'installation du réseau social une base de données MySQL ou MariaDB est requise.
Pour ce qu'il en est du déploiement des tables Sequelize s'occupe de l'initialisation de celles ci.
Auquels cas un fichier SQL est présent dans le repos.

⚠ Le dossier et les dossiers parents ne doivent pas contenir d'espace dans leur nom. Un soucis avec le framework est actuellement connus et pas encore résolu à ce jour ⚠

Commandes à effectuer depuis le dossier root :
```bash
  git clone https://github.com/Dunvii/Projet_7_Groupomania_Nuxt3.git
  cd Projet_7_Groupomania_Nuxt3
  cd back
  mkdir images
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
DB_HOST_TEST="HOST"
DB_DTB_TEST="DATABASE"
DB_USER_TEST="USER"
DB_PASSWORD_TEST="PASSWORD"

# SQL PROD
DB_HOST_PROD="HOST"
DB_DTB_PROD="DATABASE"
DB_USER_PROD="USER"
DB_PASSWORD_PROD="PASSWORD"

# TOKEN

SECRET_TOKEN="UNTOKEN"

# PROFILE 

DEFAULT_AVATAR="DEFAULT URL AVATAR"

# ADMIN ACCOUNT

USERNAME="admin"
PASSWORD="password"

# BACKEND PORT
BACKENDPORT="3000"
```

Un autre fichier .env est necessaire à la racine du dossier front :

```js

APIURL="http://LIEN.COM:PORT/api"

```
### MISE EN SERVICE

Commandes à effectuer depuis le dossier back et front :

```bash
  DEV MODE : npm run dev
  BUILD MODE : npm run build
```

Par default le port 3000 est définis pour le fonctionnement du serveur back.
Pour modifier le port de deploiement du front modifiez son package.json et ajouter -p PORT dans les scripts de lancement 

## PORT

Par default le port 3000 est définis pour le fonctionnement du serveur back, vous pouvez le modifier dans le .env du back.
Pour modifier le port de deploiement du front modifiez son package.json et ajouter -p PORT dans les scripts de lancement 

```javascript
"scripts": {
    "build": "nuxt build -p 80",
    "dev": "nuxt dev -p 80",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
```


## FAQ

#### Fonctionnement

Le réseau social interne d'entreprise permer de se creer un compte via une adresse email et un mot de passe.
La possibilité de créer des postes avec un système de reactions et de commentaires.
Les posts et commentaires sont modifiables et supprimables. Un administrateur à lui aussi les mêmes possibilités.
Via l'espace profil il est possible de modifier son nom, prenom, avatar et mot de passe.
Dans l'espace settings une option de suppression de compte est disponible.

#### Compte administrateur

Vous pouvez creer un compte administrateur en rajoutant un email et un mot de passe dans le fichier .env :

```bash
# ADMIN ACCOUNT (EMAIL ET PASSWORD)

EMAILADMIN=""
PASSWORD=""
```

#### Système de réaction

Un système de réactions modulable a été mis en place, il est possible de rajouter n'importe quel type de reaction dans le front en respectant le système suivant:

le "type" est le nom définis dans la base de donnés.
le "status" s'occupe de la situation de l'utilsateur d'avoir réagis ou non à un post : 
1 : Ajout d'une réaction
0 : Retrait d'une réaction.
## Tech Stack

**Client:** Nuxt 3, TailwindCSS

**Server:** Node, Express, @Sequelize/core

