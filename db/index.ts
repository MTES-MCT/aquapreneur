import { drizzle } from 'drizzle-orm/postgres-js';

// La variable d’environnement peut venir de contextes différents,
// selon que ce fichier est appelé dans un contexte Vite (serveur de développement
// ou de production), ou dans un contexte dotEnv (scripts, tests E2E)
const DATABASE_URL = process.env.DATABASE_URL || import.meta.env.VITE_DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('La variable d’environnement DATABASE_URL n’est pas renseignée');
}

export const db = drizzle({
  connection: DATABASE_URL,
  casing: 'snake_case'
  // logger: true
});

console.log('Base de donnée utilisée : ', db.$client.options.database);
