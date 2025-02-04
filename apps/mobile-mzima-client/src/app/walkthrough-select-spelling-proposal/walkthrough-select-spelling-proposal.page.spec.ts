import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { WalkthroughSelectSpellingProposalPage } from './walkthrough-select-spelling-proposal.page';

describe('PrivacyPolicyPage', () => {
  let component: WalkthroughSelectSpellingProposalPage;
  let fixture: ComponentFixture<WalkthroughSelectSpellingProposalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalkthroughSelectSpellingProposalPage, IonicModule],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkthroughSelectSpellingProposalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
