import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaux, NewTaux } from '../taux.model';

export type PartialUpdateTaux = Partial<ITaux> & Pick<ITaux, 'id'>;

type RestOf<T extends ITaux | NewTaux> = Omit<T, 'dateEffet'> & {
  dateEffet?: string | null;
};

export type RestTaux = RestOf<ITaux>;

export type NewRestTaux = RestOf<NewTaux>;

export type PartialUpdateRestTaux = RestOf<PartialUpdateTaux>;

export type EntityResponseType = HttpResponse<ITaux>;
export type EntityArrayResponseType = HttpResponse<ITaux[]>;

@Injectable({ providedIn: 'root' })
export class TauxService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tauxes');

  create(taux: NewTaux): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taux);
    return this.http.post<RestTaux>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(taux: ITaux): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taux);
    return this.http
      .put<RestTaux>(`${this.resourceUrl}/${this.getTauxIdentifier(taux)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(taux: PartialUpdateTaux): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taux);
    return this.http
      .patch<RestTaux>(`${this.resourceUrl}/${this.getTauxIdentifier(taux)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTaux>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTaux[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTauxIdentifier(taux: Pick<ITaux, 'id'>): number {
    return taux.id;
  }

  compareTaux(o1: Pick<ITaux, 'id'> | null, o2: Pick<ITaux, 'id'> | null): boolean {
    return o1 && o2 ? this.getTauxIdentifier(o1) === this.getTauxIdentifier(o2) : o1 === o2;
  }

  addTauxToCollectionIfMissing<Type extends Pick<ITaux, 'id'>>(
    tauxCollection: Type[],
    ...tauxesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tauxes: Type[] = tauxesToCheck.filter(isPresent);
    if (tauxes.length > 0) {
      const tauxCollectionIdentifiers = tauxCollection.map(tauxItem => this.getTauxIdentifier(tauxItem));
      const tauxesToAdd = tauxes.filter(tauxItem => {
        const tauxIdentifier = this.getTauxIdentifier(tauxItem);
        if (tauxCollectionIdentifiers.includes(tauxIdentifier)) {
          return false;
        }
        tauxCollectionIdentifiers.push(tauxIdentifier);
        return true;
      });
      return [...tauxesToAdd, ...tauxCollection];
    }
    return tauxCollection;
  }

  protected convertDateFromClient<T extends ITaux | NewTaux | PartialUpdateTaux>(taux: T): RestOf<T> {
    return {
      ...taux,
      dateEffet: taux.dateEffet?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTaux: RestTaux): ITaux {
    return {
      ...restTaux,
      dateEffet: restTaux.dateEffet ? dayjs(restTaux.dateEffet) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTaux>): HttpResponse<ITaux> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTaux[]>): HttpResponse<ITaux[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
