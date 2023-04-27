import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';

const routes: Routes = [
  {path:'',redirectTo:'parent',pathMatch:'full'},
  {path:'child',component:ChildComponent},
  {path:'parent',component:ParentComponent},
  {path:'**',redirectTo:'parent',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
