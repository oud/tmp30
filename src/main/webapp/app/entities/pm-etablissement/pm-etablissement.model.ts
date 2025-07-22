import dayjs from 'dayjs/esm';
import { IContrat } from 'app/entities/contrat/contrat.model';
import { IGroupe } from 'app/entities/groupe/groupe.model';

export interface IPmEtablissement {
  id: number;
  idEtablissementRPG?: string | null;
  codePartenaireDistributeur?: string | null;
  numeroSiretSiege?: string | null;
  codeEtat?: string | null;
  libelleEtat?: string | null;
  codeCategoriePersonne?: string | null;
  libelleCategoriePersonne?: string | null;
  codeType?: string | null;
  dateCreationJuridique?: dayjs.Dayjs | null;
  dateEtat?: dayjs.Dayjs | null;
  dateFermetureJuridique?: dayjs.Dayjs | null;
  codeIDCC?: string | null;
  codeTrancheEffectif?: string | null;
  libelleTrancheEffectif?: string | null;
  dateCessationActivite?: dayjs.Dayjs | null;
  dateEffectifOfficiel?: dayjs.Dayjs | null;
  effectifOfficiel?: string | null;
  codeMotifCessationActivite?: string | null;
  siret?: string | null;
  codeTypeEtablissement?: string | null;
  libelleEnseigne?: string | null;
  codeNIC?: string | null;
  identifiantAI?: string | null;
  checked?: boolean | null;
  contrat?: Pick<IContrat, 'id'> | null;
  groupe?: Pick<IGroupe, 'id'> | null;
}

export type NewPmEtablissement = Omit<IPmEtablissement, 'id'> & { id: null };
