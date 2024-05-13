import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuckydipPage } from './luckydip.page';

const routes: Routes = [
  {
    path: '',
    component: LuckydipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuckydipPageRoutingModule {}
