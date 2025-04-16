import { getContext, setContext } from 'svelte';

const key = {};

export type DeclarationContext = {
  emailEntreprise: string;
  emailContact: string;
  telEntreprise: string;
  telContact: string;
  evtExceptionnelsComment: string;
  formErreursComment: string;
  suggestionsComment: string;
  valide: boolean;
};

export const emptyDeclarationValues = Object.freeze({
  emailEntreprise: '',
  emailContact: '',
  telEntreprise: '',
  telContact: '',
  evtExceptionnelsComment: '',
  formErreursComment: '',
  suggestionsComment: '',
  valide: false
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
