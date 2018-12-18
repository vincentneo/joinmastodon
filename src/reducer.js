import {
  INSTANCES_FETCH_SUCCESS,
  LOCALE_CHANGE,
  FILTER_CATEGORY_CHANGE,
  FILTER_LANGUAGE_CHANGE,
} from './actions';

const supportedLocales = ['en', 'fr', 'pl', 'es', 'ja', 'ko', 'de','pt-BR', 'ar', 'tr'];

const initialLocale = () => {
  const lang = navigator.language.split('-')[0];

  if (supportedLocales.indexOf(lang) !== -1) {
    return lang;
  } else {
    return 'en';
  }
};

const initialState = {
  locale: initialLocale(),

  instances: [],

  filter: {
    category: '',
    language: '',
  },
};

const DUNBAR = Math.log(300);

const sortByDunbarsNumber = instances => instances.sort((a, b) => {
  const aa = Math.abs(DUNBAR - Math.log(a.active_users));
  const bb = Math.abs(DUNBAR - Math.log(b.active_users));

  return aa > bb ? 1 : (aa < bb ? -1 : 0);
});

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case LOCALE_CHANGE:
    return { ...state, locale: action.data };
  case INSTANCES_FETCH_SUCCESS:
    return { ...state, instances: sortByDunbarsNumber(action.data) };
  case FILTER_CATEGORY_CHANGE:
    return { ...state, filter: { ...state.filter, category: action.data } };
  case FILTER_LANGUAGE_CHANGE:
    return { ...state, filter: { ...state.filter, language: action.data } };
  default:
    return state;
  }
};
