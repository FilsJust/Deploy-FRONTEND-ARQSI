import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CreateItemproductService } from '../Services/create-itemproduct.service';
import { ProdutosFilhos } from '../Model/produtosfilhos';
import { Finishing } from '../Model/Finishing';
import { Discret } from '../Model/Discret';
import { Continuous } from '../Model/Continuous';
import { Observable } from 'rxjs';
import { CreateItem } from '../Model/CreateItem';

@Component({
  selector: 'app-create-itemproduct',
  templateUrl: './create-itemproduct.component.html',
  styleUrls: ['./create-itemproduct.component.css', '../../../css/bootstrap.css']
})
export class CreateItemproductComponent implements OnInit {

  produtosFilhos: ProdutosFilhos;
  finishings: Finishing[];

  heigthDiscret: Discret[];
  widthDiscret: Discret[];
  lengthDiscret: Discret[];

  heightContinuous: Continuous;
  widthContinuous: Continuous;
  lengthContinuous: Continuous;

  widCValue: number;
  heiCValue: number;
  lenCValue: number;

  wrong: boolean;

  item: CreateItem;
  itemId: number;
  constructor(
    private route: ActivatedRoute,
    private createitemproductService: CreateItemproductService) { }

  ngOnInit() {
    this.wrong = false;
    this.getProduto();
    this.item = new CreateItem;
  }
  getProduto(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.createitemproductService.getProduct(id)
      .subscribe(produto => {
        this.produtosFilhos = produto; this.defineSizesPossibilities();
        this.item.fatherId = this.produtosFilhos.productID; this.item.category = this.produtosFilhos.category.categoryID;
      });
  }
  getFinishingsFromDropDown(materialID: number): void {
    if (materialID != -1) {
      var index = this.getFinishingIndexFromMaterialList(materialID);
      this.item.material = materialID;
      if (index != -1) {
        this.finishings = this.produtosFilhos.materials[index].finishings;
      } else {
        this.finishings = null;
      }
    } else {
      this.finishings = null;
    }
  }
  chooseFinishing(finishingId: number): void {
    if (finishingId != -1) {
      this.item.finishing = finishingId;
    }
  }
  getFinishingIndexFromMaterialList(materialID: number): number {
    return this.createitemproductService.getFinishingIndexFromMaterialList(materialID, this.produtosFilhos);
  }
  defineSizesPossibilities(): void {
    var heightId = this.produtosFilhos.heightDimensionId.dimensionID;
    var widthId = this.produtosFilhos.widthDimensionId.dimensionID;
    var lengthId = this.produtosFilhos.lengthDimensionId.dimensionID;
    //console.log(this.produtosFilhos.heightDimensionId.dimensionID);
    if (this.produtosFilhos.heightDimensionId.type == 1) {
      this.createitemproductService.getDimensionDiscret(heightId)
        .subscribe(height => { this.heigthDiscret = height; console.log(this.heigthDiscret) });
    } else {
      this.createitemproductService.getDimensionContinuous(heightId)
        .subscribe(height => this.heightContinuous = height);
    }
    if (this.produtosFilhos.widthDimensionId.type == 1) {
      this.createitemproductService.getDimensionDiscret(widthId)
        .subscribe(width => this.widthDiscret = width);
    } else {
      this.createitemproductService.getDimensionContinuous(widthId)
        .subscribe(width => { this.widthContinuous = width; console.log(this.widthContinuous) });
    }
    if (this.produtosFilhos.lengthDimensionId.type == 1) {
      this.createitemproductService.getDimensionDiscret(lengthId)
        .subscribe(length => this.lengthDiscret = length);
    } else {
      this.createitemproductService.getDimensionContinuous(lengthId)
        .subscribe(length => this.lengthContinuous = length);
    } 
  }

  checkWidthC(value: number, max: number, min: number): void {
    this.widCValue = this.createitemproductService.checkDimensionC(value, max, min);
    this.item.width = this.widCValue;
  }
  checkHeightC(value: number, max: number, min: number): void {
    this.heiCValue = this.createitemproductService.checkDimensionC(value, max, min);
    this.item.height = this.heiCValue;
  }
  checkLengthC(value: number, max: number, min: number): void {
    this.lenCValue = this.createitemproductService.checkDimensionC(value, max, min);
    this.item.length = this.lenCValue;
  }
  submit(): void {
    if (this.createitemproductService.checkValuesIntegrity(this.item)) {
      console.log(this.item);
      var x = this.createitemproductService.createItem(this.item);
      x.subscribe(message => { console.log(message.body); this.itemId = message.body.substr(message.body.indexOf(':\"') + 2, message.body.indexOf('\",') - 8); });

    } else {
      this.wrong = true;
    }
  }
  finalWidth(wid: number): void {
    this.item.width = this.createitemproductService.finalDimension(wid);
  }
  finalHeight(hei: number): void {
    this.item.height = this.createitemproductService.finalDimension(hei);
  }
  finalLength(len: number): void {
    this.item.length = this.createitemproductService.finalDimension(len);
  }
}