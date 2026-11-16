import { MODERATION_CONTACT_EMAIL } from './moderation';

export enum ProfileMenuActions {
  LOGOUT = 'LOGOUT',
  SUPPORT = 'SUPPORT',
  CONTACT = 'CONTACT',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  // RESET_DATA = 'RESET_DATA',
  // CLEAR_PENDING_POSTS = 'CLEAR_PENDING_POSTS',
}

export interface ProfileMenuItem {
  label: string;
  description?: string;
  icon: string;
  route?: string;
  action?: ProfileMenuActions;
  hideDetails?: boolean;
  isLoggedGuard?: boolean;
  disabled?: boolean;
}

export const profileMenu: ProfileMenuItem[] = [
  {
    label: 'Informaçión der perfîh',
    description: 'Edita tu afoto o informaçión',
    icon: 'user',
    route: '/profile/information',
    isLoggedGuard: true,
  },
  {
    label: 'Colêççionê',
    description: 'Añadîh o Editâh colêççionê',
    icon: 'collections',
    route: '/profile/collection',
    isLoggedGuard: true,
  },
  {
    label: 'Mî publicaçionê',
    description: 'Publicaçionê creâh por ti',
    icon: 'posts',
    route: '/profile/posts',
    isLoggedGuard: true,
  },
  // {
  //   label: 'Clear pending posts',
  //   icon: 'cloud',
  //   action: ProfileMenuActions.CLEAR_PENDING_POSTS,
  //   hideDetails: true,
  // },
  // {
  //   label: 'Reset App data',
  //   icon: 'reset',
  //   action: ProfileMenuActions.RESET_DATA,
  //   hideDetails: true,
  // },
  {
    label: 'Çalîh',
    icon: 'logout',
    action: ProfileMenuActions.LOGOUT,
    hideDetails: true,
    isLoggedGuard: true,
  },
  // Paisaje-Linguistico: App Store Review Guidelines 5.1.1(v) and 1.2
  {
    label: 'Borrâh mi cuenta',
    description: 'Elimina tu cuenta y tû datô',
    icon: 'delete',
    action: ProfileMenuActions.DELETE_ACCOUNT,
    isLoggedGuard: true,
  },
  {
    label: 'Aççedêh o Rehîttrarçe',
    icon: 'logout',
    route: '/auth',
    hideDetails: true,
    isLoggedGuard: false,
  },
  {
    label: 'Contâtto y çoporte',
    description: MODERATION_CONTACT_EMAIL,
    icon: 'email',
    action: ProfileMenuActions.CONTACT,
  },
];

export const profileInformationMenu: ProfileMenuItem[] = [
  // Paisaje-Linguistico personalisation.
  // Hide Ushahidi Intercom as support is provided by AndaluGeeks
  // {
  //   label: 'Ayuda y soporte',
  //   description: 'Documentación, reportar un bug.',
  //   icon: 'question',
  //   action: ProfileMenuActions.SUPPORT,
  // },
  {
    label: 'Términô y Condiçionê',
    icon: 'info-rounded',
    route: '/terms-and-conditions',
  },
  {
    label: 'Política de Pribaçiá',
    icon: 'info-shield',
    route: '/privacy-policy',
  },
];
