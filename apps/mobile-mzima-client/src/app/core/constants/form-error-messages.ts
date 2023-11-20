import { ErrorMessageMapping } from '@models';

export const formErrorMessages: ErrorMessageMapping = {
  name: {
    required: 'Se requiere un Nombre',
  },
  email: {
    required: 'Se require un Email',
    pattern: 'Formato de email no válido',
  },
  password: {
    required: 'Se requiere una Contraseña',
    minlength: 'La contraseña es muy corta',
    maxlength: 'La contraseña es muy larga',
  },
};
