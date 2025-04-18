import { getContext, setContext } from 'svelte';

const key = {};

export type DeclarationContext = {
  emailEntreprise: string;
  emailContact: string;
  telEntreprise: string;
  telContact: string;
  concessionsErreursComment: string;
  evtExceptionnelsComment: string;
  formErreursComment: string;
  suggestionsComment: string;
  valide: boolean;
  entrepriseComplete: boolean;
  concessionsComplete: boolean;
  productionComplete: boolean;
  stockComplete: boolean;
  declarationComplete: boolean;
  envoiComplete: boolean;
};

export const emptyDeclarationValues = Object.freeze({
  emailEntreprise: '',
  emailContact: '',
  telEntreprise: '',
  telContact: '',
  concessionsErreursComment: '',
  evtExceptionnelsComment: '',
  formErreursComment: '',
  suggestionsComment: '',
  valide: false,
  entrepriseComplete: false,
  concessionsComplete: false,
  productionComplete: false,
  stockComplete: false,
  declarationComplete: false,
  envoiComplete: false
});

export function setDeclarationContext(dc: DeclarationContext) {
  setContext(key, dc);
}

export function getDeclarationContext() {
  return getContext(key) as DeclarationContext;
}

export function resetDeclarationContext(context: DeclarationContext) {
  Object.assign(context, emptyDeclarationValues);
}
