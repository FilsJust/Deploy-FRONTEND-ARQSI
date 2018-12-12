import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogoComponent } from './catalogo/catalogo.component';
import { EncomendaComponent } from './encomenda/encomenda.component';
import { CreateItemproductComponent } from './create-itemproduct/create-itemproduct.component';
import { CreateItemchildComponent } from './create-itemchild/create-itemchild.component';
import { ShowItemchildComponent } from './show-itemchild/show-itemchild.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { EditItemchildComponent } from './edit-itemchild/edit-itemchild.component';
import { EditItemFatherComponent } from './edit-item-father/edit-item-father.component';

//import { DashboardComponent }   from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'encomenda', component: EncomendaComponent },
  { path: 'encomenda/criarItem/:id', component: CreateItemproductComponent },
  { path: 'encomenda/criarFilho/:id', component: ShowItemchildComponent },
  { path: 'encomenda/criarFilho/:idPai/:idFilho', component: CreateItemchildComponent },
  { path: 'encomenda/editarFilho/:idPai/:idFilho', component: EditItemchildComponent},
  { path: 'encomenda/editarPai/:idPai', component: EditItemFatherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }