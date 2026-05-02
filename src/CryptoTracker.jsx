import { useState, useEffect } from 'react';

function CryptoTracker() {
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
      if (!response.ok) throw new Error('API limit reached. Try again in a minute.');
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
    <div className="min-h-screen bg-[#08090a] text-slate-200 p-4 md:p-10 font-sans selection:bg-[#d4af37]/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Stacks on mobile, Side-by-side on desktop */}
        <header className="mb-8 p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] font-bold mb-1">Market Terminal</h1>
            <h2 className="text-3xl md:text-4xl font-extralight text-white">Digital <span className="font-semibold text-[#d4af37]">Assets</span></h2>
            {lastUpdated && <p className="text-[9px] text-slate-500 mt-2 uppercase tracking-widest text-center md:text-left">Sync: {lastUpdated}</p>}
          </div>
          <button 
            onClick={fetchData}
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] font-bold uppercase text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-black transition-all active:scale-95"
          >
            {loading ? 'Updating...' : 'Refresh Market'}
          </button>
        </header>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] uppercase tracking-widest italic">
            Error: {error}
          </div>
        )}

        {/* The "Normal" Responsive Layout */}
        <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl">
          
          {/* Desktop Header: Hidden on mobile */}
          <div className="hidden md:grid grid-cols-4 bg-white/[0.03] p-6 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold border-b border-white/5">
            <span>Asset</span>
            <span className="text-right">Price (USD)</span>
            <span className="text-right">24H Change</span>
            <span className="text-right">Market Valuation</span>
          </div>

          {loading && coins.length === 0 ? (
            <div className="p-20 text-center text-[#d4af37] text-[10px] uppercase tracking-widest animate-pulse">Establishing Secure Stream...</div>
          ) : (
            <div className="divide-y divide-white/5">
              {coins.map((coin) => (
                <div key={coin.id} className="p-6 transition-all duration-300 hover:bg-white/[0.04]">
                  {/* Grid layout for Desktop, Flex/Stack for Mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 md:gap-0">
                    
                    {/* Column 1: Identity */}
                    <div className="flex items-center gap-4">
                      <img src={coin.image} alt="" className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="text-white font-medium md:text-base">{coin.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">{coin.symbol}</div>
                      </div>
                    </div>

                    {/* Column 2: Price (Aligned center-left on mobile, right on desktop) */}
                    <div className="flex justify-between md:block md:text-right">
                      <span className="md:hidden text-[10px] text-slate-500 uppercase font-bold">Price:</span>
                      <span className="font-mono text-[#d4af37] text-lg md:text-xl tracking-tighter">
                        ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Column 3: Change */}
                    <div className="flex justify-between md:block md:text-right">
                      <span className="md:hidden text-[10px] text-slate-500 uppercase font-bold">24H Trend:</span>
                      <span className={`font-mono text-sm px-2 py-1 rounded-md border ${
                        coin.price_change_percentage_24h >= 0 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {coin.price_change_percentage_24h >= 0 ? '↑' : '↓'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </div>

                    {/* Column 4: Market Cap */}
                    <div className="flex justify-between md:block md:text-right">
                      <span className="md:hidden text-[10px] text-slate-500 uppercase font-bold">Market Cap:</span>
                      <span className="text-slate-400 font-mono text-sm">
                        ${(coin.market_cap / 1000000000).toFixed(2)}B
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="mt-8 flex flex-col md:flex-row justify-between items-center text-[9px] text-slate-600 uppercase tracking-[0.3em] gap-4">
          <p>© 2026 Global Terminal</p>
          <p>Institutional Grade Data Feed</p>
        </footer>
      </div>
    </div>
  );
}

export default CryptoTracker;