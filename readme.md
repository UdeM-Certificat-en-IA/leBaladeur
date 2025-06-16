# Le Baladeur

## À propos

Le Baladeur est un lecteur audio et vidéo basé sur HTML5, optimisé pour le podcasting, avec un fallback Flash. Il peut être utilisé comme plugin WordPress ou dans un contexte HTML/JavaScript statique.

Ce projet est un projet étudiant de l'Université de Montréal (UdeM).

## Utilisation

La version de production contient l'application, ses dépendances ainsi que les styles et polices nécessaires dans le dossier `dist`. Un exemple de démonstration est fourni pour montrer comment intégrer le lecteur dans n'importe quelle page web, soit directement comme dans `embed.html`, soit en tant qu'iframe intégré comme dans `index.html`.

## Installation

Cloner le dépôt et installer les dépendances :

    bower install
    npm install
    npm install -g gulp

## Configuration du pré-processeur CSS

### Mise à jour de l'environnement Ruby

    gem update --system

### Installation de SASS

[Site officiel de SASS](http://sass-lang.com/install)

    gem install sass

ou

    sudo gem install sass

Vérifier la version (doit être 3.3.x) :

    sass -v

### Installation de Compass

[Site officiel de Compass](http://compass-style.org/install/)

    gem install compass

### Installation de SASS CSS Importer

    gem install --pre sass-css-importer

### Installation d'autoprefixer

[https://github.com/ai/autoprefixer](https://github.com/ai/autoprefixer)

    sudo npm install --global autoprefixer

### Compilation du fichier CSS

Une tâche Gulp est disponible pour générer une version avec commentaires de ligne ainsi qu'une version minifiée :

    gulp styles

## Construction du package de distribution

La commande `make` est remplacée par [gulp](https://github.com/gulpjs/gulp/blob/master/docs/README.md).

Exécutez la tâche par défaut pour construire le package dans le dossier `dist` :

    gulp

### Pour la production

    npm install -g uglifyify minifyify

Pour générer le code le plus petit possible :

    browserify -g uglifyify js/app.js > static/podlove-web-player.js

Avec sourcemaps :

    browserify -d js/app.js | minifyify > static/podlove-web-player.js

## Développement

Compiler, servir et surveiller le dépôt local avec live reload :

    gulp serve

## Tests

Aucun test automatisé pour le moment. Avec `gulp serve`, vous pouvez servir le contenu local pour des tests manuels. Accédez ensuite aux exemples via `http://localhost:8080/example/index.html`.

## Contribution

Forkez le projet et créez une branche pour votre fonctionnalité :

    git checkout -b ma-nouvelle-fonctionnalite

Commitez vos modifications :

    git commit -am 'Ajout d'une nouvelle fonctionnalité'

Pushez la branche :

    git push origin ma-nouvelle-fonctionnalite

Créez une Pull Request

Version : v-0.0.1
## Docker Compose

Pour construire et lancer le lecteur avec Docker Compose :

```bash
docker compose up --build
```

Puis accédez à `http://localhost:8080/examples/index.html`.
