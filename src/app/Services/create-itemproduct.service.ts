import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProdutosFilhos } from '../Model/produtosfilhos';
import { Discret } from '../Model/Discret';
import { Continuous } from '../Model/Continuous';
import { CreateItem } from '../Model/CreateItem';
import { ApiResponse } from '../ApiResponse';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  responseType: 'text'
};

@Injectable({
  providedIn: 'root'
})
export class CreateItemproductService {
  private productUrl = 'https://stockcloset.azurewebsites.net/api/Product/';
  private dimensionUrl = 'https://stockcloset.azurewebsites.net/api/';
  private addItemUrl = 'https://polar-stream-42470.herokuapp.com/item/create/';

  loadingError$ = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<ProdutosFilhos> {
    /* var x = this.http.get<ProdutosFilhos>(this.productUrl + id);
    x.subscribe(res => console.log(res)); */
    return this.http.get<any>(this.productUrl + id).pipe(catchError((error) => {
      // it's important that we log an error here.
      // Otherwise you won't see an error in the console.
      console.log('Something went wrong');
      this.loadingError$.next(true);
      return of();
    }));
  }

  getDimensionDiscret(id: number): Observable<Discret[]> {
    return this.http.get<Discret[]>(this.dimensionUrl + "Discret/" + "DimensionId/" + id);
  }
  getDimensionContinuous(id: number): Observable<Continuous> {
    return this.http.get<Continuous>(this.dimensionUrl + "Continuous/" + "DimensionId/" + id);
  }
  checkValuesIntegrity(item: CreateItem): boolean {
    if (item.fatherId && item.category && item.material && item.finishing && item.height && item.width && item.length) {
      return true;
    } else {
      return false;
    }
  }
  createItem(item: CreateItem): Observable<any>{
    return this.http.post(this.addItemUrl, item, {observe:'response',headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text'});
  }
  finalDimension(wid: number){
    if (wid != -1)
      return wid;
    else
      return null;
  }
  checkDimensionC(value: number, max: number, min: number): number{
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    }
    return value;
  }
  /* defineSizesPossibilities(type: number, dimensionDiscret: Discret[], dimensionContinuous: Continuous): any{
    if (type == 1) {
      return this.getDimensionDiscret(heightId)
        .subscribe(dimension => { dimensionDiscret = dimension; console.log(dimensionDiscret) });
    } else {
      return this.getDimensionContinuous(heightId)
        .subscribe(dimension => dimensionContinuous = dimension);
    }
  } */
  getFinishingIndexFromMaterialList(materialID: number, produtosFilhos: ProdutosFilhos): number{
    for (var i = 0; i < produtosFilhos.materials.length; i++) {
      var material = produtosFilhos.materials[i];
      if (material.idMaterial == materialID) {
        return i;
      }
    }
    return -1;
  }
}