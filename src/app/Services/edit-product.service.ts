import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EditProductService {

  private productUrl = 'https://stockcloset.azurewebsites.net/api/Product/';  // URL to web api

 
  constructor() { }
}
