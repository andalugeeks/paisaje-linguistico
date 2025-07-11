import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalkthroughSelectSpellingProposalPage } from './walkthrough-select-spelling-proposal.page';

const routes: Routes = [
  {
    path: '',
    component: WalkthroughSelectSpellingProposalPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class WalkthroughSelectSpellingProposalPageRoutingModule {}
