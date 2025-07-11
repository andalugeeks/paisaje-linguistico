// <ARCHIVO_CON_TRADUCCIONES>
import { ActionSheetButton } from '@ionic/angular';
import { PostStatus } from '@mzima-client/sdk';
import { LocalStorageManager } from '@helpers';

interface PostItemAction extends ActionSheetButton {
  guard: PostItemActionTypeUserRole[];
  status?: string;
}

export enum PostItemActionType {
  SHARE = 'SHARE',
  EDIT = 'EDIT',
  ADD_TO_COLLECTION = 'ADD_TO_COLLECTION',
  PUBLISH = 'PUBLISH',
  PUT_UNDER_REVIEW = 'PUT_UNDER_REVIEW',
  ARCHIVE = 'ARCHIVE',
  DELETE = 'DELETE',
}

export enum PostItemActionTypeUserRole {
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR',
  USER = 'USER',
}

/* export const postItemActions: PostItemAction[] = [
  {
    role: 'share',
    // text: 'Compartîh publicaçión',
    text: {
      pao: 'Compartî publicazión',
      nota: 'Kompartì publikazión',
      epa: 'Compartîh publicaçión',
      cas: 'Compartir publicación',
    },
    icon: '/assets/icon/share.svg',
    data: {
      action: PostItemActionType.SHARE,
    },
    guard: [],
  },
  {
    cssClass: 'separator',
    guard: [
      PostItemActionTypeUserRole.USER,
      PostItemActionTypeUserRole.ADMIN,
      PostItemActionTypeUserRole.AUTHOR,
    ],
  },
  {
    role: 'action',
    // text: 'Editâh publicaçión',
    text: {
      pao: 'Editâ publicazión',
      nota: 'Edità publikazión',
      epa: 'Editâh publicaçión',
      cas: 'Editar publicación',
    },
    icon: '/assets/icon/edit.svg',
    data: {
      action: PostItemActionType.EDIT,
    },
    guard: [PostItemActionTypeUserRole.ADMIN, PostItemActionTypeUserRole.AUTHOR],
  },
  {
    role: 'action',
    // text: 'Añadîh a una colêççión',
    text: {
      pao: 'Añedî a una colezión',
      nota: 'Añidì a una kolezión',
      epa: 'Añadîh a una colêççión',
      cas: 'Añadir a una colección',
    },
    icon: '/assets/icon/add-to-collection.svg',
    data: {
      action: PostItemActionType.ADD_TO_COLLECTION,
    },
    guard: [
      PostItemActionTypeUserRole.USER,
      PostItemActionTypeUserRole.ADMIN,
      PostItemActionTypeUserRole.AUTHOR,
    ],
  },
  {
    cssClass: 'separator',
    guard: [PostItemActionTypeUserRole.ADMIN, PostItemActionTypeUserRole.AUTHOR],
  },
  {
    role: 'status',
    status: 'published',
    // text: 'Publicâh',
    text: {
      pao: 'Publicâ',
      nota: 'Publikà',
      epa: 'Publicâh',
      cas: 'Publicar',
    },
    icon: '/assets/icon/publish.svg',
    data: {
      action: PostItemActionType.PUBLISH,
    },
    guard: [PostItemActionTypeUserRole.ADMIN],
  },
  {
    role: 'status',
    status: 'draft',
    // text: 'Ponêh baho rebiçión',
    text: {
      pao: `Ponê'n rebisión`,
      nota: `Poné en rebisión`,
      epa: `Ponêh baho rebiçión`,
      cas: `Poner bajo revisión`,
    },
    icon: '/assets/icon/put-under-review.svg',
    data: {
      action: PostItemActionType.PUT_UNDER_REVIEW,
    },
    guard: [PostItemActionTypeUserRole.ADMIN],
  },
  {
    role: 'status',
    status: 'archived',
    // text: 'Arxibâh',
    text: {
      pao: `Arxibâ`,
      nota: `Arxibà`,
      epa: `Arxibâh`,
      cas: `Archivar`,
    },
    icon: '/assets/icon/archive.svg',
    data: {
      action: PostItemActionType.ARCHIVE,
    },
    guard: [PostItemActionTypeUserRole.ADMIN],
  },
  {
    cssClass: 'separator',
    guard: [PostItemActionTypeUserRole.ADMIN],
  },
  {
    // text: 'Borrâh publicaçión',
    text: {
      pao: `Borrâ publicazión`,
      nota: `Borrà publikazión`,
      epa: `Borrâh publicaçión`,
      cas: `Borrar publicación`,
    },
    role: 'destructive',
    icon: '/assets/icon/delete.svg',
    data: {
      action: PostItemActionType.DELETE,
    },
    guard: [PostItemActionTypeUserRole.ADMIN, PostItemActionTypeUserRole.AUTHOR],
  },
  {
    // text: 'Cançelâh',
    text: {
      pao: `Canzelâ`,
      nota: `Kanzelà`,
      epa: `Cançelâh`,
      cas: `Cancelar`,
    },
    role: 'cancel',
    guard: [],
  },
]; */

