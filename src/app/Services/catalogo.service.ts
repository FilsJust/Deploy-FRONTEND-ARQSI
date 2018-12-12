import { Injectable } from '@angular/core';
import { Produto } from '../Model/produto';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  
  private productUrl = 'https://stockcloset.azurewebsites.net/api/Product/';  // URL to web api

  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<Produto[]>{
    var x = this.http.get<Produto[]>(this.productUrl);
    x.subscribe(res=>console.log(res));
    return this.http.get<Produto[]>(this.productUrl);
  
  }
}
