import { input } from '@inquirer/prompts';

import { db } from '$db';

import { jetonsApi } from '$db/schema/auth';

import { generateApiToken } from '$utils';

const cleanSiret = (str: string) => str.trim().replace(/[^0-9]/g, '');

const nom = await input({
  message: 'Saisir le nom du partenaire',
  required: true
});

const siret = await input({
  message: 'Saisir le numéro SIRET du partenaire',
  required: true,
  validate: (str) => cleanSiret(str).length === 14 || 'Le siret doit comporter 14 chiffres'
});

// Basé sur https://thecopenhagenbook.com/server-side-tokens
// On génère un token avec 256 bits d’entropie (que les partenaires pourront
// utiliser dans les appels API) et on le stocke dans la DB après hachage.

const { token, digest } = generateApiToken();

await db.insert(jetonsApi).values({
  hachage: digest,
  nomPartenaire: nom.trim(),
  siretPartenaire: cleanSiret(siret)
});

console.log('Jeton à transmettre: ');
console.log(token);

db.$client.end();