// ******************************************************************************
// ******************************************************************************
// ******************************************************************************

export const getPostItemActionsList = (): PostItemAction[] => {
  return [
    {
      role: 'share',
      // text: 'Compartîh publicaçión',
      text:
        LocalStorageManager.getStoredSpellingProposalId() == 'pao'
          ? 'Compartî publicazión'
          : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
          ? 'Kompartì publikazión'
          : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
          ? 'Compartîh publicaçión'
          : 'Compartir publicación',
      icon: '/assets/icon/share.svg',
      data: {
        action: PostItemActionType.SHARE,
      },
      guard: [],
    },
    {
      cssClass: 'separator',
      guard: [
        PostItemActionTypeUserRole.USER,
        PostItemActionTypeUserRole.ADMIN,
        PostItemActionTypeUserRole.AUTHOR,
      ],
    },
    {
      role: 'action',
      // text: 'Editâh publicaçión',
      text:
        LocalStorageManager.getStoredSpellingProposalId() == 'pao'
          ? 'Editâ publicazión'
          : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
          ? 'Edità publikazión'
          : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
          ? 'Editâh publicaçión'
          : 'Editar publicación',
      icon: '/assets/icon/edit.svg',
      data: {
        action: PostItemActionType.EDIT,
      },
      guard: [PostItemActionTypeUserRole.ADMIN, PostItemActionTypeUserRole.AUTHOR],
    },
    {
      role: 'action',
      // text: 'Añadîh a una colêççión',
      text:
        LocalStorageManager.getStoredSpellingProposalId() == 'pao'
          ? 'Añedî a una colezión'
          : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
          ? 'Añidì a una kolezión'
          : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
          ? 'Añadîh a una colêççión'
          : 'Añadir a una colección',
      icon: '/assets/icon/add-to-collection.svg',
      data: {
        action: PostItemActionType.ADD_TO_COLLECTION,
      },
      guard: [
        PostItemActionTypeUserRole.USER,
        PostItemActionTypeUserRole.ADMIN,
        PostItemActionTypeUserRole.AUTHOR,
      ],
    },
    {
      cssClass: 'separator',
      guard: [PostItemActionTypeUserRole.ADMIN, PostItemActionTypeUserRole.AUTHOR],
    },
    {
      role: 'status',
      status: 'published',
      // text: 'Publicâh',
      text:
        LocalStorageManager.getStoredSpellingProposalId() == 'pao'
          ? 'Publicâ'
          : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
          ? 'Publikà'
          : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
          ? 'Publicâh'
          : 'Publicar',
      icon: '/assets/icon/publish.svg',
      data: {
        action: PostItemActionType.PUBLISH,
      },
      guard: [PostItemActionTypeUserRole.ADMIN],
    },
    {
      role: 'status',
      status: 'draft',
      // text: 'Ponêh baho rebiçión',
      text:
        LocalStorageManager.getStoredSpellingProposalId() == 'pao'
          ? `Ponê'n rebisión`
          : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
          ? `Poné en rebisión`
          : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
          ? `Ponêh baho rebiçión`
          : `Poner bajo revisión`,
      icon: '/assets/icon/put-under-review.svg',
      data: {
        action: PostItemActionType.PUT_UNDER_REVIEW,
      },
      guard: [PostItemActionTypeUserRole.ADMIN],
    },
    {
      role: 'status',
      status: 'archived',
      // text: 'Arxibâh',
      text:
        LocalStorageManager.getStoredSpellingProposalId() == 'pao'
          ? `Arxibâ`
          : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
          ? `Arxibà`
          : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
          ? `Arxibâh`
          : `Archivar`,
      icon: '/assets/icon/archive.svg',
      data: {
        action: PostItemActionType.ARCHIVE,
      },
      guard: [PostItemActionTypeUserRole.ADMIN],
    },
    {
      cssClass: 'separator',
      guard: [PostItemActionTypeUserRole.ADMIN],
    },
    {
      // text: 'Borrâh publicaçión',
      text:
        LocalStorageManager.getStoredSpellingProposalId() == 'pao'
          ? `Borrâ publicazión`
          : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
          ? `Borrà publikazión`
          : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
          ? `Borrâh publicaçión`
          : `Borrar publicación`,
      role: 'destructive',
      icon: '/assets/icon/delete.svg',
      data: {
        action: PostItemActionType.DELETE,
      },
      guard: [PostItemActionTypeUserRole.ADMIN, PostItemActionTypeUserRole.AUTHOR],
    },
    {
      // text: 'Cançelâh',
      text:
        LocalStorageManager.getStoredSpellingProposalId() == 'pao'
          ? `Canzelâ`
          : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
          ? `Kanzelà`
          : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
          ? `Cançelâh`
          : `Cancelar`,
      role: 'cancel',
      guard: [],
    },
  ];
};

