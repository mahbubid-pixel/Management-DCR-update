import React from 'react';
import { Page } from '../types';
import { BarChart3, FilePlus, History, ShieldAlert, Wifi, RefreshCw } from 'lucide-react';

interface HomeScreenProps {
  connected: boolean;
  onRefreshNetwork: () => void;
  onNavigate: (page: Page) => void;
  draftCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  connected,
  onRefreshNetwork,
  onNavigate,
  draftCount,
}) => {
  return (
    <div className="p-5 flex flex-col gap-4 max-w-xl mx-auto pb-12">
      {/* Title & Status */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Field Management</h1>
        <p className="text-xs text-slate-500 mt-1">
          Phase 5 • API contract gate; production integration disabled
        </p>
      </div>

      {/* Connectivity Banner */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="text-xs font-medium text-slate-700">
              Device network: <strong className={connected ? 'text-emerald-700' : 'text-amber-700'}>{connected ? 'available' : 'unavailable'}</strong>
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">
            Local Safe Mode
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-normal">
          Server connection: <span className="font-medium text-slate-600">not configured</span>. Offline draft storage is active.
        </p>
        <div>
          <button
            onClick={onRefreshNetwork}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#165BB5] text-[#165BB5] hover:bg-blue-50/50 rounded-lg text-xs font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh network status
          </button>
        </div>
      </div>

      {/* Navigation Tiles */}
      <div className="flex flex-col gap-3 mt-1">
        {/* Tile 1: Dashboard */}
        <button
          onClick={() => onNavigate('Dashboard')}
          className="w-full text-left bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#165BB5]/40 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[#165BB5] font-bold text-lg group-hover:translate-x-0.5 transition-transform">
              Dashboard
            </h2>
            <BarChart3 className="w-5 h-5 text-[#165BB5] opacity-75" />
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Weekly DCR performance and call vs plan
          </p>
        </button>

        {/* Tile 2: New Doctor Call Report */}
        <button
          onClick={() => onNavigate('Doctor Call Report')}
          className="w-full text-left bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#165BB5]/40 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[#165BB5] font-bold text-lg group-hover:translate-x-0.5 transition-transform">
              New Doctor Call Report
            </h2>
            <FilePlus className="w-5 h-5 text-[#165BB5] opacity-75" />
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Record a doctor visit offline draft
          </p>
        </button>

        {/* Tile 3: DCR History */}
        <button
          onClick={() => onNavigate('DCR History')}
          className="w-full text-left bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#165BB5]/40 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-[#165BB5] font-bold text-lg group-hover:translate-x-0.5 transition-transform">
                DCR History
              </h2>
              {draftCount > 0 && (
                <span className="px-2 py-0.5 bg-blue-100 text-[#165BB5] text-xs font-bold rounded-full">
                  {draftCount}
                </span>
              )}
            </div>
            <History className="w-5 h-5 text-[#165BB5] opacity-75" />
          </div>
          <p className="text-xs text-slate-600 mt-1">
            View drafts retained after app restart
          </p>
        </button>

        {/* Tile 4: API Inventory & Security Gate */}
        <button
          onClick={() => onNavigate('API Inventory')}
          className="w-full text-left bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#165BB5]/40 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[#165BB5] font-bold text-lg group-hover:translate-x-0.5 transition-transform">
              API Inventory & Staging Gate
            </h2>
            <ShieldAlert className="w-5 h-5 text-[#165BB5] opacity-75" />
          </div>
          <p className="text-xs text-slate-600 mt-1">
            DEX string recovery specs, endpoints, and safe submission contract
          </p>
        </button>
      </div>

      {/* Safety Notice */}
      <div className="mt-3 p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed">
        <strong>Phase 5 safety:</strong> login and server submission are disabled until staging verification. Do not enter real doctor data.
      </div>
    </div>
  );
};
