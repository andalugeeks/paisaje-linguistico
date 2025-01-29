import { appMessages } from '@constants';
import { LocalStorageManager } from '@helpers';

export const fieldAppMessages = (tag: string): string => {
  return appMessages[tag][LocalStorageManager.getStoredSpellingProposalId()];
  // return appMessages[tag][localStorage.getItem('spellingProposal') ?? 'pao']; // [GlobalService.globalVariable];
};
