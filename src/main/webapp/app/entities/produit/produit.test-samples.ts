import dayjs from 'dayjs/esm';

import { IProduit, NewProduit } from './produit.model';

export const sampleWithRequiredData: IProduit = {
  id: 10819,
  typeMEG: 'cap angelic huzzah',
  codeOffre: 'passport',
  dateEffet: dayjs('2025-07-21'),
};

export const sampleWithPartialData: IProduit = {
  id: 9152,
  typeMEG: 'eek awkwardly',
  codeOffre: 'vain',
  dateEffet: dayjs('2025-07-21'),
};

export const sampleWithFullData: IProduit = {
  id: 2644,
  typeMEG: 'towards always oh',
  codeOffre: 'aside busily solution',
  dateEffet: dayjs('2025-07-22'),
};

export const sampleWithNewData: NewProduit = {
  typeMEG: 'altruistic mean',
  codeOffre: 'save woot',
  dateEffet: dayjs('2025-07-21'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
