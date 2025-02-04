import { ErrorMessageMapping } from '@models';

export const formErrorMessages: ErrorMessageMapping = {
  name: {
    required: 'Çe neçeçita un Nombre',
  },
  email: {
    required: 'Çe neçeçita un Email',
    pattern: 'Er formato de Email no êh bálido',
  },
  password: {
    required: 'Çe neçeçita una Contraçeña',
    minlength: 'La contraçeña êh mu corta',
    maxlength: 'La contraçeña êh mu larga',
  },
};