// ******************************************************************************
// ******************************************************************************
// ******************************************************************************

export const getPostItemActions = (
  role?: PostItemActionTypeUserRole,
  currentStatus?: 'published' | 'draft' | 'archived',
): ActionSheetButton[] => {
  return getPostItemActionsList()
    .filter((postItemAction) =>
      role
        ? !postItemAction.guard.length || postItemAction.guard.indexOf(role) > -1
        : !postItemAction.guard.length,
    )
    .filter((action) => currentStatus !== action.status);
};

export const getPostStatusActions = (
  currentStatus?: 'published' | 'draft' | 'archived',
): ActionSheetButton[] => {
  return getPostItemActionsList()
    .filter(
      (postItemAction) => postItemAction.role === 'status' || postItemAction.role === 'cancel',
    )
    .filter((action) => currentStatus !== action.status);
};

export const postStatusChangedHeader = (): Record<PostStatus, string> => {
  return {
    [PostStatus.Published]:
      LocalStorageManager.getStoredSpellingProposalId() == 'pao'
        ? 'Publicando'
        : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
        ? 'Publikando'
        : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
        ? 'Publicando'
        : 'Publicando',
    [PostStatus.Draft]:
      LocalStorageManager.getStoredSpellingProposalId() == 'pao'
        ? 'Rebisando'
        : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
        ? 'Rebizando'
        : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
        ? 'Rebiçando'
        : 'Revisando',
    [PostStatus.Archived]:
      LocalStorageManager.getStoredSpellingProposalId() == 'pao'
        ? 'Arxibando'
        : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
        ? 'Arxibando'
        : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
        ? 'Arxibando'
        : 'Archivando',
  };
};

export const postStatusChangedMessage = (status: PostStatus, title: string): string => {
  const messages: Record<PostStatus, { [key: string]: string }> = {
    /* [PostStatus.Published]: `La publicaçión “${title}” çe a exo pública. Ara pué bêl-la to quîqqui.`,
    [PostStatus.Draft]: `La publicaçión “${title}” êttá baho rebiçión.`,
    [PostStatus.Archived]: `La publicaçión “${title}” fue arxibá.`, */
    [PostStatus.Published]: {
      pao: `La publicazión “${title}” s'a jexo pública. Ara pué bella tor mundo.`,
      nota: `La publikazión “${title}” z'a hexo públika. Ara pué bel-la tor mundo.`,
      epa: `La publicaçión “${title}” çe a exo pública. Ara pué bêl-la to quîqqui.`,
      cas: `La publicación “${title}” se ha hecho pública. Ahora puede verla todo el mundo.`,
    },
    [PostStatus.Draft]: {
      pao: `La publicazión “${title}” ehtá'n rebisión.`,
      nota: `La publikazión “${title}” ehtá en rebizión.`,
      epa: `La publicaçión “${title}” êttá baho rebiçión.`,
      cas: `La publicación “${title}” está bajo revisión.`,
    },
    [PostStatus.Archived]: {
      pao: `La publicazión “${title}” fue arxibá.`,
      nota: `La publikazión “${title}” fue arxibá.`,
      epa: `La publicaçión “${title}” fue arxibá.`,
      cas: `La publicación “${title}” fue archivada.`,
    },
  };
  return messages[status][LocalStorageManager.getStoredSpellingProposalId()];
};

/* export const postStatusChangedHeader: Record<PostStatus, string> = {
  [PostStatus.Published]: 'Publicando',
  [PostStatus.Draft]: 'Rebiçando',
  [PostStatus.Archived]: 'Arxibando',
  [PostStatus.Published]:
    LocalStorageManager.getStoredSpellingProposalId() == 'pao'
      ? 'Publicando'
      : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
      ? 'Publikando'
      : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
      ? 'Publicando'
      : 'Publicando',
  [PostStatus.Draft]:
    LocalStorageManager.getStoredSpellingProposalId() == 'pao'
      ? 'Rebisando'
      : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
      ? 'Rebizando'
      : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
      ? 'Rebiçando'
      : 'Revisando',
  [PostStatus.Archived]:
    LocalStorageManager.getStoredSpellingProposalId() == 'pao'
      ? 'Arxibando'
      : LocalStorageManager.getStoredSpellingProposalId() == 'nota'
      ? 'Arxibando'
      : LocalStorageManager.getStoredSpellingProposalId() == 'epa'
      ? 'Arxibando'
      : 'Archivando',
}; */
