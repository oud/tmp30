import dayjs from 'dayjs/esm';
import { IPmEntreprise } from 'app/entities/pm-entreprise/pm-entreprise.model';

export interface IContrat {
  id: number;
  typeMEG?: string | null;
  codeOffre?: string | null;
  dateEffet?: dayjs.Dayjs | null;
  pmEntreprise?: Pick<IPmEntreprise, 'id'> | null;
}

export type NewContrat = Omit<IContrat, 'id'> & { id: null };
