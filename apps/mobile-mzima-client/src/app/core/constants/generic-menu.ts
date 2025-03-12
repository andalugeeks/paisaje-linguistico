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
      nota: 'Azoziazión ZEA',
      epa: 'Açoçiaçión ZEA',
      cas: 'Asociación ZEA',
    },
    description: {
      pao: `Encuentra mah informazión arreô'e l'asoziazión ZEA i la labô que yeba a cabo n'el ehtudio'e l'andalú.`,
      nota: `Enkuentra mah informazión arreó'e l'azoziazión ZEA i la labó ke yeba a kabo en el ehtudio'el andalú.`,
      epa: 'Encuentra mâh informaçión açerca de la açoçiaçión ZEA y la labôh que deçempeña en el êttudio del andalûh.',
      cas: 'Encuentra más información acerca de la asociación ZEA y la labor que desempeña en el estudio del andaluz.',
    },
    icon: 'info-rounded',
    url: 'https://zea-andalu.org/',
    isLoggedGuard: false,
  },
  {
    label: {
      pao: 'Proyehto PAO',
      nota: 'Proyehto PAO',
      epa: 'Proyêtto PAO',
      cas: 'Proyecto PAO',
    },
    description: {
      pao: `Encuentra mah informazión arreô'er Proyehto PAO i la propuehta PAO-Unificá.`,
      nota: `Enkuentra mah informazión arreó'er Proyehto PAO i la propuehta PAO-Unifiká.`,
      epa: 'Encuentra mâh informaçión açerca der Proyêtto PAO y la propuêtta PAO-Unificá.',
      cas: 'Encuentra más información acerca del Proyecto PAO y la propuesta PAO-Unificada.',
    },
    icon: 'info-rounded',
    url: 'https://pao-andalu.com/',
    isLoggedGuard: false,
  },
  {
    label: {
      pao: 'NOTA-Porrah',
      nota: 'NOTA-Porrah',
      epa: 'NOTA-Porrah',
      cas: 'NOTA-Porrah',
    },
    description: {
      pao: `Encuentra mah informazión arreô'e la propuehta NOTA-Porrah.`,
      nota: `Enkuentra mah informazión arreó'e la propuehta NOTA-Porrah.`,
      epa: 'Encuentra mâh informaçión açerca de la propuêtta NOTA-Porra.',
      cas: 'Encuentra más información acerca de la propuesta NOTA-Porrah.',
    },
    icon: 'info-rounded',
    url: 'https://notaporrah.wordpress.com/about/la-ortografia-del-andalu-nota-porrah/',
    isLoggedGuard: false,
  },
  {
    label: {
      pao: 'AndaluGeeks',
      nota: 'AndaluGeeks',
      epa: 'AndaluGeeks',
      cas: 'AndaluGeeks',
    },
    description: {
      pao: `Encuentra mah informazión arreô'er colehtibo AndaluGeeks i la propuehta EPA.`,
      nota: `Enkuentra mah informazión arreó'er kolehtibo AndaluGeeks i la propuehta EPA.`,
      epa: 'Encuentra mâh informaçión açerca der colêttibo AndaluHeeks y la propuêtta EPA.',
      cas: 'Encuentra más información acerca del colectivo AndaluGeeks y la propuesta EPA.',
    },
    icon: 'info-rounded',
    url: 'https://andaluh.es/',
    isLoggedGuard: false,
  },
];
