import dayjs from 'dayjs/esm';

import { IGroupe, NewGroupe } from './groupe.model';

export const sampleWithRequiredData: IGroupe = {
  id: 17940,
  typeMEG: 'yuck eggplant terrorise',
  codeOffre: 'overreact bemuse',
  dateEffet: dayjs('2025-07-21'),
};

export const sampleWithPartialData: IGroupe = {
  id: 18816,
  typeMEG: 'properly bicycle thump',
  codeOffre: 'around',
  dateEffet: dayjs('2025-07-22'),
};

export const sampleWithFullData: IGroupe = {
  id: 9586,
  typeMEG: 'nab',
  codeOffre: 'excepting',
  dateEffet: dayjs('2025-07-21'),
};

export const sampleWithNewData: NewGroupe = {
  typeMEG: 'coordination harmful guilty',
  codeOffre: 'wherever where',
  dateEffet: dayjs('2025-07-21'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
