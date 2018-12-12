import { Component, OnInit } from '@angular/core';
import { Produto } from '../Model/produto';
import { CatalogoService } from '../Services/catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css', '../../../css/bootstrap.css']
})
export class CatalogoComponent implements OnInit {

  produtos: Produto[];
  constructor(private catalogoService: CatalogoService) { }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos(): void {
    this.catalogoService.getProducts()
      .subscribe(produto => this.produtos = produto);
  }

}
