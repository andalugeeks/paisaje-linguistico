import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectSpellingProposalPage } from './select-spelling-proposal.page';

const routes: Routes = [
  {
    path: '',
    component: SelectSpellingProposalPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SelectSpellingProposalPageRoutingModule {}
