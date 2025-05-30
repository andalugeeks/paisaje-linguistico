// <ARCHIVO_CON_TRADUCCIONES>
import { ErrorMessageMapping } from '@models';

export const formErrorMessages: ErrorMessageMapping = {
  name: {
    required: {
      pao: 'Se nezesita un Nombre',
      nota: 'Ze nehita un Nombre',
      epa: 'Çe neçeçita un Nombre',
      cas: 'Se necesita un Nombre',
    },
  },
  email: {
    required: {
      pao: 'Se nezesita un Email',
      nota: 'Ze nehita un Email',
      epa: 'Çe neçeçita un Email',
      cas: 'Se necesita un Email',
    },
    pattern: {
      pao: 'Er formato de Email no eh bálido',
      nota: `Er formato d'Email no zirbe`,
      epa: 'Er formato de Email no êh bálido',
      cas: 'El formato de Email no es válido',
    },
  },
  password: {
    required: {
      pao: 'Se nezesita una Contraseña',
      nota: 'Ze nehita una Kontrazeña',
      epa: 'Çe neçeçita una Contraçeña',
      cas: 'Se necesita una Contraseña',
    },
    minlength: {
      pao: 'La contraseña eh mu corta',
      nota: 'La kontraheña eh mu korta',
      epa: 'La contraçeña êh mu corta',
      cas: 'La contraseña es demasiado corta',
    },
    maxlength: {
      pao: 'La contraseña eh mu larga',
      nota: 'La kontraheña eh mu larga',
      epa: 'La contraçeña êh mu larga',
      cas: 'La contraseña es demasiado larga',
    },
  },
};
