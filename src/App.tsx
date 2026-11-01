import React, { useState, useEffect } from 'react';
import { Page, DcrEntry } from './types';
import { loadDrafts, saveDrafts } from './utils/storage';
import { HomeScreen } from './components/HomeScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { DcrScreen } from './components/DcrScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { ApiInventoryScreen } from './components/ApiInventoryScreen';
import { ChevronLeft, Wifi, WifiOff } from 'lucide-react';

export default function App() {
  const [page, setPage] = useState<Page>('Home');
  const [entries, setEntries] = useState<DcrEntry[]>(() => {
    const loaded = loadDrafts();
    if (loaded.length === 0) {
      // Seed with 2 demo drafts so users immediately see how DCR history & dashboard work
      const initialSeed: DcrEntry[] = [
        {
          id: 'seed-1',
          doctor: 'Dr. Shahabuddin Ahmed',
          fme: 'Sample FME (demo)',
          date: '2026-10-12',
          time: '11:30',
          brands: ['Abecab', 'Avloclav'],
          comment: 'Doctor requested pediatric dosage samples.',
          observation: 'High potential prescriber for cardiovascular range.',
          business: 'Pharmaceuticals (demo)',
          region: 'Rajshahi (demo)',
          area: 'Sample Area (demo)',
          priority: 'A',
          lastCall: '2026-09-28',
          workWith: 'Alone (demo)',
        },
        {
          id: 'seed-2',
          doctor: 'Dr. Nusrat Jahan',
          fme: 'Sample FME (demo)',
          date: '2026-10-24',
          time: '15:15',
          brands: ['Biocal', 'Cerox CV'],
          comment: 'Satisfied with clinical trial efficacy data.',
          observation: 'Follow up next week with promotional collateral.',
          business: 'Pharmaceuticals (demo)',
          region: 'Rajshahi (demo)',
          area: 'Sample Area (demo)',
          priority: 'B',
          lastCall: '2026-10-05',
          workWith: 'Colleague (demo)',
        },
      ];
      saveDrafts(initialSeed);
      return initialSeed;
    }
    return loaded;
  });

  const [online, setOnline] = useState<boolean>(navigator.onLine);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefreshNetwork = () => {
    setOnline(navigator.onLine);
  };

  const handleSaved = (entry: DcrEntry) => {
    const updated = [...entries, entry];
    if (saveDrafts(updated)) {
      setEntries(updated);
      setPage('DCR History');
    } else {
      setStorageError(true);
    }
  };

  const handleDeleteEntry = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    if (saveDrafts(updated)) {
      setEntries(updated);
    }
  };

  const handleClearAll = () => {
    if (saveDrafts([])) {
      setEntries([]);
    }
  };

  const getPageTitle = () => {
    if (page === 'Home') return 'My DCRs';
    return page;
  };

  return (
    <div className="min-h-screen bg-[#F2F6FC] flex flex-col text-slate-900">
      {/* Top App Bar matching Android Jetpack Compose blue top bar */}
      <header className="bg-[#165BB5] text-white shadow-md sticky top-0 z-30">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {page !== 'Home' && (
              <button
                onClick={() => setPage('Home')}
                className="flex items-center gap-0.5 text-white/90 hover:text-white font-semibold text-sm py-1 pr-2 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 -ml-1" />
                <span>Back</span>
              </button>
            )}
            <h1 className="text-lg font-bold tracking-wide">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefreshNetwork}
              title={online ? 'Network online' : 'Network offline'}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                online
                  ? 'bg-blue-600/60 text-white'
                  : 'bg-amber-500/80 text-white'
              }`}
            >
              {online ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{online ? 'Online' : 'Offline'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1">
        {page === 'Home' && (
          <HomeScreen
            connected={online}
            onRefreshNetwork={handleRefreshNetwork}
            onNavigate={setPage}
            draftCount={entries.length}
          />
        )}

        {page === 'Dashboard' && (
          <DashboardScreen entries={entries} />
        )}

        {page === 'Doctor Call Report' && (
          <DcrScreen
            online={online}
            onRefreshOnline={handleRefreshNetwork}
            onSaved={handleSaved}
          />
        )}

        {page === 'DCR History' && (
          <HistoryScreen
            entries={entries}
            onNewDcr={() => setPage('Doctor Call Report')}
            onDeleteEntry={handleDeleteEntry}
            onClearAll={handleClearAll}
          />
        )}

        {page === 'API Inventory' && (
          <ApiInventoryScreen />
        )}
      </main>

      {/* Storage Error Alert Dialog */}
      {storageError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-base font-bold text-slate-800">Draft not saved</h3>
            <p className="text-xs text-slate-600 mt-2">
              Local storage failed. Please retry. No data was sent to a server.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setStorageError(false)}
                className="px-4 py-2 bg-[#165BB5] text-white text-xs font-bold rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
