import i18n from 'i18n-js';

import en from './translations/en.json';
import it from './translations/it.json';

i18n.locale = 'it';
i18n.fallbacks = true;
i18n.translations = { en, it };

export default i18n;

// usage import i18n
// {i18n.t('profile.logout_modal.title')}