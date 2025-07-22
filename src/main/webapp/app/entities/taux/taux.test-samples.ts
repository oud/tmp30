import dayjs from 'dayjs/esm';

import { ITaux, NewTaux } from './taux.model';

export const sampleWithRequiredData: ITaux = {
  id: 25853,
  typeMEG: 'whose usable',
  codeOffre: 'and but enormously',
  dateEffet: dayjs('2025-07-22'),
};

export const sampleWithPartialData: ITaux = {
  id: 27091,
  typeMEG: 'fine lucky',
  codeOffre: 'yahoo very',
  dateEffet: dayjs('2025-07-21'),
};

export const sampleWithFullData: ITaux = {
  id: 7041,
  typeMEG: 'around',
  codeOffre: 'digit brightly deploy',
  dateEffet: dayjs('2025-07-21'),
};

export const sampleWithNewData: NewTaux = {
  typeMEG: 'mid sophisticated bah',
  codeOffre: 'memorise accidentally sorrowful',
  dateEffet: dayjs('2025-07-21'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
