import dayjs from 'dayjs/esm';

import { IGarantie, NewGarantie } from './garantie.model';

export const sampleWithRequiredData: IGarantie = {
  id: 26408,
  typeMEG: 'gracefully',
  codeOffre: 'assured rowdy jaunty',
  dateEffet: dayjs('2025-07-22'),
};

export const sampleWithPartialData: IGarantie = {
  id: 17902,
  typeMEG: 'although ouch guard',
  codeOffre: 'video partially obediently',
  dateEffet: dayjs('2025-07-22'),
};

export const sampleWithFullData: IGarantie = {
  id: 6986,
  typeMEG: 'alongside westernize rebuff',
  codeOffre: 'militate until actually',
  dateEffet: dayjs('2025-07-21'),
};

export const sampleWithNewData: NewGarantie = {
  typeMEG: 'editor inborn',
  codeOffre: 'scorn why replacement',
  dateEffet: dayjs('2025-07-22'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
