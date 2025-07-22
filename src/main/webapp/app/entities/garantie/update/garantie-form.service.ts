import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IGarantie, NewGarantie } from '../garantie.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGarantie for edit and NewGarantieFormGroupInput for create.
 */
type GarantieFormGroupInput = IGarantie | PartialWithRequiredKeyOf<NewGarantie>;

type GarantieFormDefaults = Pick<NewGarantie, 'id'>;

type GarantieFormGroupContent = {
  id: FormControl<IGarantie['id'] | NewGarantie['id']>;
  typeMEG: FormControl<IGarantie['typeMEG']>;
  codeOffre: FormControl<IGarantie['codeOffre']>;
  dateEffet: FormControl<IGarantie['dateEffet']>;
  produit: FormControl<IGarantie['produit']>;
};

export type GarantieFormGroup = FormGroup<GarantieFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GarantieFormService {
  createGarantieFormGroup(garantie: GarantieFormGroupInput = { id: null }): GarantieFormGroup {
    const garantieRawValue = {
      ...this.getFormDefaults(),
      ...garantie,
    };
    return new FormGroup<GarantieFormGroupContent>({
      id: new FormControl(
        { value: garantieRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      typeMEG: new FormControl(garantieRawValue.typeMEG, {
        validators: [Validators.required],
      }),
      codeOffre: new FormControl(garantieRawValue.codeOffre, {
        validators: [Validators.required],
      }),
      dateEffet: new FormControl(garantieRawValue.dateEffet, {
        validators: [Validators.required],
      }),
      produit: new FormControl(garantieRawValue.produit),
    });
  }

  getGarantie(form: GarantieFormGroup): IGarantie | NewGarantie {
    return form.getRawValue() as IGarantie | NewGarantie;
  }

  resetForm(form: GarantieFormGroup, garantie: GarantieFormGroupInput): void {
    const garantieRawValue = { ...this.getFormDefaults(), ...garantie };
    form.reset(
      {
        ...garantieRawValue,
        id: { value: garantieRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): GarantieFormDefaults {
    return {
      id: null,
    };
  }
}
