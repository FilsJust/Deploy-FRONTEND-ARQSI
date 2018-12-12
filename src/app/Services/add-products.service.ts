import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from '../Model/produto';

@Injectable({
  providedIn: 'root'
})
export class AddProductsService {

  private productUrl = 'https://stockcloset.azurewebsites.net/api/Product/';  // URL to web api

 
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Produto[]>{
    var x = this.http.get<Produto[]>(this.productUrl);
    x.subscribe(res=>console.log(res));
    return this.http.get<Produto[]>(this.productUrl);
  }
}
