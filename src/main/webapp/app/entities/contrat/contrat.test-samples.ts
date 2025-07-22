import dayjs from 'dayjs/esm';

import { IContrat, NewContrat } from './contrat.model';

export const sampleWithRequiredData: IContrat = {
  id: 16857,
  typeMEG: 'supposing pepper',
  codeOffre: 'utterly shameless fantastic',
  dateEffet: dayjs('2025-07-22'),
};

export const sampleWithPartialData: IContrat = {
  id: 9635,
  typeMEG: 'pish ha',
  codeOffre: 'claw',
  dateEffet: dayjs('2025-07-21'),
};

export const sampleWithFullData: IContrat = {
  id: 4932,
  typeMEG: 'undergo fooey',
  codeOffre: 'incidentally given healthily',
  dateEffet: dayjs('2025-07-22'),
};

export const sampleWithNewData: NewContrat = {
  typeMEG: 'concentration um',
  codeOffre: 'miserly',
  dateEffet: dayjs('2025-07-21'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
