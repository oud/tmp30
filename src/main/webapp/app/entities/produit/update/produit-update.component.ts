import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGroupe } from 'app/entities/groupe/groupe.model';
import { GroupeService } from 'app/entities/groupe/service/groupe.service';
import { IProduit } from '../produit.model';
import { ProduitService } from '../service/produit.service';
import { ProduitFormGroup, ProduitFormService } from './produit-form.service';

@Component({
  selector: 'jhi-produit-update',
  templateUrl: './produit-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProduitUpdateComponent implements OnInit {
  isSaving = false;
  produit: IProduit | null = null;

  groupesSharedCollection: IGroupe[] = [];

  protected produitService = inject(ProduitService);
  protected produitFormService = inject(ProduitFormService);
  protected groupeService = inject(GroupeService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProduitFormGroup = this.produitFormService.createProduitFormGroup();

  compareGroupe = (o1: IGroupe | null, o2: IGroupe | null): boolean => this.groupeService.compareGroupe(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.produit = produit;
      if (produit) {
        this.updateForm(produit);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produit = this.produitFormService.getProduit(this.editForm);
    if (produit.id !== null) {
      this.subscribeToSaveResponse(this.produitService.update(produit));
    } else {
      this.subscribeToSaveResponse(this.produitService.create(produit));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduit>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(produit: IProduit): void {
    this.produit = produit;
    this.produitFormService.resetForm(this.editForm, produit);

    this.groupesSharedCollection = this.groupeService.addGroupeToCollectionIfMissing<IGroupe>(this.groupesSharedCollection, produit.groupe);
  }

  protected loadRelationshipsOptions(): void {
    this.groupeService
      .query()
      .pipe(map((res: HttpResponse<IGroupe[]>) => res.body ?? []))
      .pipe(map((groupes: IGroupe[]) => this.groupeService.addGroupeToCollectionIfMissing<IGroupe>(groupes, this.produit?.groupe)))
      .subscribe((groupes: IGroupe[]) => (this.groupesSharedCollection = groupes));
  }
}
