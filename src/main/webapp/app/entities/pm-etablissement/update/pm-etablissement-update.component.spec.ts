import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IContrat } from 'app/entities/contrat/contrat.model';
import { ContratService } from 'app/entities/contrat/service/contrat.service';
import { IGroupe } from 'app/entities/groupe/groupe.model';
import { GroupeService } from 'app/entities/groupe/service/groupe.service';
import { IPmEtablissement } from '../pm-etablissement.model';
import { PmEtablissementService } from '../service/pm-etablissement.service';
import { PmEtablissementFormService } from './pm-etablissement-form.service';

import { PmEtablissementUpdateComponent } from './pm-etablissement-update.component';

describe('PmEtablissement Management Update Component', () => {
  let comp: PmEtablissementUpdateComponent;
  let fixture: ComponentFixture<PmEtablissementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pmEtablissementFormService: PmEtablissementFormService;
  let pmEtablissementService: PmEtablissementService;
  let contratService: ContratService;
  let groupeService: GroupeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PmEtablissementUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PmEtablissementUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PmEtablissementUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pmEtablissementFormService = TestBed.inject(PmEtablissementFormService);
    pmEtablissementService = TestBed.inject(PmEtablissementService);
    contratService = TestBed.inject(ContratService);
    groupeService = TestBed.inject(GroupeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Contrat query and add missing value', () => {
      const pmEtablissement: IPmEtablissement = { id: 14323 };
      const contrat: IContrat = { id: 7637 };
      pmEtablissement.contrat = contrat;

      const contratCollection: IContrat[] = [{ id: 7637 }];
      jest.spyOn(contratService, 'query').mockReturnValue(of(new HttpResponse({ body: contratCollection })));
      const additionalContrats = [contrat];
      const expectedCollection: IContrat[] = [...additionalContrats, ...contratCollection];
      jest.spyOn(contratService, 'addContratToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      expect(contratService.query).toHaveBeenCalled();
      expect(contratService.addContratToCollectionIfMissing).toHaveBeenCalledWith(
        contratCollection,
        ...additionalContrats.map(expect.objectContaining),
      );
      expect(comp.contratsSharedCollection).toEqual(expectedCollection);
    });

    it('should call Groupe query and add missing value', () => {
      const pmEtablissement: IPmEtablissement = { id: 14323 };
      const groupe: IGroupe = { id: 10264 };
      pmEtablissement.groupe = groupe;

      const groupeCollection: IGroupe[] = [{ id: 10264 }];
      jest.spyOn(groupeService, 'query').mockReturnValue(of(new HttpResponse({ body: groupeCollection })));
      const additionalGroupes = [groupe];
      const expectedCollection: IGroupe[] = [...additionalGroupes, ...groupeCollection];
      jest.spyOn(groupeService, 'addGroupeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      expect(groupeService.query).toHaveBeenCalled();
      expect(groupeService.addGroupeToCollectionIfMissing).toHaveBeenCalledWith(
        groupeCollection,
        ...additionalGroupes.map(expect.objectContaining),
      );
      expect(comp.groupesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const pmEtablissement: IPmEtablissement = { id: 14323 };
      const contrat: IContrat = { id: 7637 };
      pmEtablissement.contrat = contrat;
      const groupe: IGroupe = { id: 10264 };
      pmEtablissement.groupe = groupe;

      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      expect(comp.contratsSharedCollection).toContainEqual(contrat);
      expect(comp.groupesSharedCollection).toContainEqual(groupe);
      expect(comp.pmEtablissement).toEqual(pmEtablissement);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPmEtablissement>>();
      const pmEtablissement = { id: 16761 };
      jest.spyOn(pmEtablissementFormService, 'getPmEtablissement').mockReturnValue(pmEtablissement);
      jest.spyOn(pmEtablissementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pmEtablissement }));
      saveSubject.complete();

      // THEN
      expect(pmEtablissementFormService.getPmEtablissement).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pmEtablissementService.update).toHaveBeenCalledWith(expect.objectContaining(pmEtablissement));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPmEtablissement>>();
      const pmEtablissement = { id: 16761 };
      jest.spyOn(pmEtablissementFormService, 'getPmEtablissement').mockReturnValue({ id: null });
      jest.spyOn(pmEtablissementService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pmEtablissement: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pmEtablissement }));
      saveSubject.complete();

      // THEN
      expect(pmEtablissementFormService.getPmEtablissement).toHaveBeenCalled();
      expect(pmEtablissementService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPmEtablissement>>();
      const pmEtablissement = { id: 16761 };
      jest.spyOn(pmEtablissementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pmEtablissementService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareContrat', () => {
      it('should forward to contratService', () => {
        const entity = { id: 7637 };
        const entity2 = { id: 25812 };
        jest.spyOn(contratService, 'compareContrat');
        comp.compareContrat(entity, entity2);
        expect(contratService.compareContrat).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareGroupe', () => {
      it('should forward to groupeService', () => {
        const entity = { id: 10264 };
        const entity2 = { id: 17963 };
        jest.spyOn(groupeService, 'compareGroupe');
        comp.compareGroupe(entity, entity2);
        expect(groupeService.compareGroupe).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
