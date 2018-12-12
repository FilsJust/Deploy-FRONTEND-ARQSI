import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CreateItemchildService } from '../Services/create-itemchild.service';
import { Item } from '../Model/item';
import { ProdutosFilhos } from '../Model/produtosfilhos';
import { Discret } from '../Model/Discret';
import { Finishing } from '../Model/Finishing';
import { Continuous } from '../Model/Continuous';
import { CreateItem } from '../Model/CreateItem';
import { CreateItemChild } from '../Model/CreateItemChild';

@Component({
  selector: 'app-create-itemchild',
  templateUrl: './create-itemchild.component.html',
  styleUrls: ['./create-itemchild.component.css', '../../../css/bootstrap.css']
})
export class CreateItemchildComponent implements OnInit {

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
  errorRequest: boolean;
  requestMessage: string;

  item: CreateItemChild;
  itemPaiId: string;
  itemId: string;
  constructor(private route: ActivatedRoute,
    private createitemchildService: CreateItemchildService) { }

  ngOnInit() {
    this.wrong = false;
    this.errorRequest = false;
    this.getProduto();
    this.item = new CreateItemChild;
  }

  getProduto(): void {
    const idItemFilho = +this.route.snapshot.paramMap.get('idFilho');
    this.itemPaiId = this.route.snapshot.paramMap.get('idPai');
    console.log(idItemFilho);
    console.log(this.itemPaiId);
    this.createitemchildService.getProduct(idItemFilho)
      .subscribe(produto => {
        this.produtosFilhos = produto; this.defineSizesPossibilities();

        this.item.productId = this.produtosFilhos.productID; this.item.fatherId = this.itemPaiId; this.item.category = this.produtosFilhos.category.categoryID;
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
    return this.createitemchildService.getFinishingIndexFromMaterialList(materialID, this.produtosFilhos);
    //return this.createitemproductService.getFinishingIndexFromMaterialList(materialID, this.produtosFilhos);
  }

  defineSizesPossibilities(): void {
    var heightId = this.produtosFilhos.heightDimensionId.dimensionID;
    var widthId = this.produtosFilhos.widthDimensionId.dimensionID;
    var lengthId = this.produtosFilhos.lengthDimensionId.dimensionID;
    //console.log(this.produtosFilhos.heightDimensionId.dimensionID);
    if (this.produtosFilhos.heightDimensionId.type == 1) {
      this.createitemchildService.getDimensionDiscret(heightId)
        .subscribe(height => { this.heigthDiscret = height; console.log(this.heigthDiscret) });
    } else {
      this.createitemchildService.getDimensionContinuous(heightId)
        .subscribe(height => { this.heightContinuous = height; console.log(this.heightContinuous) });
    }
    if (this.produtosFilhos.widthDimensionId.type == 1) {
      this.createitemchildService.getDimensionDiscret(widthId)
        .subscribe(width => { this.widthDiscret = width; console.log(this.widthDiscret) });
    } else {
      this.createitemchildService.getDimensionContinuous(widthId)
        .subscribe(width => { this.widthContinuous = width; console.log(this.widthContinuous) });
    }
    if (this.produtosFilhos.lengthDimensionId.type == 1) {
      this.createitemchildService.getDimensionDiscret(lengthId)
        .subscribe(length => { this.lengthDiscret = length; console.log(this.lengthDiscret) });
    } else {
      this.createitemchildService.getDimensionContinuous(lengthId)
        .subscribe(length => { this.lengthContinuous = length; console.log(this.widthContinuous) });
    }
  }

  checkWidthC(value: number, max: number, min: number): void {
    this.widCValue = this.createitemchildService.checkDimensionC(value, max, min);
    //this.widCValue = this.createitemproductService.checkDimensionC(value, max, min);
    this.item.width = this.widCValue;
  }
  checkHeightC(value: number, max: number, min: number): void {
    this.heiCValue = this.createitemchildService.checkDimensionC(value, max, min);
    this.item.height = this.heiCValue;
  }
  checkLengthC(value: number, max: number, min: number): void {
    this.lenCValue = this.createitemchildService.checkDimensionC(value, max, min);
    this.item.length = this.lenCValue;
  }

  finalWidth(wid: number): void {
    this.item.width = this.createitemchildService.finalDimension(wid);//this.createitemproductService.finalDimension(wid);
  }
  finalHeight(hei: number): void {
    this.item.height = this.createitemchildService.finalDimension(hei);
  }
  finalLength(len: number): void {
    this.item.length = this.createitemchildService.finalDimension(len);
  }
  submit(): void {
    if (this.createitemchildService.checkValuesIntegrity(this.item)) {
      console.log(this.item);
      this.createitemchildService.createItem(this.item)
        .subscribe(message => {
          console.log(message);
          if (message.status == 201) {
            console.log(message.body);
            this.itemId = message.body.substr(message.body.indexOf(':\"') + 2, message.body.indexOf('\",') - 8);
          } else {
            console.log(message)
            console.log(message.error);
            this.requestMessage = message.error;
            this.errorRequest = true;
          }
        });

    } else {
      this.wrong = true;
    }
  }
}
