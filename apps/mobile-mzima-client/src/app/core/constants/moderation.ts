// Paisaje-Linguistico: content reporting, user blocking and account deletion
// (App Store Review Guidelines 1.2 and 5.1.1(v)). Texts transliterated to EPA with andaluh-py.

export const MODERATION_CONTACT_EMAIL = 'andalugeeks@gmail.com';

export const moderationTexts = {
  reportAction: 'Denunçiâh publicaçión',
  reportMessage:
    'Cuéntanô por qué êtta publicaçión no êh adecuá. La rebiçaremô en un plaço de 72 orâ.',
  reportConfirm: 'Denunçiâh',
  reportDone: 'Graçiâ. Emô reçibío tu denunçia y la rebiçaremô en un plaço de 72 orâ.',
  reasons: [
    { value: 'Lenguaje ofensivo', label: 'Lenguahe ofençibo' },
    { value: 'Acoso o insultos', label: 'Acoço o inçurtô' },
    { value: 'Información falsa', label: 'Informaçión farça' },
    { value: 'Spam o publicidad engañosa', label: 'Spam o publiçidá engañoça' },
    { value: 'Otro motivo', label: 'Otro motibo' },
  ],
  sendError: 'No çe a podío embiâh. Inténtalo de nuebo mâh tarde.',
  blockAction: 'Bloqueâh a êtte uçuario',
  blockHeader: '¿Bloqueâh a êtte uçuario?',
  blockMessage:
    'Deharâh de bêh çû publicaçionê en êtte dîppoçitibo y abiçaremô al equipo que modera la aplicaçión.',
  blockConfirm: 'Bloqueâh',
  blockDone: 'Uçuario bloqueao. Ya no berâh çû publicaçionê.',
  cancel: 'Cançelâh',
  deleteHeader: '¿Borrâh tu cuenta?',
  deleteMessage:
    'Borraremô tu cuenta y tû datô perçonalê en un plaço máççimo de 30 díâ y te abiçaremô por correo cuando êtté exo. No çe puede deçaçêh.',
  deleteKeepPosts: 'Conçerbâh mî publicaçionê çin mi nombre',
  deleteRemovePosts: 'Borrâh también mî publicaçionê',
  deleteConfirm: 'Borrâh mi cuenta',
  deleteDoneHeader: 'Çoliçitûh reçibida',
  deleteDone:
    'Borraremô tu cuenta en un plaço máççimo de 30 díâ y te abiçaremô por correo. Emô çerrao tu çeçión.',
};
