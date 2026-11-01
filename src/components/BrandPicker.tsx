import React, { useState } from 'react';
import { BRANDS } from '../data/constants';
import { Search, Check, X } from 'lucide-react';

interface BrandPickerProps {
  initial: string[];
  onDismiss: () => void;
  onDone: (brands: string[]) => void;
}

export const BrandPicker: React.FC<BrandPickerProps> = ({ initial, onDismiss, onDone }) => {
  const [query, setQuery] = useState('');
  const [checked, setChecked] = useState<Set<string>>(new Set(initial));

  const toggleBrand = (brand: string) => {
    const updated = new Set(checked);
    if (updated.has(brand)) {
      updated.delete(brand);
    } else {
      updated.add(brand);
    }
    setChecked(updated);
  };

  const filtered = BRANDS.filter((brand) =>
    brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Target Brands</h2>
            <p className="text-xs text-slate-500">{checked.size} brand(s) selected</p>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brands"
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#165BB5] focus:ring-1 focus:ring-[#165BB5]"
            />
          </div>
        </div>

        {/* Brands List */}
        <div className="overflow-y-auto p-2 flex-1 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">
              No matching brands found
            </div>
          ) : (
            filtered.map((brand) => {
              const isSelected = checked.has(brand);
              return (
                <div
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 cursor-pointer rounded-lg transition-colors"
                >
                  <span className={`text-sm ${isSelected ? 'font-semibold text-[#165BB5]' : 'text-slate-700'}`}>
                    {brand}
                  </span>
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'bg-[#165BB5] border-[#165BB5] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
          <button
            onClick={onDismiss}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-lg transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={() => onDone(Array.from(checked))}
            className="px-5 py-2 text-sm font-bold text-white bg-[#165BB5] hover:bg-[#124993] rounded-lg transition-colors shadow-sm"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};
