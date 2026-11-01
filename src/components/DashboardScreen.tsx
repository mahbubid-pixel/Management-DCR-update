import React from 'react';
import { DcrEntry } from '../types';
import { MetricCard } from './MetricCard';

interface DashboardScreenProps {
  entries: DcrEntry[];
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ entries }) => {
  // Compute weekly activity matching the exact Android formula:
  // day = date.takeLast(2).toIntOrNull() -> ((day - 1) / 7 + 1).coerceAtMost(4) == week
  const weekly = [1, 2, 3, 4].map((week) => {
    const count = entries.filter((e) => {
      const dayStr = e.date ? e.date.slice(-2) : '';
      const day = parseInt(dayStr, 10);
      if (isNaN(day)) return false;
      const calculatedWeek = Math.min(Math.floor((day - 1) / 7) + 1, 4);
      return calculatedWeek === week;
    }).length;

    return { week, count };
  });

  return (
    <div className="p-4 flex flex-col gap-4 max-w-xl mx-auto pb-12">
      <h2 className="text-xl font-bold text-slate-800">DCR Call vs Plan</h2>

      {/* Total DCR Metric */}
      <MetricCard
        title="Total DCR (offline drafts)"
        value={entries.length.toString()}
        subtitle="Plan: unavailable • Completion %: unavailable"
      />

      {/* Weekly Activity Section */}
      <h3 className="text-base font-bold text-slate-800 mt-2">Weekly activity</h3>

      <div className="flex flex-col gap-3">
        {weekly.map(({ week, count }) => (
          <MetricCard
            key={week}
            title={`Week ${week}`}
            value={`${count} DCR`}
            subtitle="Plan and weekly percentage require backend data"
          />
        ))}
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mt-1">
        Week grouping is a provisional 1–7 / 8–14 / 15–21 / 22–end-of-month convention, not verified against the original system.
      </p>
    </div>
  );
};
