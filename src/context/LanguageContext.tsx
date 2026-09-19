import { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
  direction: 'rtl' | 'ltr';
  locale: string;
}

const STORAGE_KEY = 'volt-language';

const localeMap: Record<Language, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar-DZ',
};

function isValidLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'fr' || value === 'ar';
}

function getInitialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isValidLanguage(stored) ? stored : 'en';
}

function applyDocumentAttributes(language: Language) {
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    applyDocumentAttributes(language);
  }, [language]);

  const setLanguage = (next: Language) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLanguageState(next);
  };

  const isRTL = language === 'ar';
  const direction: 'rtl' | 'ltr' = isRTL ? 'rtl' : 'ltr';
  const locale = localeMap[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, direction, locale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
