// <ARCHIVO_CON_TRADUCCIONES>
export enum ProfileMenuActions {
  LOGOUT = 'LOGOUT',
  SUPPORT = 'SUPPORT',
  // RESET_DATA = 'RESET_DATA',
  // CLEAR_PENDING_POSTS = 'CLEAR_PENDING_POSTS',
}

export interface ProfileMenuItem {
  label: { [key: string]: string };
  description: { [key: string]: string };
  icon: string;
  route?: string;
  url?: string;
  action?: ProfileMenuActions;
  hideDetails?: boolean;
  isLoggedGuard?: boolean;
  disabled?: boolean;
}

export const profileMenu: ProfileMenuItem[] = [
  {
    label: {
      pao: 'Informazión der perfî',
      nota: 'Informasión der perfí',
      epa: 'Informaçión der perfîh',
      cas: 'Información del perfil',
    },
    description: {
      pao: 'Edita tu afoto o informazión',
      nota: 'Edita tu afoto u informasión',
      epa: 'Edita tu afoto o informaçión',
      cas: 'Edita tu foto o información',
    },
    icon: 'user',
    route: '/profile/information',
    isLoggedGuard: true,
  },
  {
    label: {
      pao: 'Propuehta ortográfica',
      nota: 'Propuehta ortográfika',
      epa: 'Propuêtta ortográfica',
      cas: 'Propuesta ortográfica',
    },
    description: {
      pao: "Elije la propuehta ortográfica andaluza que s'usará'n l'app. Tamién ehtá ihponible la lengua cahteyana.",
      nota: 'Ehkohe la matríh ortográfika andaluza ke ze ba manehà en la app. Tambié ehtá dihponible la lengua kahteyana',
      epa: 'Elihe la propuêtta ortográfica andaluça que çe uçará en la âpp. También êttá dîpponible la lengua câtteyana.',
      cas: 'Elige la propuesta ortográfica andaluza que se usará en la app. También está disponible la lengua castellana.',
    },
    icon: 'sources',
    route: '/select-spelling-proposal',
    isLoggedGuard: true,
  },
  {
    label: {
      pao: 'Colezioneh',
      nota: 'Kolezioneh',
      epa: 'Colêççionê',
      cas: 'Colecciones',
    },
    description: {
      pao: 'Añedî o Editâ colezioneh',
      nota: 'Añidì u Edità kolezioneh',
      epa: 'Añadîh o Editâh colêççionê',
      cas: 'Añadir o Editar colecciones',
    },
    icon: 'collections',
    route: '/profile/collection',
    isLoggedGuard: true,
  },
  {
    label: {
      pao: 'Mih publicazioneh',
      nota: 'Mih publikasioneh',
      epa: 'Mî publicaçionê',
      cas: 'Mis publicaciones',
    },
    description: {
      pao: 'Publicazioneh creáh por ti',
      nota: 'Publikasioneh apañáh por ti',
      epa: 'Publicaçionê creâh por ti',
      cas: 'Publicaciones creadas por ti',
    },
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
    label: {
      pao: 'Salî',
      nota: 'Zalì',
      epa: 'Çalîh',
      cas: 'Salir',
    },
    description: {},
    icon: 'logout',
    action: ProfileMenuActions.LOGOUT,
    hideDetails: true,
    isLoggedGuard: true,
  },
  {
    label: {
      pao: 'Azzedê o Rejihtrarse',
      nota: 'Ahsedè u Rehihtrarse',
      epa: 'Aççedêh o Rehîttrarçe',
      cas: 'Acceder o Registrarse',
    },
    description: {},
    icon: 'logout',
    route: '/auth',
    hideDetails: true,
    isLoggedGuard: false,
  },
];

export const aboutUsMenu: ProfileMenuItem[] = [
  {
    label: {
      pao: 'Asoziazión ZEA',
      nota: 'Asosiasión ZEA',
      epa: 'Açoçiaçión ÇEA',
      cas: 'Asociación ZEA',
    },
    description: {
      pao: "Informazión arreô'e la ZEA i su labô n'el ehtudio'e l'andalú.",
      nota: `Informasión arreó'e la ZEA i su briega en el ehtudio'el andalú.`,
      epa: 'Informaçión açerca de la ÇEA y çu labôh en el êttudio del andalûh.',
      cas: 'Información acerca de la ZEA y su labor en el estudio del andaluz.',
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
      pao: "Informazión arreô'er Proyehto PAO i la propuehta PAO-Unificá.",
      nota: `Informasión arreó'er Proyehto PAO i la propuehta PAO-Unifiká.`,
      epa: 'Informaçión açerca der Proyêtto PAO y la propuêtta PAO-Unificá.',
      cas: 'Información acerca del Proyecto PAO y la propuesta PAO-Unificada.',
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
      pao: "Informazión arreô'e la propuehta ortográfica NOTA-Porrah.",
      nota: `Informasión arreó'e la propuehta ortográfika NOTA-Porrah.`,
      epa: 'Informaçión açerca de la propuêtta ortográfica NOTA-Porra.',
      cas: 'Información acerca de la propuesta ortográfica NOTA-Porrah.',
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
      pao: "Informazión arreô'er colehtibo AndaluGeeks i la propuehta EPA.",
      nota: `Informasión arreó'er kolehtibo AndaluGeeks i la propuehta EPA.`,
      epa: 'Informaçión açerca der colêttibo AndaluGeeks y la propuêtta EPA.',
      cas: 'Información acerca del colectivo AndaluGeeks y la propuesta EPA.',
    },
    icon: 'info-rounded',
    url: 'https://andaluh.es/',
    isLoggedGuard: false,
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
    label: {
      pao: 'Términoh i Condizioneh [en ingléh]',
      nota: 'Términoh i Kondizioneh [en ingléh]',
      epa: 'Términô y Condiçionê [en inglê]',
      cas: 'Términos y condiciones [en inglés]',
    },
    description: {},
    icon: 'info-rounded',
    route: '/terms-and-conditions',
  },
  {
    label: {
      pao: "Política'e Pribazìá [en ingléh]",
      nota: `Polítika'e Pribasiá [en ingléh]`,
      epa: 'Política de Pribaçiá [en inglê]',
      cas: 'Política de Privacidad [en inglés]',
    },
    description: {},
    icon: 'info-shield',
    route: '/privacy-policy',
  },
];
