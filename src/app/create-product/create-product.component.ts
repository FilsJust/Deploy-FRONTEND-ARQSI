import { Component, OnInit } from '@angular/core';
import { CreateProductService } from '../Services/create-product.service';
import { Material } from '../Model/Material';
import { Finishing } from '../Model/Finishing';
import { Category } from '../Model/Category';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css', '../../../css/bootstrap.css']
})
export class CreateProdutoComponent implements OnInit {

  materials : Material[];
  finishings : Finishing[];
  categories: Category[];
  constructor(private CreateProductService: CreateProductService) { }

  ngOnInit() {
    this.getMaterials();
    this.getFinishings();
    this.getCategory();
  }

  getMaterials(): void {
    this.CreateProductService.getMaterials()
      .subscribe(material => this.materials = material);
  }

  getFinishings(): void {
    this.CreateProductService.getFinishings()
      .subscribe(finishing => this.finishings = finishing);
  }

  getCategory(): void {
    this.CreateProductService.getCategories()
      .subscribe(category => this.categories = category);
  }
}
