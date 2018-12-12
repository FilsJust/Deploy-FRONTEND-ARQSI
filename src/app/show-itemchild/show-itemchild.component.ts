import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ShowItemchildService } from '../Services/show-itemchild.service';
import { Item } from '../Model/item';
import { ProdutosFilhos } from '../Model/produtosfilhos';

@Component({
  selector: 'app-show-itemchild',
  templateUrl: './show-itemchild.component.html',
  styleUrls: ['./show-itemchild.component.css', '../../../css/bootstrap.css']
})
export class ShowItemchildComponent implements OnInit, OnDestroy {

  item: Item;
  produto: ProdutosFilhos[];
  nomeProdutoPai: string;
  idItemPai: string;
  aggregationItems: Item[];
  constructor(private route: ActivatedRoute,
    private showitemchildService: ShowItemchildService) { }

  ngOnInit() {
    this.getChildItems();
    this.getAggregations();
  }
  
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  getChildItems(): void {
    this.idItemPai = this.route.snapshot.paramMap.get('id');
    console.log(this.idItemPai);
    this.showitemchildService.getItem(this.idItemPai).subscribe(item => {
      this.item = item.body; console.log(item); console.log(this.item);
      if (item.status == 200) {
        this.showitemchildService.getChildren(this.item.productId).subscribe(
          produto => { this.produto = produto.productSons; this.nomeProdutoPai = produto.name; console.log(this.produto) }
        );
      }
    });
  }

  getAggregations(): void {
    this.idItemPai = this.route.snapshot.paramMap.get('id');
    this.showitemchildService.getAggregations(this.idItemPai).subscribe(
      items => {this.aggregationItems = items;}
    );
  }

  delete(id: string): void {
    console.log("delete "+id);
    this.showitemchildService.delete(id).subscribe(
      message => {
        console.log(message);
        if (message.status == 200) {
          console.log(message.body);
          this.getAggregations();
        } else {
          console.log(message)
          console.log(message.error);
          
        }
      }
    );
  }
}
