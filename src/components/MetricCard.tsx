import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-2">
      <h3 className="text-slate-800 font-semibold text-base">{title}</h3>
      <div className="text-3xl font-bold text-[#165BB5] tracking-tight">{value}</div>
      <p className="text-xs text-slate-500 leading-relaxed">{subtitle}</p>
    </div>
  );
};
