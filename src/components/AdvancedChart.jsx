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
import { Maximize2, Minimize2, Clock, Eye, Layers } from 'lucide-react';
import { generateHistoryData } from '../services/marketData';
import { useTheme } from '../context/ThemeContext';

const AdvancedChart = ({ 
  basePrice = 1000, 
  currency = '₹', 
  color = '#54D6B0', 
  title = 'Price Action', 
  symbol = 'STOCK' 
}) => {
  const { isDark } = useTheme();
  const [timeFilter, setTimeFilter] = useState('1M');
  const [chartType, setChartType] = useState('candle'); // 'candle' | 'area' | 'line'
  const [showIndicators, setShowIndicators] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const filters = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y', 'ALL'];

  const data = useMemo(() => {
    return generateHistoryData(basePrice, timeFilter);
  }, [basePrice, timeFilter]);

  // Custom Candlestick Shape for Recharts Bar
  const CandlestickBar = (props) => {
    const { x, y, width, height, payload } = props;
    if (!payload) return null;

    const { open, close, high, low } = payload;
    const isBull = close >= open;
    const candleColor = isBull ? '#54D6B0' : '#FF5C75';

    // Scale wick positions relative to candle body
    const bodyTop = y;
    const bodyHeight = Math.max(height, 2);
    const centerX = x + width / 2;

    const wickTop = isBull ? bodyTop - (high - close) * 2 : bodyTop - (high - open) * 2;
    const wickBottom = isBull ? bodyTop + bodyHeight + (open - low) * 2 : bodyTop + bodyHeight + (close - low) * 2;

    return (
      <g>
        {/* Upper & Lower Wick Line */}
        <line
          x1={centerX}
          y1={Math.max(wickTop, 10)}
          x2={centerX}
          y2={Math.min(wickBottom, 320)}
          stroke={candleColor}
          strokeWidth={1.5}
        />
        {/* Candlestick Body */}
        <rect
          x={x + 1}
          y={bodyTop}
          width={Math.max(width - 2, 2)}
          height={bodyHeight}
          fill={candleColor}
          rx={1}
          opacity={0.9}
        />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      const isUp = p.close >= p.open;
      return (
        <div
          className={`p-3.5 rounded-2xl border text-xs shadow-2xl backdrop-blur-md ${
            isDark
              ? 'bg-[#101B2B] border-[#54D6B0]/30 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between gap-4 pb-2 border-b border-white/10 mb-2">
            <span className="font-mono font-bold text-sm text-[#54D6B0]">
              {symbol} • {label}
            </span>
            <span className={`font-mono font-bold text-xs ${isUp ? 'text-[#54D6B0]' : 'text-[#FF5C75]'}`}>
              {isUp ? 'Bullish Candle' : 'Bearish Candle'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-[#8E9CAE]">Open:</span>
            <span className="text-right font-bold">{currency}{p.open}</span>
            <span className="text-[#8E9CAE]">High:</span>
            <span className="text-right font-bold text-[#54D6B0]">{currency}{p.high}</span>
            <span className="text-[#8E9CAE]">Low:</span>
            <span className="text-right font-bold text-[#FF5C75]">{currency}{p.low}</span>
            <span className="text-[#8E9CAE]">Close:</span>
            <span className="text-right font-bold">{currency}{p.close}</span>
            <span className="text-[#8E9CAE]">Volume:</span>
            <span className="text-right text-[#8E9CAE]">{(p.volume / 1000).toFixed(0)}K</span>
            {showIndicators && (
              <>
                <span className="text-[#8E9CAE]">SMA(20):</span>
                <span className="text-right text-[#54D6B0] font-semibold">{currency}{p.sma20}</span>
              </>
            )}
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
        {/* Timeframe Selector */}
        <div className="flex items-center gap-1 bg-[#162338] p-1 rounded-xl border border-white/5 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setTimeFilter(f)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                timeFilter === f
                  ? 'bg-[#54D6B0] text-[#0B131E] shadow-sm'
                  : 'text-[#8E9CAE] hover:text-white hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Chart Style & Indicators Controls */}
        <div className="flex items-center gap-2">
          {/* Chart Type Toggle */}
          <div className="flex items-center gap-1 bg-[#162338] p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setChartType('candle')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                chartType === 'candle'
                  ? 'bg-white/10 text-[#54D6B0] font-bold'
                  : 'text-[#8E9CAE] hover:text-white'
              }`}
            >
              Candle
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                chartType === 'area'
                  ? 'bg-white/10 text-[#54D6B0] font-bold'
                  : 'text-[#8E9CAE] hover:text-white'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                chartType === 'line'
                  ? 'bg-white/10 text-[#54D6B0] font-bold'
                  : 'text-[#8E9CAE] hover:text-white'
              }`}
            >
              Line
            </button>
          </div>

          {/* Indicators Toggle */}
          <button
            onClick={() => setShowIndicators(!showIndicators)}
            className={`p-1.5 px-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              showIndicators
                ? 'bg-[#54D6B0]/15 text-[#54D6B0] border-[#54D6B0]/40'
                : 'bg-[#162338] text-[#8E9CAE] border-white/5 hover:text-white'
            }`}
            title="Toggle Technical Indicators (SMA 20, EMA 50)"
          >
            <Layers size={14} />
            <span className="hidden sm:inline">SMA 20</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 rounded-xl bg-[#162338] border border-white/5 text-[#8E9CAE] hover:text-white hover:border-[#54D6B0]/30 transition-all cursor-pointer"
            title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Main Interactive Recharts Canvas */}
      <div className="w-full h-[320px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="chartMintGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#54D6B0" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#54D6B0" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? 'rgba(243, 245, 247, 0.04)' : 'rgba(15, 23, 42, 0.06)'}
              vertical={false}
            />

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

            {/* Candlestick Visualization */}
            {chartType === 'candle' && (
              <Bar
                dataKey="close"
                shape={<CandlestickBar />}
                animationDuration={600}
              />
            )}

            {/* Area Visualization */}
            {chartType === 'area' && (
              <Area
                type="monotone"
                dataKey="close"
                stroke="#54D6B0"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#chartMintGradient)"
                animationDuration={600}
              />
            )}

            {/* Line Visualization */}
            {chartType === 'line' && (
              <Line
                type="monotone"
                dataKey="close"
                stroke="#54D6B0"
                strokeWidth={2.5}
                dot={false}
                animationDuration={600}
              />
            )}

            {/* Indicator Overlays */}
            {showIndicators && (
              <>
                <Line
                  type="monotone"
                  dataKey="sma20"
                  stroke="#3B82F6"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="3 3"
                  name="SMA 20"
                />
                <Line
                  type="monotone"
                  dataKey="ema50"
                  stroke="#F59E0B"
                  strokeWidth={1.5}
                  dot={false}
                  name="EMA 50"
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Indicator Status */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/5 text-[11px] text-[#8E9CAE]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#54D6B0]">
            <span className="w-2 h-2 rounded-full bg-[#54D6B0] animate-pulse" />
            Crosshair Active
          </span>
          <span>Timeframe: {timeFilter}</span>
          {showIndicators && (
            <span className="hidden sm:inline font-mono">
              <span className="text-[#3B82F6] font-bold">SMA 20</span> • <span className="text-[#F59E0B] font-bold">EMA 50</span>
            </span>
          )}
        </div>
        <span className="text-[10px] text-[#8E9CAE]/70 font-mono">
          Simulated high-frequency OHLC series calibrated with 15m delay
        </span>
      </div>
    </div>
  );
};

export default AdvancedChart;
