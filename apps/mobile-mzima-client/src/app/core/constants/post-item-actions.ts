import { ActionSheetButton } from '@ionic/angular';
import { PostStatus } from '@mzima-client/sdk';

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

export const postItemActions: PostItemAction[] = [
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
];

export const getPostItemActions = (
  role?: PostItemActionTypeUserRole,
  currentStatus?: 'published' | 'draft' | 'archived',
): ActionSheetButton[] => {
  return postItemActions
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
  return postItemActions
    .filter(
      (postItemAction) => postItemAction.role === 'status' || postItemAction.role === 'cancel',
    )
    .filter((action) => currentStatus !== action.status);
};

export const postStatusChangedHeader: Record<PostStatus, string> = {
  [PostStatus.Published]: 'Publicando',
  [PostStatus.Draft]: 'Rebiçando',
  [PostStatus.Archived]: 'Arxibando',
};

export const postStatusChangedMessage = (status: PostStatus, title: string): string => {
  const messages: Record<PostStatus, string> = {
    [PostStatus.Published]: `La publicaçión “${title}” çe a exo pública. Ara pué bêl-la to quîqqui.`,
    [PostStatus.Draft]: `La publicaçión “${title}” êttá baho rebiçión.`,
    [PostStatus.Archived]: `La publicaçión “${title}” fue arxibá.`,
  };
  return messages[status];
};
