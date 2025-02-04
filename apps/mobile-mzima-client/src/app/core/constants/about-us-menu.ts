export enum AboutUsMenuActions {
  LOGOUT = 'LOGOUT',
  SUPPORT = 'SUPPORT',
  // RESET_DATA = 'RESET_DATA',
  // CLEAR_PENDING_POSTS = 'CLEAR_PENDING_POSTS',
}

export interface AboutUsMenuItem {
  label: { [key: string]: string };
  description: { [key: string]: string };
  icon: string;
  route?: string;
  action?: AboutUsMenuActions;
  hideDetails?: boolean;
  isLoggedGuard?: boolean;
  disabled?: boolean;
}

export const aboutUsMenu: AboutUsMenuItem[] = [
  {
    label: {
      pao: 'Proyehto PAO',
      nota: '¿?',
      epa: '¿?',
      cas: 'Proyecto PAO',
    },
    description: {
      pao: "Encuentra mah informazión arreô'e la propuehta PAO-Unificá i er Proyehto PAO.",
      nota: '¿?',
      epa: '¿?',
      cas: 'Encuentra más información acerca de la propuesta PAO-Unificada y el Proyecto PAO.',
    },
    icon: 'user',
    route: '/profile/information',
    isLoggedGuard: false,
  },
];
