import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const MultiIndexComparisonChart = ({ height = 340 }) => {
  const { isDark } = useTheme();
  const [timeframe, setTimeframe] = useState('1M');

  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y', 'ALL'];

  // Normalized % return comparison series
  const comparisonData = useMemo(() => {
    const counts = {
      '1D': 24,
      '1W': 7,
      '1M': 30,
      '3M': 45,
      '6M': 26,
      '1Y': 12,
      '5Y': 20,
      'ALL': 30
    };
    const count = counts[timeframe] || 30;
    const series = [];

    let n50 = 0;
    let snx = 0;
    let nsq = 0;
    let spx = 0;

    for (let i = 0; i < count; i++) {
      n50 += (Math.random() - 0.47) * 0.5;
      snx += (Math.random() - 0.47) * 0.48;
      nsq += (Math.random() - 0.46) * 0.75;
      spx += (Math.random() - 0.47) * 0.55;

      const label =
        timeframe === '1D'
          ? `${9 + Math.floor(i / 4)}:${(i % 4) * 15 || '00'}`
          : timeframe === '1W'
          ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]
          : timeframe === '1Y'
          ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]
          : `T-${count - i}`;

      series.push({
        label,
        'NIFTY 50': parseFloat(n50.toFixed(2)),
        'SENSEX': parseFloat(snx.toFixed(2)),
        'NASDAQ 100': parseFloat(nsq.toFixed(2)),
        'S&P 500': parseFloat(spx.toFixed(2))
      });
    }
    return series;
  }, [timeframe]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-3 rounded-xl border text-xs shadow-xl backdrop-blur-md ${
            isDark
              ? 'bg-[#101B2B] border-[#54D6B0]/30 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <span className="font-mono text-[10px] text-[#8E9CAE] block mb-2 uppercase">
            Period: {label} (% Change Relative to Baseline)
          </span>
          <div className="space-y-1">
            {payload.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between gap-4 font-mono">
                <span style={{ color: entry.color }} className="font-bold">
                  {entry.name}:
                </span>
                <span className={`font-black ${entry.value >= 0 ? 'text-[#54D6B0]' : 'text-[#FF5C75]'}`}>
                  {entry.value >= 0 ? '+' : ''}{entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Timeframe Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            Cross-Exchange Benchmark Correlation (% Relative Performance)
          </h3>
          <p className="text-[10px] text-[#8E9CAE]">
            Normalized baseline comparison between Indian (NSE/BSE) and US (NASDAQ/S&P) benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#162338] p-1 rounded-xl border border-white/5">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                timeframe === tf
                  ? 'bg-[#54D6B0] text-[#0B131E]'
                  : 'text-[#8E9CAE] hover:text-white hover:bg-white/5'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={comparisonData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(243, 245, 247, 0.04)' : 'rgba(15, 23, 42, 0.06)'} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8E9CAE', fontSize: 10, fontFamily: 'monospace' }}
              minTickGap={20}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8E9CAE', fontSize: 10, fontFamily: 'monospace' }}
              tickFormatter={(v) => `${v > 0 ? '+' : ''}${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={32}
              formatter={(val) => <span className="text-xs font-semibold text-white px-2">{val}</span>}
            />
            <Line type="monotone" dataKey="NIFTY 50" stroke="#54D6B0" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="SENSEX" stroke="#3EA698" strokeWidth={2} dot={false} strokeDasharray="4 2" />
            <Line type="monotone" dataKey="NASDAQ 100" stroke="#3B82F6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="S&P 500" stroke="#F59E0B" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MultiIndexComparisonChart;
