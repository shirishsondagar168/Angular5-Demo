import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudOperationComponent } from './crud-operation/crud-operation.component';

const routes: Routes = [ { path: '', component: CrudOperationComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
