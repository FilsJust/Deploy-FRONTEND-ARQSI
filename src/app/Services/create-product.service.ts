import { Injectable } from '@angular/core';
import { Category } from '../Model/Category';
import { Material } from '../Model/Material';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Finishing } from '../Model/Finishing';

@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

  private productUrl = 'https://stockcloset.azurewebsites.net/api/Product/';  // URL to web api
  constructor(private http: HttpClient) { }

  getMaterials(): Observable<Material[]>{
    var x = this.http.get<Material[]>(this.productUrl);
    x.subscribe(res=>console.log(res));
    return this.http.get<Material[]>(this.productUrl);
  
  }
  getFinishings()
  {
    var x = this.http.get<Finishing[]>(this.productUrl);
    x.subscribe(res=>console.log(res));
    return this.http.get<Finishing[]>(this.productUrl);
  
  }
  getCategories()
  {
    var x = this.http.get<Category[]>(this.productUrl);
    x.subscribe(res=>console.log(res));
    return this.http.get<Category[]>(this.productUrl);
  
  }
}
