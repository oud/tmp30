import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IContrat, NewContrat } from '../contrat.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContrat for edit and NewContratFormGroupInput for create.
 */
type ContratFormGroupInput = IContrat | PartialWithRequiredKeyOf<NewContrat>;

type ContratFormDefaults = Pick<NewContrat, 'id'>;

type ContratFormGroupContent = {
  id: FormControl<IContrat['id'] | NewContrat['id']>;
  typeMEG: FormControl<IContrat['typeMEG']>;
  codeOffre: FormControl<IContrat['codeOffre']>;
  dateEffet: FormControl<IContrat['dateEffet']>;
  pmEntreprise: FormControl<IContrat['pmEntreprise']>;
};

export type ContratFormGroup = FormGroup<ContratFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContratFormService {
  createContratFormGroup(contrat: ContratFormGroupInput = { id: null }): ContratFormGroup {
    const contratRawValue = {
      ...this.getFormDefaults(),
      ...contrat,
    };
    return new FormGroup<ContratFormGroupContent>({
      id: new FormControl(
        { value: contratRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      typeMEG: new FormControl(contratRawValue.typeMEG, {
        validators: [Validators.required],
      }),
      codeOffre: new FormControl(contratRawValue.codeOffre, {
        validators: [Validators.required],
      }),
      dateEffet: new FormControl(contratRawValue.dateEffet, {
        validators: [Validators.required],
      }),
      pmEntreprise: new FormControl(contratRawValue.pmEntreprise),
    });
  }

  getContrat(form: ContratFormGroup): IContrat | NewContrat {
    return form.getRawValue() as IContrat | NewContrat;
  }

  resetForm(form: ContratFormGroup, contrat: ContratFormGroupInput): void {
    const contratRawValue = { ...this.getFormDefaults(), ...contrat };
    form.reset(
      {
        ...contratRawValue,
        id: { value: contratRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ContratFormDefaults {
    return {
      id: null,
    };
  }
}
