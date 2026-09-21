import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export abstract class BaseService<TEntity, TCreateRequest = Partial<TEntity>> {
    protected readonly http = inject(HttpClient);
    protected abstract readonly resourceUrl: string;

    getAll(): Observable<TEntity[]> {
        return this.http.get<TEntity[]>(this.resourceUrl);
    }

    getById(id: number): Observable<TEntity> {
        return this.http.get<TEntity>(`${this.resourceUrl}/${id}`);
    }

    create(request: TCreateRequest): Observable<TEntity> {
        return this.http.post<TEntity>(this.resourceUrl, request);
    }

    update(id: number, request: TCreateRequest): Observable<TEntity> {
        return this.http.put<TEntity>(`this.resourceUrl/${id}`, request);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.resourceUrl}/${id}`);
    }
}