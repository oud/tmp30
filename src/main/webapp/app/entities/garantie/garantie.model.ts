import dayjs from 'dayjs/esm';
import { IProduit } from 'app/entities/produit/produit.model';

export interface IGarantie {
  id: number;
  typeMEG?: string | null;
  codeOffre?: string | null;
  dateEffet?: dayjs.Dayjs | null;
  produit?: Pick<IProduit, 'id'> | null;
}

export type NewGarantie = Omit<IGarantie, 'id'> & { id: null };
