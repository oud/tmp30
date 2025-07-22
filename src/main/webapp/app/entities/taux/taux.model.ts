import dayjs from 'dayjs/esm';
import { IGarantie } from 'app/entities/garantie/garantie.model';

export interface ITaux {
  id: number;
  typeMEG?: string | null;
  codeOffre?: string | null;
  dateEffet?: dayjs.Dayjs | null;
  garantie?: Pick<IGarantie, 'id'> | null;
}

export type NewTaux = Omit<ITaux, 'id'> & { id: null };
