import { Component, OnInit } from '@angular/core';
import { ProdutosFilhos } from '../Model/produtosfilhos';
import { Finishing } from '../Model/Finishing';
import { Discret } from '../Model/Discret';
import { Continuous } from '../Model/Continuous';
import { CreateItemChild } from '../Model/CreateItemChild';
import { ActivatedRoute } from '@angular/router';
import { EditItemchildService } from '../Services/edit-itemchild.service';
import { Item } from '../Model/item';

@Component({
  selector: 'app-edit-itemchild',
  templateUrl: './edit-itemchild.component.html',
  styleUrls: ['./edit-itemchild.component.css', '../../../css/bootstrap.css']
})
export class EditItemchildComponent implements OnInit {

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
  requestMessage: string;

  item: CreateItemChild;
  itemPaiId: string;
  itemId: string;


  constructor(private route: ActivatedRoute,
    private edititemchildService: EditItemchildService) { }

  ngOnInit() {
    this.wrong = false;
    this.itemUpdatedSuccessfully = false;
    this.errorRequest = false;
    this.getProduto();
    this.item = new CreateItemChild;
    const idItemFilho = this.route.snapshot.paramMap.get('idFilho');
    this.item._id = idItemFilho;
  }
  getProduto(): void {
    const idItemFilho = this.route.snapshot.paramMap.get('idFilho');
    this.itemPaiId = this.route.snapshot.paramMap.get('idPai');
    console.log(idItemFilho);
    console.log(this.itemPaiId);
    this.edititemchildService.getChildItem(idItemFilho).subscribe(
      itemFilho => {
        this.edititemchildService.getProduct(itemFilho.body.productId)
          .subscribe(produto => {
            this.produtosFilhos = produto; this.defineSizesPossibilities();

            this.item.productId = this.produtosFilhos.productID; this.item.fatherId = this.itemPaiId; this.item.category = this.produtosFilhos.category.categoryID;
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
    return this.edititemchildService.getFinishingIndexFromMaterialList(materialID, this.produtosFilhos);
    //return this.createitemproductService.getFinishingIndexFromMaterialList(materialID, this.produtosFilhos);
  }

  defineSizesPossibilities(): void {
    var heightId = this.produtosFilhos.heightDimensionId.dimensionID;
    var widthId = this.produtosFilhos.widthDimensionId.dimensionID;
    var lengthId = this.produtosFilhos.lengthDimensionId.dimensionID;
    //console.log(this.produtosFilhos.heightDimensionId.dimensionID);
    if (this.produtosFilhos.heightDimensionId.type == 1) {
      this.edititemchildService.getDimensionDiscret(heightId)
        .subscribe(height => { this.heigthDiscret = height; console.log(this.heigthDiscret) });
    } else {
      this.edititemchildService.getDimensionContinuous(heightId)
        .subscribe(height => { this.heightContinuous = height; console.log(this.heightContinuous) });
    }
    if (this.produtosFilhos.widthDimensionId.type == 1) {
      this.edititemchildService.getDimensionDiscret(widthId)
        .subscribe(width => { this.widthDiscret = width; console.log(this.widthDiscret) });
    } else {
      this.edititemchildService.getDimensionContinuous(widthId)
        .subscribe(width => { this.widthContinuous = width; console.log(this.widthContinuous) });
    }
    if (this.produtosFilhos.lengthDimensionId.type == 1) {
      this.edititemchildService.getDimensionDiscret(lengthId)
        .subscribe(length => { this.lengthDiscret = length; console.log(this.lengthDiscret) });
    } else {
      this.edititemchildService.getDimensionContinuous(lengthId)
        .subscribe(length => { this.lengthContinuous = length; console.log(this.widthContinuous) });
    }
  }

  checkWidthC(value: number, max: number, min: number): void {
    this.widCValue = this.edititemchildService.checkDimensionC(value, max, min);
    //this.widCValue = this.createitemproductService.checkDimensionC(value, max, min);
    this.item.width = this.widCValue;
  }
  checkHeightC(value: number, max: number, min: number): void {
    this.heiCValue = this.edititemchildService.checkDimensionC(value, max, min);
    this.item.height = this.heiCValue;
  }
  checkLengthC(value: number, max: number, min: number): void {
    this.lenCValue = this.edititemchildService.checkDimensionC(value, max, min);
    this.item.length = this.lenCValue;
  }

  finalWidth(wid: number): void {
    this.item.width = this.edititemchildService.finalDimension(wid);//this.createitemproductService.finalDimension(wid);
  }
  finalHeight(hei: number): void {
    this.item.height = this.edititemchildService.finalDimension(hei);
  }
  finalLength(len: number): void {
    this.item.length = this.edititemchildService.finalDimension(len);
  }

  submit(): void {
    if (this.edititemchildService.checkValuesIntegrity(this.item)) {
      console.log(this.item);
      this.edititemchildService.updateChild(this.item)
        .subscribe(message => {
          console.log(message);
          if (message.status == 200) {
            console.log(message);
            this.itemUpdatedSuccessfully = true;
            this.errorRequest = false;
            //this.itemId = message.body.substr(message.body.indexOf(':\"') + 2, message.body.indexOf('\",') - 8);
          } else {
            console.log(message)
            console.log(message.error);
            this.requestMessage = message.error;
            this.errorRequest = true;
            this.itemUpdatedSuccessfully = false;
          }
        });

    } else {
      this.wrong = true;
    }
  }

}
