# react-game

## Installation

### Mise en route du server de websockets

Installer et configurer le serveur de websockets sur un environnement ruby préconfiguré : 

```
  gem install em-websocket
```

Configurer le fichier src/server/server.rb avec l'ip:port souhaités puis se rendre dans le dossier pour lancer le serveur : 

```
  ruby server.rb
```

### Mise en route de la partie javascript

Installer nodejs (v5.10.0).

Se rendre dans le dossier racine de l'application afin de récupérer l'ensemble des dépendances nécessaires :

```
  npm install 
```

Configurer la valeur de la constante de WEBSOCKET_SERVER_URL du fichier src/constants/GameConstants avec les valeurs du serveur de websockets configuré préalablement.

Configurer gulpfile.js avec l'ip et le port souhaités puis lancer le serveur :

```
  gulp
```