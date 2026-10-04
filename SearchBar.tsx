import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar({ className = '' }: { className?: string }) {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/shop?q=${encodeURIComponent(value.trim())}`);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-ink-200 bg-ink-50 text-sm focus:border-ink-900 focus:outline-none focus:bg-white transition-all"
      />
    </form>
  );
}
