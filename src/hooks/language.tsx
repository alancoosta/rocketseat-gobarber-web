import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
  useContext,
} from 'react';
import { IntlProvider } from 'react-intl';

import English from '../languages/en-US.json';
import Spanish from '../languages/es-MX.json';
import Portuguese from '../languages/pt-BR.json';

interface LanguageContextData {
  locale: string;
  selectLang: any;
}

const LanguageContext = createContext<LanguageContextData>(
  {} as LanguageContextData,
);

const LanguageProvider: React.FC = ({ children }) => {
  // Pegar o locale por padrao o valor que esta salvo no localStorage, "en-US", "es-MX" ou "pt-BR"
  const [locale, setLocale] = useState<string>(() => {
    const storagedLocale = localStorage.getItem('@react-intl: locale');

    if (storagedLocale) {
      return JSON.parse(storagedLocale);
    }
  });

  let lang;

  if (locale === 'en-US') {
    lang = English;
  } else if (locale === 'es-MX') {
    lang = Spanish;
  } else {
    lang = Portuguese;
  }

  const [messages, setMessages] = useState<any>(lang);

  useEffect(() => {
    localStorage.setItem('@react-intl: locale', JSON.stringify(locale));
  }, [locale]);

  const selectLang = useCallback((e) => {
    const newLocale = e.target.value;

    setLocale(newLocale);

    if (newLocale === 'en-US') {
      setMessages(English);
    } else if (newLocale === 'es-MX') {
      setMessages(Spanish);
    } else {
      setMessages(Portuguese);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, selectLang }}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

function useLanguage(): LanguageContextData {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('error in translate');
  }

  return context;
}

export { LanguageProvider, useLanguage };
