import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { Maximize2, Minimize2, Download, TrendingUp, Clock } from 'lucide-react';
import { generateHistoryData } from '../services/marketData';

const AdvancedChart = ({ 
  basePrice = 1000, 
  currency = '₹', 
  color = '#54D6B0', 
  title = 'Price Action', 
  symbol = 'STOCK' 
}) => {
  const [timeFilter, setTimeFilter] = useState('1M');
  const [chartType, setChartType] = useState('area');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const filters = ['1D', '1W', '1M', '1Y'];

  const data = useMemo(() => {
    return generateHistoryData(basePrice, timeFilter);
  }, [basePrice, timeFilter]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      return (
        <div className="bg-[#101B2B] border border-[#54D6B0]/30 p-3 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-[10px] font-bold text-[#8E9CAE] uppercase tracking-wider mb-1">
            {symbol} • {label}
          </p>
          <p className="text-base font-black font-mono text-white">
            {currency}{val.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-[#54D6B0]">
            <Clock size={10} /> Simulated historical tick series
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`flex flex-col gap-4 ${isFullScreen ? 'fixed inset-0 z-[100] bg-[#101B2B] p-8' : 'w-full h-full'}`}>
      {/* Chart Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-[#162338] p-1 rounded-xl border border-white/5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setTimeFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                timeFilter === f
                  ? 'bg-[#54D6B0] text-[#0B131E] shadow-sm'
                  : 'text-[#8E9CAE] hover:text-white hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#162338] p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                chartType === 'area'
                  ? 'bg-white/10 text-[#54D6B0]'
                  : 'text-[#8E9CAE] hover:text-white'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                chartType === 'line'
                  ? 'bg-white/10 text-[#54D6B0]'
                  : 'text-[#8E9CAE] hover:text-white'
              }`}
            >
              Line
            </button>
          </div>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 rounded-xl bg-[#162338] border border-white/5 text-[#8E9CAE] hover:text-white hover:border-[#54D6B0]/30 transition-all cursor-pointer"
            title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen Chart'}
          >
            {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Main Interactive Recharts Canvas */}
      <div className="w-full h-[320px] sm:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="chartMintGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#54D6B0" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#54D6B0" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(243, 245, 247, 0.04)" vertical={false} />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8E9CAE', fontSize: 11, fontFamily: 'monospace' }}
              minTickGap={25}
            />

            <YAxis
              domain={['auto', 'auto']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8E9CAE', fontSize: 11, fontFamily: 'monospace' }}
              orientation="right"
              tickFormatter={(v) => `${currency}${v}`}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(84, 214, 176, 0.3)', strokeWidth: 1 }} />

            {chartType === 'area' ? (
              <Area
                type="monotone"
                dataKey="price"
                stroke="#54D6B0"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#chartMintGradient)"
                animationDuration={800}
              />
            ) : (
              <Line
                type="monotone"
                dataKey="price"
                stroke="#54D6B0"
                strokeWidth={2.5}
                dot={false}
                animationDuration={800}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Indicators */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/5 text-[11px] text-[#8E9CAE]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#54D6B0]">
            <span className="w-2 h-2 rounded-full bg-[#54D6B0] animate-pulse" />
            Crosshair Active
          </span>
          <span>Timeframe: {timeFilter}</span>
        </div>
        <span className="text-[10px] text-[#8E9CAE]/70">
          Historical volatility modelled at 1.5% daily σ
        </span>
      </div>
    </div>
  );
};

export default AdvancedChart;
