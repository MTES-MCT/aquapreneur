# Aquapreneur

## Prerequis

- Node.js version 22
- npm version 10
- Une base de donnée PostgreSQL

## Installation

- copier le ficher `.env.example` vers un fichier `.env`.
- renseignez les valeurs des variables d’environnement.
- exécutez la commande `npm install`
- lancez le serveur de développement en exécutant `npm run dev`

## Tests

- copier le ficher `.env.test.example` vers un fichier `.env.test`.
- renseignez les valeurs des variables d’environnement **spécifiques aux tests**  
  La base de donnée renseignée sera remise à zéro à chaque lancement.
- lancez les tests en exécutant `npm run test`

## Créer un jeton d’authentification à l’API

- exécutez `npm run create-api-token`, _sur le serveur de production_  
  Le jeton généré va être ajouté à la base de donnée.
- renseignez le nom et le siret du partenaire
- transmettez-lui le jeton renvoyé

## Importer les données de concessions ATENA en BDD

- éditer les noms de chemin dans le fichier `data-tools/R/import-atena.R`
- dans le répertoire `data-tools`, lancer la commande `make atena`

## Mise à jour des codes NAFv2

- dans le répertoire `data-tools`, lancer la commande `make nafv2`

## Documentation utile

- [SvelteKit](https://svelte.dev/docs/kit/introduction) : la documentation du framework javascript
- [ProConnect](https://partenaires.proconnect.gouv.fr/docs/fournisseur-service) : le service d’authentification
- [Lucia](https://lucia-auth.com/) : l’inspiration pour l’implémentation OIDC
- [Drizzle](https://orm.drizzle.team) : la documentation de l’ORM
- [Playwright](https://playwright.dev/) : le framework de tests e2e

## Mise à jour du DSFR

- récupérer la [dernière version](https://github.com/GouvernementFR/dsfr/releases) du DSFR
- copier le contenu de son repertoire `dist` dans le repertoire `/static/<VERSION>`
- mettre à jour les URLs dans [/src/app.html](/src/app.html)
- mettre à jour la variable DSFR_VERSION dans [/src/lib/constants.ts](/src/lib/constants.ts)
