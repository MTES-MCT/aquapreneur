# Utilitaires pour la préparation des données

Ces utilitaires nécessitent une installation [R](https://cloud.r-project.org/) fonctionnelle.
Il suffit alors normalement de lancer `make init` dans le dossier pour installer les dépendances
nécessaires.

## Importer les données de concessions ATENA en BDD

- les données ne sont hélas pas publique. Il faut donc les récupérer, et les placer 
dans le sous-répertoire data ou éditer les noms de chemin dans le fichier 
`data-tools/R/import-atena.R`

- puis, dans le répertoire `data-tools`, lancer la commande `make atena`

## Mise à jour des codes NAFv2

- dans le répertoire `data-tools`, lancer la commande `make nafv2`
