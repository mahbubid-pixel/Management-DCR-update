import React from 'react';
import { API_INVENTORY } from '../data/constants';
import { ShieldCheck, ShieldAlert, Lock, Globe, Server, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ApiInventoryScreen: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-4 max-w-xl mx-auto pb-16">
      {/* Security Gate Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>ApiIntegrationGate: DISABLED</span>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          In Phase 5/7, explicit contract and authorization gates prevent unverified live network requests. No guessed HTTP requests or sensitive patient data are transmitted until staging verification.
        </p>
        <div className="bg-white/80 rounded-xl p-3 text-xs text-slate-700 flex flex-col gap-1 border border-amber-100">
          <div><strong>Host:</strong> <code className="text-[#165BB5]">{API_INVENTORY.host}</code></div>
          <div><strong>Submission Policy:</strong> <span className="text-amber-700 font-semibold">Offline Draft Mode</span></div>
          <div><strong>Auth Gateway:</strong> <span className="text-slate-600">DisabledAuthGateway (Secure stub)</span></div>
        </div>
      </div>

      {/* Recovered Endpoints */}
      <div>
        <h3 className="text-base font-bold text-slate-800 mb-1">Recovered DEX API Route Inventory</h3>
        <p className="text-xs text-slate-500 mb-3">
          Static route inventory recovered from original APK DEX string table:
        </p>

        <div className="flex flex-col gap-2.5">
          {API_INVENTORY.endpoints.map((ep) => (
            <div
              key={ep.key}
              className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#165BB5] font-mono">
                  {ep.key}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                    ep.requiresAuth
                      ? 'bg-blue-50 text-[#165BB5]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {ep.requiresAuth ? <Lock className="w-2.5 h-2.5" /> : <Globe className="w-2.5 h-2.5" />}
                  {ep.requiresAuth ? 'Requires Auth' : 'Public'}
                </span>
              </div>
              <code className="text-xs text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-100 font-mono">
                {ep.path}
              </code>
              <p className="text-xs text-slate-500">{ep.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Verification Criteria */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-2">
        <h3 className="text-sm font-bold text-slate-800">Submission Decision Policy</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          According to <code className="text-[#165BB5]">SubmissionPolicy.kt</code>, submission is permitted only when all 4 conditions are met:
        </p>
        <ul className="text-xs text-slate-600 space-y-1.5 mt-1">
          <li className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold">✕</span>
            <span><code>ApiIntegrationGate.ENABLED</code> must be true (currently false)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold">✕</span>
            <span>API endpoint schema & contracts verified in staging</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold">✕</span>
            <span>Valid authenticated representative session token</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold">✕</span>
            <span>Staging authorization approval</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
