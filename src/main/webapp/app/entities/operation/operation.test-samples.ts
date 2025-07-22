import dayjs from 'dayjs/esm';

import { IOperation, NewOperation } from './operation.model';

export const sampleWithRequiredData: IOperation = {
  id: 6430,
  typeMEG: 'boohoo',
  codeOffre: 'unwieldy meager boastfully',
  dateEffet: dayjs('2025-07-22'),
};

export const sampleWithPartialData: IOperation = {
  id: 3157,
  typeMEG: 'deep',
  codeOffre: 'phooey but',
  dateEffet: dayjs('2025-07-22'),
};

export const sampleWithFullData: IOperation = {
  id: 13289,
  typeMEG: 'knickers unlike',
  codeOffre: 'carpool',
  dateEffet: dayjs('2025-07-22'),
};

export const sampleWithNewData: NewOperation = {
  typeMEG: 'list unabashedly minus',
  codeOffre: 'sandy',
  dateEffet: dayjs('2025-07-22'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
