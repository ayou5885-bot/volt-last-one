import { useEffect, useRef, useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage, type Language } from '@/context/LanguageContext';

interface LanguageOption {
  code: Language;
  label: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-ink-200 bg-white text-xs font-semibold text-ink-900 uppercase tracking-wide transition-colors hover:border-ink-300 hover:bg-ink-50 focus:border-ink-900 focus:outline-none"
      >
        <Globe className="h-3.5 w-3.5 text-ink-500" />
        {language}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="listbox"
          aria-label="Language options"
          className="absolute right-0 mt-1.5 w-36 rounded-lg border border-ink-200 bg-white py-1 shadow-lg z-50"
        >
          {languageOptions.map((option) => {
            const isSelected = option.code === language;
            return (
              <button
                key={option.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.code)}
                className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-sm text-left transition-colors ${
                  isSelected
                    ? 'text-ink-900 font-semibold bg-ink-50'
                    : 'text-ink-700 hover:bg-ink-50'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-ink-900" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
