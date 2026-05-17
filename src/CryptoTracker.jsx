import { useState, useEffect } from 'react';

function CryptoTracker(){
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      if (!response.ok) throw new Error('API limit reached. Try again in 60s.');
      const data = await response.json();
      setCoins(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // Restored the deep radial gradient background
    <div className="min-h-screen bg-[#08090a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#1a1c1e] via-[#08090a] to-black text-slate-200 p-4 md:p-10 font-sans selection:bg-[#d4af37]/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Golden Header Section */}
        <header className="mb-8 p-6 md:p-10 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          {/* Decorative Gold Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/10 blur-[80px] -mr-20 -mt-20"></div>
          
          <div className="text-center md:text-left z-10">
            <h1 className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37] font-bold mb-2">Institutional Terminal</h1>
            <h2 className="text-3xl md:text-5xl font-extralight text-white tracking-tighter">Digital <span className="font-semibold text-[#d4af37]">Assets</span></h2>
            {lastUpdated && <p className="text-[9px] text-slate-500 mt-3 uppercase tracking-widest">Last Sync: <span className="text-[#d4af37]/70">{lastUpdated}</span></p>}
          </div>

          <button 
            onClick={fetchData}
            disabled={loading}
            className="w-full md:w-auto px-10 py-4 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-[#d4af37] hover:text-black transition-all duration-500 shadow-[0_0_25px_rgba(212,175,55,0.15)] active:scale-95 z-10"
          >
            {loading ? 'Syncing Data...' : 'Refresh Market'}
          </button>
        </header>

        {/* Error Alert with Gold/Rose accents */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-400 text-[10px] uppercase tracking-widest text-center">
            System Notice: {error}
          </div>
        )}

        {/* Main Data Container */}
        <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl">
          {/* Subtle Golden Edge Highlight */}
          <div className="absolute -inset-px bg-gradient-to-b from-[#d4af37]/20 to-transparent opacity-30"></div>
          
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-4 bg-white/[0.04] p-6 text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-bold border-b border-white/10">
            <span>Asset</span>
            <span className="text-right">Price</span>
            <span className="text-right">24H Trend</span>
            <span className="text-right">Cap</span>
          </div>

          {loading && coins.length === 0 ? (
            <div className="p-32 text-center">
              <div className="inline-block w-8 h-8 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mb-4"></div>
              <p className="text-[#d4af37] text-[10px] uppercase tracking-[0.4em] font-bold">Establishing Secure Link</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5 relative">
              {coins.map((coin) => (
                <div key={coin.id} className="p-5 md:p-6 transition-all duration-300 hover:bg-[#d4af37]/5 group">
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 md:gap-0">
                    
                    {/* Identity - Gold Name on Hover */}
                    <div className="flex items-center gap-4">
                      <img src={coin.image} alt="" className="w-8 h-8 md:w-10 md:h-10 grayscale-[0.5] group-hover:grayscale-0 transition-all" />
                      <div>
                        <div className="text-white font-medium text-base md:text-lg tracking-tight group-hover:text-[#d4af37] transition-colors">{coin.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{coin.symbol}</div>
                      </div>
                    </div>

                    {/* Price - Golden Mono Font */}
                    <div className="flex justify-between md:block md:text-right border-t border-white/5 pt-4 md:pt-0 md:border-0">
                      <span className="md:hidden text-[9px] text-[#d4af37]/50 uppercase font-bold self-center">Live Price</span>
                      <span className="font-mono text-[#d4af37] text-xl md:text-2xl tracking-tighter">
                        ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Change - Subtle Neon Accents */}
                    <div className="flex justify-between md:block md:text-right">
                      <span className="md:hidden text-[9px] text-[#d4af37]/50 uppercase font-bold self-center">Market Sentiment</span>
                      <span className={`font-mono text-xs md:text-sm px-3 py-1 rounded-full border ${
                        coin.price_change_percentage_24h >= 0 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {coin.price_change_percentage_24h >= 0 ? '↑' : '↓'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </div>

                    {/* Cap */}
                    <div className="flex justify-between md:block md:text-right">
                      <span className="md:hidden text-[9px] text-[#d4af37]/50 uppercase font-bold self-center">Valuation</span>
                      <span className="text-slate-400 font-mono text-sm tracking-widest">
                        ${(coin.market_cap / 1000000000).toFixed(2)}B
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Golden Footer */}
        <footer className="mt-12 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] text-slate-600 uppercase tracking-[0.4em] gap-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <span>Encrypted Network Active</span>
          </div>
          <p>© 2026 Institutional Terminal • Global Assets</p>
        </footer>
      </div>
    </div>
  );
}

export default CryptoTracker;