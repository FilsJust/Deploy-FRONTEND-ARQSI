import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Encomenda } from '../Model/encomenda';
import { EncomendaService } from '../Services/encomenda.service';
import { Produto } from '../Model/produto';

import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { ItemEFilhos } from '../Model/ItemEFilhos';
import { Item } from '../Model/item';

export class Items {
  children: BehaviorSubject<Items[]>;
  category: string;
  material: string;
  finishing: string;
  height: number;
  width: number;
  length: number;
  constructor(public _id: string, public fatherId: string, public name: string, category: string, material: string, finishing: string, height: number, width: number, length: number,
    children?: Items[], public parent?: Items) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
    this.category = category;
    this.material = material;
    this.finishing = finishing;
    this.height = height;
    this.width = width;
    this.length = length;
    this._id = _id;
    this.fatherId = fatherId;
  }
}

@Component({
  selector: 'app-encomenda',
  templateUrl: './encomenda.component.html',
  styleUrls: ['../../../css/bootstrap.css', './encomenda.component.css']
})
export class EncomendaComponent implements OnInit {
  items: ItemEFilhos[];
  allItems: Item[];
  recursive: boolean = false;
  levels = new Map<Items, number>();
  treeControl: NestedTreeControl<Items>;
  itemsx: Items[];


  dataSource: MatTreeNestedDataSource<Items>;


  produtos: Produto[];
  encomendas: Encomenda[];

  constructor(private encomendaService: EncomendaService, private changeDetectorRef: ChangeDetectorRef) {
    this.itemsx = new Array();
    this.treeControl = new NestedTreeControl<Items>(this.getChildren);
    this.dataSource = new MatTreeNestedDataSource();
    this.items = new Array();
    /* for(var i=0; i<itemss.length;i++){
      this.itemsx.push(this.buildTreeData(i));
    } */
    //this.dataSource.data = this.itemsx;
    this.encomendaService.getAllItems().subscribe(
      items => {
        console.log("Items");
        console.log("items " + items.length);
        for (var x = 0; x < items.length; x++) {
          console.log(items[x]._id);
          this.encomendaService.getItems(items[x]._id).subscribe(
            tree => {
              console.log(tree);
              this.items.push(tree);
              console.log(this.items[x]);
              this.itemsx.push(this.buildTreeData(tree))
              this.dataSource.data = this.itemsx;
            }
          );
        }
        //this.dataSource.data = this.itemsx;
      }
    )
    /* this.items = new Array();
    this.itemsx = new Array();
    this.encomendaService.getAllItems().subscribe(
      items => {
        this.allItems = items;
        for (var x = 0; x < this.allItems.length; x++) {
          this.encomendaService.getItems(this.allItems[x]._id).subscribe(
            item => {
              this.items.push(item);
            }
          )
        }
        
        this.treeControl = new NestedTreeControl<Items>(this.getChildren);
        this.dataSource = new MatTreeNestedDataSource();
        for (var i = 0; i < this.items.length; i++) {
          this.itemsx.push(this.buildTreeData(i));
        }
        this.dataSource.data = this.itemsx;
        console.log(this.dataSource.data)
      }
    ); */

    /* this.encomendaService.getItems()
    .subscribe(item => {
      this.items = item;
      this.treeControl = new NestedTreeControl<Item>(this.getChildren);
      this.dataSource = new MatTreeNestedDataSource();

      this.dataSource.data = this.buildTreeData();
    }); */


  }

  ngOnInit() {
    this.getEncomendas();
    this.getProdutos();
  }

  getEncomendas(): void {
    this.encomendaService.getEncomendas()
      .subscribe(encomenda => this.encomendas = encomenda);
  }
  getProdutos(): void {
    this.encomendaService.getProducts()
      .subscribe(produto => this.produtos = produto);
  }

  buildTreeData(treev: ItemEFilhos): Items {
    let tree = new Items(treev.id, treev.fatherId, treev.name, treev.category, treev.material, treev.finishing, treev.height, treev.width, treev.length, []);
    let tree1 = this.getSons(treev.sons, tree);
    return tree1;
  }

  getSons(filhos, tree: Items) {
    for (var i = 0; i < filhos.length; i++) {
      var element = filhos[i];
      var tree1 = new Items(element._id, element.fatherId, element.name, element.category, element.material, element.finishing, element.height, element.width, element.length, []);
      var tree2 = this.getSons(filhos[i].sons, tree1);
      tree.children.value.push(tree2);
      console.log(tree.children);
    }
    return tree;
  }
  getChildren = (node: Items) => {
    return node.children;
  };

  hasChildren = (index: number, node: Items) => {
    return node.children.value.length > 0;
  }
  nodeChosen(id: string){
    console.log(id);
  }
}
