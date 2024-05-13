import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuckydipPageRoutingModule } from './luckydip-routing.module';

import { LuckydipPage } from './luckydip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuckydipPageRoutingModule
  ],
  declarations: [LuckydipPage]
})
export class LuckydipPageModule {}
