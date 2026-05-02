import { useState, useEffect } from 'react';

function CryptoTracker() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors on new attempt
      
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );

      if (!response.ok) {
        if (response.status === 429) throw new Error('Rate limit exceeded. Please wait 60s.');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCoins(data);
      // Capture the exact time of the successful fetch
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // The useEffect hook: Runs once when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#08090a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-[#08090a] to-black text-slate-200 p-4 md:p-10 font-sans selection:bg-[#d4af37]/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 blur-[50px] -mr-16 -mt-16"></div>
          
          <div className="text-center md:text-left z-10">
            <h1 className="text-xs uppercase tracking-[0.4em] text-[#d4af37] font-bold mb-2">Institutional Terminal</h1>
            <h2 className="text-4xl font-extralight text-white tracking-tight">Digital <span className="font-semibold text-[#d4af37]">Assets</span></h2>
            {lastUpdated && (
              <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">
                Last Sync: <span className="text-slate-300">{lastUpdated}</span>
              </p>
            )}
          </div>
          
          <button 
            onClick={fetchData}
            disabled={loading}
            className="mt-6 md:mt-0 px-8 py-3 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] font-bold uppercase text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)] active:scale-95 z-10"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-3 w-3 text-[#d4af37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Syncing
              </span>
            ) : 'Refresh Market'}
          </button>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            Warning: {error}
          </div>
        )}

        {/* Table Container */}
        <div className="relative group">
          <div className="absolute -inset-px bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-2xl blur-sm opacity-50"></div>
          
          <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.03] text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                  <th className="p-6">Asset Name</th>
                  <th className="p-6 text-right">Current Price</th>
                  <th className="p-6 text-right">24H Volatility</th>
                  <th className="p-6 text-right">Market Valuation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading && coins.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-32 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin"></div>
                        <p className="text-[#d4af37] text-[10px] uppercase tracking-[0.3em] font-bold">Authenticating API Stream</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  coins.map((coin) => (
                    <tr key={coin.id} className="hover:bg-white/[0.04] transition-all duration-300 group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img src={coin.image} alt="" className="w-8 h-8 z-10 relative brightness-90 group-hover:brightness-110 transition-all" />
                            <div className="absolute inset-0 bg-[#d4af37]/10 blur-md rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                          </div>
                          <div>
                            <div className="text-white font-medium tracking-tight group-hover:text-[#d4af37] transition-colors">{coin.name}</div>
                            <div className="text-[10px] text-slate-500 uppercase font-bold">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-6 text-right font-mono text-[#d4af37] text-xl tracking-tighter">
                        ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>

                      <td className="p-6 text-right font-mono text-sm">
                        <span className={`px-3 py-1 rounded-full border ${
                          coin.price_change_percentage_24h >= 0 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {coin.price_change_percentage_24h >= 0 ? '↑' : '↓'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                        </span>
                      </td>

                      <td className="p-6 text-right text-slate-400 font-mono text-sm">
                        ${(coin.market_cap / 1000000000).toFixed(2)}B
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-slate-600 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${error ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></span>
            {error ? 'System Latency' : 'Global Network Online'}
          </div>
          <p>© 2026 Financial Data Systems • High Frequency Feed</p>
        </footer>
      </div>
    </div>
  );
}

export default CryptoTracker;