import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
// import { genericMenu } from '@constants';
import { fieldAppMessages, LocalStorageManager } from '@helpers';
// import { SelectOptionInterface } from '@models';

@Component({
  selector: 'app-select-spelling-proposal',
  templateUrl: 'select-spelling-proposal.page.html',
  styleUrls: ['select-spelling-proposal.page.scss'],
})
export class SelectSpellingProposalPage {
  @Input() public postInput: any;
  public fieldAppMessages = fieldAppMessages;
  // public aboutUsMenu: genericMenu.GenericMenuItem[] = genericMenu.aboutUsMenu;
  public spellingProposalsListOptions: any[];
  public selectedSpelleingProposalOptionId: string | null;
  public selectedSurveyId: number | null;
  public postId: number;

  constructor(private location: Location) {
    this.selectedSurveyId = 2;

    this.spellingProposalsListOptions = [
      {
        label: 'Andalú PAO',
        value: 'pao',
      },
      {
        label: 'Andalú NOTA',
        value: 'nota',
      },
      {
        label: 'Andalûh EPA',
        value: 'epa',
      },
      {
        label: 'Castellano',
        value: 'cas',
      },
    ];
  }

  selectionCallback() {
    // GlobalService.globalVariable = this.selectedSpelleingProposalOptionId ?? 'pao';
    // localStorage.setItem('spellingProposal', this.selectedSpelleingProposalOptionId ?? 'pao');
    LocalStorageManager.setStoredSpellingProposalId(this.selectedSpelleingProposalOptionId);
  }

  public back(): void {
    this.location.back();
  }
}
