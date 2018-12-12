import { Injectable } from '@angular/core';
import { Observable, Subject, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../Model/item';
import { ProdutosFilhos } from '../Model/produtosfilhos';
import { CreateItemproductService } from './create-itemproduct.service';
import { Discret } from '../Model/Discret';
import { Continuous } from '../Model/Continuous';
import { CreateItemChild } from '../Model/CreateItemChild';


@Injectable({
  providedIn: 'root'
})
export class CreateItemchildService {

  private getItemUrl = 'https://polar-stream-42470.herokuapp.com/item/';
  loadingError$ = new Subject<boolean>();

  constructor(private http: HttpClient,
    private createitemproductService: CreateItemproductService) { }

  getProduct(id: number): Observable<ProdutosFilhos> {
    return this.createitemproductService.getProduct(id);
  }
  getDimensionDiscret(id: number): Observable<Discret[]> {
    return this.createitemproductService.getDimensionDiscret(id);
  }
  getDimensionContinuous(id: number): Observable<Continuous> {
    return this.createitemproductService.getDimensionContinuous(id);
  }
  getFinishingIndexFromMaterialList(materialID: number, produtosFilhos: ProdutosFilhos): number {
    return this.createitemproductService.getFinishingIndexFromMaterialList(materialID, produtosFilhos);
  }
  checkDimensionC(value: number, max: number, min: number): number {
    return this.createitemproductService.checkDimensionC(value, max, min);
  }
  finalDimension(wid: number) {
    return this.createitemproductService.finalDimension(wid);
  }
  checkValuesIntegrity(item: CreateItemChild): boolean {
    if (item.productId && item.fatherId && item.category && item.material && item.finishing && item.height && item.width && item.length) {
      return true;
    } else {
      return false;
    }
  }
  createItem(item: CreateItemChild): Observable<any> {
    return this.http.post(this.getItemUrl + "create/addChildren", item, { observe: 'response', headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text' })
    .pipe(catchError((error) => {
      // it's important that we log an error here.
      // Otherwise you won't see an error in the console.
      console.log('Something went wrong ');
      console.log(error);
      this.loadingError$.next(true);
      return of(error);
    }));
  }
  /* getItem(itemId: string): Observable<any>{
    return this.http.get<any>(this.getItemUrl + itemId, {observe: 'response'}).pipe(catchError((error) => {
      // it's important that we log an error here.
      // Otherwise you won't see an error in the console.
      console.log('Something went wrong');
      this.loadingError$.next(true);
      return of();
    }))
  }

  getChildren(id: number): Observable<ProdutosFilhos>{
    return this.createitemproductService.getProduct(id);
  } */
}
