export enum GenericMenuActions {
  LOGOUT = 'LOGOUT',
  SUPPORT = 'SUPPORT',
  // RESET_DATA = 'RESET_DATA',
  // CLEAR_PENDING_POSTS = 'CLEAR_PENDING_POSTS',
}

export interface GenericMenuItem {
  label: { [key: string]: string };
  description: { [key: string]: string };
  icon: string;
  url?: string;
  route?: string;
  action?: GenericMenuActions;
  hideDetails?: boolean;
  isLoggedGuard?: boolean;
  disabled?: boolean;
}

export const aboutUsMenu: GenericMenuItem[] = [
  {
    label: {
      pao: 'Asoziazión ZEA',
      nota: '¿?',
      epa: '¿?',
      cas: 'Asociación ZEA',
    },
    description: {
      pao: "Encuentra mah informazión arreô'e l'asoziazión ZEA i la labô que yeba a cabo n'el ehtudio'e l'andalú.",
      nota: '¿?',
      epa: '¿?',
      cas: 'Encuentra más información acerca de la asociación ZEA y la labor que desempeña en el estudio del andaluz.',
    },
    icon: 'info-rounded',
    url: 'https://zea-andalu.org/',
    isLoggedGuard: false,
  },
  {
    label: {
      pao: 'Proyehto PAO',
      nota: '¿?',
      epa: '¿?',
      cas: 'Proyecto PAO',
    },
    description: {
      pao: "Encuentra mah informazión arreô'er Proyehto PAO i la propuehta PAO-Unificá.",
      nota: '¿?',
      epa: '¿?',
      cas: 'Encuentra más información acerca del Proyecto PAO y la propuesta PAO-Unificada.',
    },
    icon: 'info-rounded',
    url: 'https://pao-andalu.com/',
    isLoggedGuard: false,
  },
  {
    label: {
      pao: 'NOTA-Porrah',
      nota: '¿?',
      epa: '¿?',
      cas: 'NOTA-Porrah',
    },
    description: {
      pao: "Encuentra mah informazión arreô'e la propuehta NOTA-Porrah.",
      nota: '¿?',
      epa: '¿?',
      cas: 'Encuentra más información acerca de la propuesta NOTA-Porrah.',
    },
    icon: 'info-rounded',
    url: 'https://notaporrah.wordpress.com/about/la-ortografia-del-andalu-nota-porrah/',
    isLoggedGuard: false,
  },
  {
    label: {
      pao: 'AndaluGeeks',
      nota: '¿?',
      epa: '¿?',
      cas: 'AndaluGeeks',
    },
    description: {
      pao: "Encuentra mah informazión arreô'er colehtibo AndaluGeeks i la propuehta EPA.",
      nota: '¿?',
      epa: '¿?',
      cas: 'Encuentra más información acerca del colectivo AndaluGeeks y la propuesta EPA.',
    },
    icon: 'info-rounded',
    url: 'https://andaluh.es/',
    isLoggedGuard: false,
  },
];
