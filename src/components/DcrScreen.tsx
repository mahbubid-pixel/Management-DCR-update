import React, { useState } from 'react';
import { DcrEntry } from '../types';
import { BUSINESS_AREAS, WORK_WITH_OPTIONS } from '../data/constants';
import { BrandPicker } from './BrandPicker';
import { Calendar, Clock, RefreshCw, AlertCircle, ChevronDown } from 'lucide-react';

interface DcrScreenProps {
  onSaved: (entry: DcrEntry) => void;
  online: boolean;
  onRefreshOnline: () => void;
}

export const DcrScreen: React.FC<DcrScreenProps> = ({
  onSaved,
  online,
  onRefreshOnline,
}) => {
  // Cascading selections
  const [business, setBusiness] = useState('');
  const [region, setRegion] = useState('');
  const [area, setArea] = useState('');
  const [fme, setFme] = useState('');

  // Doctor lookup
  const [doctor, setDoctor] = useState('');
  const [priority, setPriority] = useState('');
  const [lastCall, setLastCall] = useState('');

  // Visit Info
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const [visitDate, setVisitDate] = useState(todayStr);
  const [visitTime, setVisitTime] = useState(timeStr);

  // Brands
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showBrands, setShowBrands] = useState(false);

  // Work with & observations
  const [workWith, setWorkWith] = useState('');
  const [other, setOther] = useState('');
  const [comment, setComment] = useState('');
  const [observation, setObservation] = useState('');

  // Modals & Errors
  const [error, setError] = useState('');
  const [confirmSave, setConfirmSave] = useState(false);

  // Derived options
  const businessOptions = Object.keys(BUSINESS_AREAS);
  const regionOptions = business ? Object.keys(BUSINESS_AREAS[business] || {}) : [];
  const areaOptions = business && region ? Object.keys(BUSINESS_AREAS[business]?.[region] || {}) : [];
  const fmeOptions = business && region && area ? (BUSINESS_AREAS[business]?.[region]?.[area] || []) : [];

  const handleReviewSave = () => {
    // Validation matching Android MainActivity.kt
    const isValidDate = (d: string) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
      const parsed = new Date(d);
      return !isNaN(parsed.getTime());
    };

    const isValidTime = (t: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(t);

    if (!online && !doctor.trim()) {
      setError('Doctor lookup unavailable offline. Reconnect to select a doctor.');
      return;
    }

    if (!business || !region || !area || !fme || !doctor.trim()) {
      setError('Complete Business, Region, Area, FME and Doctor.');
      return;
    }

    if (!isValidDate(visitDate)) {
      setError('Enter a valid visit date (YYYY-MM-DD).');
      return;
    }

    if (!isValidTime(visitTime)) {
      setError('Enter visit time as HH:mm.');
      return;
    }

    setError('');
    setConfirmSave(true);
  };

  const handleConfirmSave = () => {
    setConfirmSave(false);
    const newEntry: DcrEntry = {
      doctor: doctor.trim(),
      fme,
      date: visitDate,
      time: visitTime,
      brands: [...selectedBrands].sort(),
      comment: comment.trim(),
      observation: observation.trim(),
      business,
      region,
      area,
      priority: priority.trim(),
      lastCall: lastCall.trim(),
      workWith,
      other: other.trim(),
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    onSaved(newEntry);
  };

  return (
    <div className="p-4 flex flex-col gap-4 max-w-xl mx-auto pb-16">
      {/* Hierarchy Selectors */}
      <div className="flex flex-col gap-3">
        {/* Business Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Business</label>
          <div className="relative">
            <select
              value={business}
              onChange={(e) => {
                setBusiness(e.target.value);
                setRegion('');
                setArea('');
                setFme('');
                setDoctor('');
              }}
              className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#165BB5]"
            >
              <option value="">Select Business</option>
              {businessOptions.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Region Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Region</label>
          <div className="relative">
            <select
              value={region}
              disabled={regionOptions.length === 0}
              onChange={(e) => {
                setRegion(e.target.value);
                setArea('');
                setFme('');
                setDoctor('');
              }}
              className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:border-[#165BB5]"
            >
              <option value="">Select Region</option>
              {regionOptions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Area Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Area</label>
          <div className="relative">
            <select
              value={area}
              disabled={areaOptions.length === 0}
              onChange={(e) => {
                setArea(e.target.value);
                setFme('');
                setDoctor('');
              }}
              className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:border-[#165BB5]"
            >
              <option value="">Select Area</option>
              {areaOptions.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* FME Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">FME (Field Medical Executive)</label>
          <div className="relative">
            <select
              value={fme}
              disabled={fmeOptions.length === 0}
              onChange={(e) => {
                setFme(e.target.value);
                setDoctor('');
              }}
              className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:border-[#165BB5]"
            >
              <option value="">Select FME</option>
              {fmeOptions.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Doctor Lookup Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3">
        <h3 className="text-sm font-bold text-[#165BB5]">Doctor lookup — API not configured</h3>
        <p className="text-xs text-slate-600 leading-normal">
          {online
            ? 'Network available. Live doctor directory still requires a verified API.'
            : 'Offline: original app doctor list was unavailable in the same-form test. No cached directory is provided.'}
        </p>
        <div>
          <button
            type="button"
            onClick={onRefreshOnline}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Recheck connectivity
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Doctor (manual demo only)
          </label>
          <input
            type="text"
            value={doctor}
            disabled={!fme || !online}
            onChange={(e) => setDoctor(e.target.value)}
            placeholder={!fme ? 'Select FME first' : !online ? 'Connect to network to enter' : 'Enter doctor name'}
            className="w-full bg-white border border-slate-300 disabled:bg-slate-100 disabled:text-slate-400 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#165BB5]"
          />
        </div>
        <p className="text-[11px] text-slate-500 leading-normal">
          Manual doctor entry is for non-sensitive UI testing only; it is not a verified server doctor selection.
        </p>
      </div>

      {/* Priority & Last Call */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Priority (unverified)</label>
          <input
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="e.g. A, B, VIP"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#165BB5]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Last call (unverified)</label>
          <input
            type="text"
            value={lastCall}
            onChange={(e) => setLastCall(e.target.value)}
            placeholder="e.g. 2026-10-15"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#165BB5]"
          />
        </div>
      </div>

      {/* Visit Information */}
      <div className="flex flex-col gap-2 pt-2">
        <h3 className="text-base font-bold text-slate-800">Visit Information</h3>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Visit date (YYYY-MM-DD)
            </label>
            <input
              type="text"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              placeholder="YYYY-MM-DD"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#165BB5]"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Time (HH:mm)
            </label>
            <input
              type="text"
              value={visitTime}
              onChange={(e) => setVisitTime(e.target.value)}
              placeholder="HH:mm"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#165BB5]"
            />
          </div>
        </div>
      </div>

      {/* Target Brands Button */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setShowBrands(true)}
          className="w-full py-2.5 px-4 border-2 border-dashed border-[#165BB5] text-[#165BB5] hover:bg-blue-50/50 rounded-xl font-bold text-sm transition-colors text-center"
        >
          + TARGET BRAND ({selectedBrands.length})
        </button>

        {selectedBrands.length > 0 && (
          <div className="text-xs text-[#165BB5] font-semibold bg-blue-50 px-3 py-2 rounded-lg">
            Selected: {selectedBrands.slice().sort().join(', ')}
          </div>
        )}
      </div>

      {/* Work With */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Work with</label>
        <div className="relative">
          <select
            value={workWith}
            onChange={(e) => setWorkWith(e.target.value)}
            className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#165BB5]"
          >
            <option value="">Select Work with</option>
            {WORK_WITH_OPTIONS.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Other field */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Other</label>
        <input
          type="text"
          value={other}
          onChange={(e) => setOther(e.target.value)}
          placeholder="Additional team member or remark"
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#165BB5]"
        />
      </div>

      {/* Doctor comment */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Doctor comment</label>
        <textarea
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Feedback, inquiries, or sample requests from doctor"
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#165BB5]"
        />
      </div>

      {/* Your observation */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Your observation</label>
        <textarea
          rows={2}
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          placeholder="Field executive notes, competitors noted, or follow-up actions"
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#165BB5]"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Review & Save Button */}
      <button
        type="button"
        onClick={handleReviewSave}
        className="w-full py-3 px-4 bg-[#165BB5] hover:bg-[#124993] text-white font-bold text-sm rounded-xl shadow-sm transition-colors text-center"
      >
        Review & Save Offline Draft
      </button>

      <p className="text-[11px] text-slate-500 text-center leading-relaxed">
        Demo catalogs and validations are provisional. No network submission is performed. Drafts persist on this device.
      </p>

      {/* Brand Picker Modal */}
      {showBrands && (
        <BrandPicker
          initial={selectedBrands}
          onDismiss={() => setShowBrands(false)}
          onDone={(brands) => {
            setSelectedBrands(brands);
            setShowBrands(false);
          }}
        />
      )}

      {/* Confirm Save Modal */}
      {confirmSave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <h3 className="text-base font-bold text-slate-800">Save local DCR draft?</h3>
            <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p><strong>Doctor:</strong> {doctor}</p>
              <p><strong>Brands:</strong> {selectedBrands.slice().sort().join(', ') || 'None'}</p>
              <p className="text-amber-700 pt-1 font-medium">This will not submit to the server.</p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmSave(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-5 py-2 text-xs font-bold text-white bg-[#165BB5] hover:bg-[#124993] rounded-lg shadow-xs"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
