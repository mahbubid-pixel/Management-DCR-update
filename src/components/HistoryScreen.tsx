import React from 'react';
import { DcrEntry } from '../types';
import { MetricCard } from './MetricCard';
import { Plus, Trash2, Calendar, Clock, MapPin, Tag } from 'lucide-react';

interface HistoryScreenProps {
  entries: DcrEntry[];
  onNewDcr: () => void;
  onDeleteEntry?: (index: number) => void;
  onClearAll?: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  entries,
  onNewDcr,
  onDeleteEntry,
  onClearAll,
}) => {
  // Newest first
  const reversed = entries.slice().reverse();

  return (
    <div className="p-4 flex flex-col gap-4 max-w-xl mx-auto pb-16">
      {/* Action Row */}
      <div className="flex items-center gap-2">
        <button
          onClick={onNewDcr}
          className="flex-1 py-3 px-4 bg-[#165BB5] hover:bg-[#124993] text-white font-bold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New DCR</span>
        </button>
        {entries.length > 0 && onClearAll && (
          <button
            onClick={() => {
              if (window.confirm('Delete all offline drafts?')) {
                onClearAll();
              }
            }}
            className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition-colors"
            title="Clear all drafts"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Empty State */}
      {entries.length === 0 && (
        <MetricCard
          title="No local drafts"
          value="0"
          subtitle="Create a preview DCR to see it here."
        />
      )}

      {/* Draft Cards List */}
      <div className="flex flex-col gap-3">
        {reversed.map((entry, idx) => {
          const originalIndex = entries.length - 1 - idx;
          return (
            <div
              key={entry.id || idx}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[#165BB5] font-bold text-base leading-tight">
                    {entry.doctor}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {entry.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {entry.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {entry.fme}
                    </span>
                  </div>
                </div>

                {onDeleteEntry && (
                  <button
                    onClick={() => onDeleteEntry(originalIndex)}
                    className="text-slate-300 hover:text-red-500 p-1 rounded-md transition-colors"
                    title="Delete draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Brands */}
              <div className="text-xs text-slate-700 flex items-start gap-1.5 pt-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-800">Brands:</strong>{' '}
                  {entry.brands && entry.brands.length > 0
                    ? entry.brands.join(', ')
                    : 'None'}
                </span>
              </div>

              {/* Comments & Observations */}
              {entry.comment && (
                <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700">Doctor comment:</span> {entry.comment}
                </div>
              )}

              {entry.observation && (
                <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700">Observation:</span> {entry.observation}
                </div>
              )}

              {/* Metadata chip */}
              <div className="pt-1 flex items-center justify-between">
                <span className="text-[10px] tracking-wider uppercase font-bold text-slate-400">
                  OFFLINE DRAFT • NOT SUBMITTED
                </span>
                {entry.priority && (
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-[#165BB5] font-semibold rounded-full">
                    Priority: {entry.priority}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
