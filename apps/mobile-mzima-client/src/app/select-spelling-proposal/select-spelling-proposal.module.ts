import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SortByFieldModule } from '@pipes';
import { SharedModule } from '@shared';
// import { GenericMenuItemComponent } from '@components';
import { SelectSpellingProposalPage } from './select-spelling-proposal.page';
import { SelectSpellingProposalPageRoutingModule } from './select-spelling-proposal-routing.module';

// const components = [GenericMenuItemComponent];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    TextFieldModule,
    TranslateModule,
    SortByFieldModule,
    SelectSpellingProposalPageRoutingModule,
  ],
  declarations: [SelectSpellingProposalPage], //, ...components],
})
export class SelectSpellingProposalPageModule {}

/*
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SelectSpellingProposalPage } from './select-spelling-proposal.page';
import { SelectSpellingProposalPageRoutingModule } from './select-spelling-proposal-routing.module';

@NgModule({
  imports: [SharedModule, SelectSpellingProposalPageRoutingModule],
  declarations: [SelectSpellingProposalPage],
})
export class SelectSpellingProposalPageModule {}
*/
