export enum ProfileMenuActions {
  LOGOUT = 'LOGOUT',
  SUPPORT = 'SUPPORT',
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
    label: 'Información del perfil',
    description: 'Edita tu foto o información',
    icon: 'user',
    route: '/profile/information',
    isLoggedGuard: true,
  },
  {
    label: 'Colecciones',
    description: 'Añadir o Editar colecciones',
    icon: 'collections',
    route: '/profile/collection',
    isLoggedGuard: true,
  },
  {
    label: 'Mis posts',
    description: 'Post que tú has creado',
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
    label: 'Salir',
    icon: 'logout',
    action: ProfileMenuActions.LOGOUT,
    hideDetails: true,
    isLoggedGuard: true,
  },
  {
    label: 'Acceder o Registrarse',
    icon: 'logout',
    route: '/auth',
    hideDetails: true,
    isLoggedGuard: false,
  },
];

export const profileInformationMenu: ProfileMenuItem[] = [
  // Uncomment when we have more translations available
  //{
  //   label: 'Language',
  //   icon: 'language',
  //   route: '/profile/select-language',
  // },
  {
    label: 'Ayuda y soporte',
    description: 'Documentación, reportar un bug.',
    icon: 'question',
    action: ProfileMenuActions.SUPPORT,
  },
  {
    label: 'Términos y Condiciones',
    icon: 'info-rounded',
    route: '/terms-and-conditions',
  },
  {
    label: 'Política de Privacidad',
    icon: 'info-shield',
    route: '/privacy-policy',
  },
];
