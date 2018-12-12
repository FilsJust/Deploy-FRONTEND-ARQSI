import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../Model/item';
import { ProdutosFilhos } from '../Model/produtosfilhos';
import { CreateItemproductService } from './create-itemproduct.service';
@Injectable({
  providedIn: 'root'
})
export class ShowItemchildService {

  private getItemUrl = 'https://polar-stream-42470.herokuapp.com/item/';
  private getAggregationsUrl = 'https://polar-stream-42470.herokuapp.com/item/aggregations/';
  private deleteItem = 'https://polar-stream-42470.herokuapp.com/item/'
  loadingError$ = new Subject<boolean>();

  constructor(private http: HttpClient,
    private createitemproductService: CreateItemproductService) { }

  getItem(itemId: string): Observable<any> {
    return this.http.get<any>(this.getItemUrl + itemId, { observe: 'response' }).pipe(catchError((error) => {
      // it's important that we log an error here.
      // Otherwise you won't see an error in the console.
      console.log('Something went wrong');
      this.loadingError$.next(true);
      return of();
    }))
  }

  getChildren(id: number): Observable<ProdutosFilhos> {
    return this.createitemproductService.getProduct(id);
  }

  getAggregations(id: string): Observable<any> {
    return this.http.get<any>(this.getAggregationsUrl + id).pipe(catchError((error) => {
      // it's important that we log an error here.
      // Otherwise you won't see an error in the console.
      console.log('Something went wrong');
      this.loadingError$.next(true);
      return of();
    }));
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.deleteItem + id).pipe(catchError((error) => {
      // it's important that we log an error here.
      // Otherwise you won't see an error in the console.
      console.log('Something went wrong');
      this.loadingError$.next(true);
      return of(error);
    }));
  }
}
