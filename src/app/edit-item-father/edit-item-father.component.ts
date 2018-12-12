import { Component, OnInit } from '@angular/core';
import { ProdutosFilhos } from '../Model/produtosfilhos';
import { Finishing } from '../Model/Finishing';
import { Discret } from '../Model/Discret';
import { Continuous } from '../Model/Continuous';
import { CreateItem } from '../Model/CreateItem';
import { ActivatedRoute } from '@angular/router';
import { CreateItemproductService } from '../Services/create-itemproduct.service';
import { EditItemFatherService } from '../Services/edit-item-father.service';
import { CreateItemChild } from '../Model/CreateItemChild';

@Component({
  selector: 'app-edit-item-father',
  templateUrl: './edit-item-father.component.html',
  styleUrls: ['./edit-item-father.component.css', '../../../css/bootstrap.css']
})
export class EditItemFatherComponent implements OnInit {

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
  itemUpdatedSuccessfully: boolean;

  item: CreateItemChild;
  itemId: number;
  constructor(
    private route: ActivatedRoute,
    private edititemfatherService: EditItemFatherService) { }

  ngOnInit() {
    this.wrong = false;
    this.errorRequest = false;
    this.itemUpdatedSuccessfully = false;
    this.getProduto();
    this.item = new CreateItemChild;
    this.item._id = this.route.snapshot.paramMap.get('idPai');
  }
  getProduto(): void {
    const id = this.route.snapshot.paramMap.get('idPai');
    //this.edititemfatherService.getItem2(id);
    this.edititemfatherService.getItem(id).subscribe(item => {
      console.log(item.body.productId);
      this.edititemfatherService.getProduct(item.body.productId)
        .subscribe(produto => {
          this.produtosFilhos = produto; this.defineSizesPossibilities();
          this.item.productId = this.produtosFilhos.productID; this.item.category = this.produtosFilhos.category.categoryID;
        });
    }
    );
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
    return this.edititemfatherService.getFinishingIndexFromMaterialList(materialID, this.produtosFilhos);
  }
  defineSizesPossibilities(): void {
    var heightId = this.produtosFilhos.heightDimensionId.dimensionID;
    var widthId = this.produtosFilhos.widthDimensionId.dimensionID;
    var lengthId = this.produtosFilhos.lengthDimensionId.dimensionID;
    //console.log(this.produtosFilhos.heightDimensionId.dimensionID);
    if (this.produtosFilhos.heightDimensionId.type == 1) {
      this.edititemfatherService.getDimensionDiscret(heightId)
        .subscribe(height => { this.heigthDiscret = height; console.log(this.heigthDiscret) });
    } else {
      this.edititemfatherService.getDimensionContinuous(heightId)
        .subscribe(height => this.heightContinuous = height);
    }
    if (this.produtosFilhos.widthDimensionId.type == 1) {
      this.edititemfatherService.getDimensionDiscret(widthId)
        .subscribe(width => this.widthDiscret = width);
    } else {
      this.edititemfatherService.getDimensionContinuous(widthId)
        .subscribe(width => { this.widthContinuous = width; console.log(this.widthContinuous) });
    }
    if (this.produtosFilhos.lengthDimensionId.type == 1) {
      this.edititemfatherService.getDimensionDiscret(lengthId)
        .subscribe(length => this.lengthDiscret = length);
    } else {
      this.edititemfatherService.getDimensionContinuous(lengthId)
        .subscribe(length => this.lengthContinuous = length);
    }
  }

  checkWidthC(value: number, max: number, min: number): void {
    this.widCValue = this.edititemfatherService.checkDimensionC(value, max, min);
    this.item.width = this.widCValue;
  }
  checkHeightC(value: number, max: number, min: number): void {
    this.heiCValue = this.edititemfatherService.checkDimensionC(value, max, min);
    this.item.height = this.heiCValue;
  }
  checkLengthC(value: number, max: number, min: number): void {
    this.lenCValue = this.edititemfatherService.checkDimensionC(value, max, min);
    this.item.length = this.lenCValue;
  }
  submit(): void {
    console.log(this.item);
    if (this.edititemfatherService.checkValuesIntegrity(this.item)) {
      console.log(this.item);
      var x = this.edititemfatherService.editItem(this.item);
      x.subscribe(message => { 
        console.log(message.body); 
        if(message.status==200){
          console.log("Ok");
          this.itemUpdatedSuccessfully = true;
          this.errorRequest = false;
        }else{
          console.log("Not Ok");
          this.itemUpdatedSuccessfully = false;
          this.errorRequest = true;
        }
      });

    } else {
      this.wrong = true;
    } 
  } 
  finalWidth(wid: number): void {
    this.item.width = this.edititemfatherService.finalDimension(wid);
  }
  finalHeight(hei: number): void {
    this.item.height = this.edititemfatherService.finalDimension(hei);
  }
  finalLength(len: number): void {
    this.item.length = this.edititemfatherService.finalDimension(len);
  }

}
