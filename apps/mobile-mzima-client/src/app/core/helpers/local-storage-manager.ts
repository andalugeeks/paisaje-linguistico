export class LocalStorageManager {
  public static globalVariable: string = '';
  public static lsSpellingProposal: string = 'spellingProposal';

  public static setStoredSpellingProposalId(spelling_proposal: string | null) {
    localStorage.setItem('spellingProposal', spelling_proposal ?? 'cas');
  }

  public static getStoredSpellingProposalId(): string {
    return localStorage.getItem('spellingProposal') ?? 'cas';
  }
}
