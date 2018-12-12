import { Injectable } from '@angular/core';
import { Encomenda } from '../Model/encomenda';
import { Produto } from '../Model/produto';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemEFilhos } from '../Model/ItemEFilhos';
import { Item } from '../Model/item';

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {

  private encomendaUrl = 'https://polar-stream-42470.herokuapp.com/order';  // URL to web api
  private productUrl = 'https://stockcloset.azurewebsites.net/api/Product/';  // URL to web api
  private itemsUrl = 'https://polar-stream-42470.herokuapp.com/item/make/full/tree/';
  private allItemsUrl = 'https://polar-stream-42470.herokuapp.com/item/all/just/parents';

  constructor(private http: HttpClient) { }

  getEncomendas(): Observable<Encomenda[]> {
    /* var encomenda: Encomenda[] = [
      { id: 1, name: "Encomenda1" },
      { id: 2, name: "Encomenda2" }
    ]; */
    var x = this.http.get<Encomenda[]>(this.encomendaUrl);
    x.subscribe(res => console.log(res));
    return this.http.get<Encomenda[]>(this.encomendaUrl);
  }

  getProducts(): Observable<Produto[]> {
    var x = this.http.get<Produto[]>(this.productUrl);
    x.subscribe(res => console.log(res));
    return this.http.get<Produto[]>(this.productUrl);
  }

  getItems(id: string): Observable<ItemEFilhos> {
    return this.http.get<ItemEFilhos>(this.itemsUrl + id);
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.allItemsUrl);
  }
}
