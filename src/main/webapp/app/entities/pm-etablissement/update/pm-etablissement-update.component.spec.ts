import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IGroupe } from 'app/entities/groupe/groupe.model';
import { GroupeService } from 'app/entities/groupe/service/groupe.service';
import { PmEtablissementService } from '../service/pm-etablissement.service';
import { IPmEtablissement } from '../pm-etablissement.model';
import { PmEtablissementFormService } from './pm-etablissement-form.service';

import { PmEtablissementUpdateComponent } from './pm-etablissement-update.component';

describe('PmEtablissement Management Update Component', () => {
  let comp: PmEtablissementUpdateComponent;
  let fixture: ComponentFixture<PmEtablissementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pmEtablissementFormService: PmEtablissementFormService;
  let pmEtablissementService: PmEtablissementService;
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
    groupeService = TestBed.inject(GroupeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
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
      const groupe: IGroupe = { id: 10264 };
      pmEtablissement.groupe = groupe;

      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

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
