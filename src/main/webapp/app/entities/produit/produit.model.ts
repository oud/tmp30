import dayjs from 'dayjs/esm';
import { IGroupe } from 'app/entities/groupe/groupe.model';

export interface IProduit {
  id: number;
  typeMEG?: string | null;
  codeOffre?: string | null;
  dateEffet?: dayjs.Dayjs | null;
  groupe?: Pick<IGroupe, 'id'> | null;
}

export type NewProduit = Omit<IProduit, 'id'> & { id: null };
