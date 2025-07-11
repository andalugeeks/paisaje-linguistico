import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SelectSpellingProposalPage } from './select-spelling-proposal.page';

describe('PrivacyPolicyPage', () => {
  let component: SelectSpellingProposalPage;
  let fixture: ComponentFixture<SelectSpellingProposalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSpellingProposalPage, IonicModule],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSpellingProposalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
