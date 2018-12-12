import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { ProdutosFilhos } from '../Model/produtosfilhos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateItemproductService } from './create-itemproduct.service';
import { Discret } from '../Model/Discret';
import { Continuous } from '../Model/Continuous';
import { CreateItemChild } from '../Model/CreateItemChild';
import { Item } from '../Model/item';
import { ShowItemchildService } from './show-itemchild.service';
import { catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'observe': 'response',
    'Content-Type':  'application/json',
    'responseType': 'text'
  })
};
@Injectable({
  providedIn: 'root'
})
export class EditItemchildService {

  private updateChildURL = 'https://polar-stream-42470.herokuapp.com/item/update/child';
  loadingError$ = new Subject<boolean>();
  
  constructor(private http: HttpClient,
    private createitemproductService: CreateItemproductService, private showitemchildService: ShowItemchildService) { }

  getProduct(id: number): Observable<ProdutosFilhos> {
    console.log("check " + id);
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
  getChildItem(id: string): Observable<any> {
    return this.showitemchildService.getItem(id);
  }
  updateChild(item: CreateItemChild): Observable<any> {
    return this.http.put<any>(this.updateChildURL, item, httpOptions).pipe(catchError((error) => {
      // it's important that we log an error here.
      // Otherwise you won't see an error in the console.
      console.log('Something went wrong');
      this.loadingError$.next(true);
      return of(error);
    }));
  }
}
