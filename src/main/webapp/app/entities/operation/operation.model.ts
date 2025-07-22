import dayjs from 'dayjs/esm';
import { IContrat } from 'app/entities/contrat/contrat.model';

export interface IOperation {
  id: number;
  typeMEG?: string | null;
  codeOffre?: string | null;
  dateEffet?: dayjs.Dayjs | null;
  contrat?: Pick<IContrat, 'id'> | null;
}

export type NewOperation = Omit<IOperation, 'id'> & { id: null };
