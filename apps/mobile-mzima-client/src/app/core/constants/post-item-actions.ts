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
    text: 'Compartîh publicaçión',
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
    text: 'Editâh publicaçión',
    icon: '/assets/icon/edit.svg',
    data: {
      action: PostItemActionType.EDIT,
    },
    guard: [PostItemActionTypeUserRole.ADMIN, PostItemActionTypeUserRole.AUTHOR],
  },
  {
    role: 'action',
    text: 'Añadîh a una colêççión',
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
    text: 'Publicâh',
    icon: '/assets/icon/publish.svg',
    data: {
      action: PostItemActionType.PUBLISH,
    },
    guard: [PostItemActionTypeUserRole.ADMIN],
  },
  {
    role: 'status',
    status: 'draft',
    text: 'Ponêh baho rebiçión',
    icon: '/assets/icon/put-under-review.svg',
    data: {
      action: PostItemActionType.PUT_UNDER_REVIEW,
    },
    guard: [PostItemActionTypeUserRole.ADMIN],
  },
  {
    role: 'status',
    status: 'archived',
    text: 'Arxibâh',
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
    text: 'Borrâh publicaçión',
    role: 'destructive',
    icon: '/assets/icon/delete.svg',
    data: {
      action: PostItemActionType.DELETE,
    },
    guard: [PostItemActionTypeUserRole.ADMIN, PostItemActionTypeUserRole.AUTHOR],
  },
  {
    text: 'Cançelâh',
    role: 'cancel',
    guard: [],
  },
]; */

export const postItemActionsGenerator = (proposal: string): PostItemAction[] => {
  const postItemActions1: PostItemAction[] = [
    {
      role: 'share',
      text:
        proposal == 'pao'
          ? 'Compartî publicazión'
          : proposal == 'nota'
          ? '¿?'
          : proposal == 'epa'
          ? 'Compartîh publicaçión'
          : proposal == 'cas'
          ? 'Compartir publicación'
          : '¿?',
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
      text:
        proposal == 'pao'
          ? 'Editâ publicazión'
          : proposal == 'nota'
          ? '¿?'
          : proposal == 'epa'
          ? 'Editâh publicaçión'
          : proposal == 'cas'
          ? 'Editar publicación'
          : '¿?',
      icon: '/assets/icon/edit.svg',
      data: {
        action: PostItemActionType.EDIT,
      },
      guard: [PostItemActionTypeUserRole.ADMIN, PostItemActionTypeUserRole.AUTHOR],
    },
    {
      role: 'action',
      text:
        proposal == 'pao'
          ? 'Añedî a una colezión'
          : proposal == 'nota'
          ? '¿?'
          : proposal == 'epa'
          ? 'Añadîh a una colêççión'
          : proposal == 'cas'
          ? 'Añadir a una colección'
          : '¿?',
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
      text:
        proposal == 'pao'
          ? 'Publicâ'
          : proposal == 'nota'
          ? '¿?'
          : proposal == 'epa'
          ? 'Publicâh'
          : proposal == 'cas'
          ? 'Publicar'
          : '¿?',
      icon: '/assets/icon/publish.svg',
      data: {
        action: PostItemActionType.PUBLISH,
      },
      guard: [PostItemActionTypeUserRole.ADMIN],
    },
    {
      role: 'status',
      status: 'draft',
      text:
        proposal == 'pao'
          ? 'Mandâ a rebisión'
          : proposal == 'nota'
          ? '¿?'
          : proposal == 'epa'
          ? 'Ponêh baho rebiçión'
          : proposal == 'cas'
          ? 'Poner bajo revisión'
          : '¿?',
      icon: '/assets/icon/put-under-review.svg',
      data: {
        action: PostItemActionType.PUT_UNDER_REVIEW,
      },
      guard: [PostItemActionTypeUserRole.ADMIN],
    },
    {
      role: 'status',
      status: 'archived',
      text:
        proposal == 'pao'
          ? 'Arxibâ'
          : proposal == 'nota'
          ? '¿?'
          : proposal == 'epa'
          ? 'Arxibâh'
          : proposal == 'cas'
          ? 'Archivar'
          : '¿?',
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
      text:
        proposal == 'pao'
          ? 'Borrâ publicazión'
          : proposal == 'nota'
          ? '¿?'
          : proposal == 'epa'
          ? 'Borrâh publicaçión'
          : proposal == 'cas'
          ? 'Borrar publicación'
          : '¿?',
      role: 'destructive',
      icon: '/assets/icon/delete.svg',
      data: {
        action: PostItemActionType.DELETE,
      },
      guard: [PostItemActionTypeUserRole.ADMIN, PostItemActionTypeUserRole.AUTHOR],
    },
    {
      text:
        proposal == 'pao'
          ? 'Canzelâ'
          : proposal == 'nota'
          ? '¿?'
          : proposal == 'epa'
          ? 'Cançelâh'
          : proposal == 'cas'
          ? 'Cancelar'
          : '¿?',
      role: 'cancel',
      guard: [],
    },
  ];

  return postItemActions1;
};

export const getPostItemActions = (
  role?: PostItemActionTypeUserRole,
  currentStatus?: 'published' | 'draft' | 'archived',
): ActionSheetButton[] => {
  return postItemActionsGenerator(LocalStorageManager.getStoredSpellingProposalId())
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
  return postItemActionsGenerator(LocalStorageManager.getStoredSpellingProposalId())
    .filter(
      (postItemAction) => postItemAction.role === 'status' || postItemAction.role === 'cancel',
    )
    .filter((action) => currentStatus !== action.status);
};

export const postStatusChangedHeader: Record<PostStatus, { [key: string]: string }> = {
  [PostStatus.Published]: {
    pao: 'Publicando',
    nota: '¿?',
    epa: 'Publicando',
    cas: 'Publicando',
  },
  [PostStatus.Draft]: {
    pao: 'Rebisando',
    nota: '¿?',
    epa: 'Rebiçando',
    cas: 'Revisando',
  },
  [PostStatus.Archived]: {
    pao: 'Arxibando',
    nota: '¿?',
    epa: 'Arxibando',
    cas: 'Archivando',
  },
};

export const postStatusChangedMessage = (
  status: PostStatus,
  title: string,
  proposal: string,
): string => {
  const messages: Record<PostStatus, { [key: string]: string }> = {
    [PostStatus.Published]: {
      pao: `La publicazión “${title}” s'a jexo pública. Ara ehtá bisible pa tor mundo.`,
      nota: '¿?',
      epa: `La publicaçión “${title}” çe a exo pública. Ara pué bêl-la to quîqqui.`,
      cas: `La publicación “${title}” se ha hecho pública. Ahora se encuentra visible para todos los usuarios.`,
    },
    [PostStatus.Draft]: {
      pao: `La publicazión “${title}” ehtá'n rebisión.`,
      nota: '¿?',
      epa: `La publicaçión “${title}” êttá baho rebiçión.`,
      cas: `La publicación “${title}” está bajo revisión.`,
    },
    [PostStatus.Archived]: {
      pao: `La publicazión “${title}” fue arxibá.`,
      nota: '¿?',
      epa: `La publicaçión “${title}” fue arxibá.`,
      cas: `La publicación “${title}” fue archivada.`,
    },
  };
  return messages[status][proposal];
};
