import { Component, OnInit } from '@angular/core';
import { Produto } from '../Model/produto';
import { AddProductsService } from '../Services/add-products.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css', '../../../css/bootstrap.css']
})
export class AddProductsComponent implements OnInit {

  produtos: Produto[];
  constructor(private AddProductsService: AddProductsService) { }

  ngOnInit() {
  }

  getProducts()
  {
    this.AddProductsService.getProducts()
      .subscribe(produto => this.produtos = produto);
  }

}
