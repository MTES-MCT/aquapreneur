Ce répertoire contient les schemas Drizzle des tables de la DB.

https://orm.drizzle.team/docs/sql-schema-declaration

Il faut éviter d’y importer du code (hors types) provenant du reste du projet,
étant donné que ces schemas peuvent être utilisés hors du contexte Vite (en
particulier dans les commandes drizzle-kit).
