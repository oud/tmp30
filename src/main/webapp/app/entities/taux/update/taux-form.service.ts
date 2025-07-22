import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITaux, NewTaux } from '../taux.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaux for edit and NewTauxFormGroupInput for create.
 */
type TauxFormGroupInput = ITaux | PartialWithRequiredKeyOf<NewTaux>;

type TauxFormDefaults = Pick<NewTaux, 'id'>;

type TauxFormGroupContent = {
  id: FormControl<ITaux['id'] | NewTaux['id']>;
  typeMEG: FormControl<ITaux['typeMEG']>;
  codeOffre: FormControl<ITaux['codeOffre']>;
  dateEffet: FormControl<ITaux['dateEffet']>;
  garantie: FormControl<ITaux['garantie']>;
};

export type TauxFormGroup = FormGroup<TauxFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TauxFormService {
  createTauxFormGroup(taux: TauxFormGroupInput = { id: null }): TauxFormGroup {
    const tauxRawValue = {
      ...this.getFormDefaults(),
      ...taux,
    };
    return new FormGroup<TauxFormGroupContent>({
      id: new FormControl(
        { value: tauxRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      typeMEG: new FormControl(tauxRawValue.typeMEG, {
        validators: [Validators.required],
      }),
      codeOffre: new FormControl(tauxRawValue.codeOffre, {
        validators: [Validators.required],
      }),
      dateEffet: new FormControl(tauxRawValue.dateEffet, {
        validators: [Validators.required],
      }),
      garantie: new FormControl(tauxRawValue.garantie),
    });
  }

  getTaux(form: TauxFormGroup): ITaux | NewTaux {
    return form.getRawValue() as ITaux | NewTaux;
  }

  resetForm(form: TauxFormGroup, taux: TauxFormGroupInput): void {
    const tauxRawValue = { ...this.getFormDefaults(), ...taux };
    form.reset(
      {
        ...tauxRawValue,
        id: { value: tauxRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TauxFormDefaults {
    return {
      id: null,
    };
  }
}
