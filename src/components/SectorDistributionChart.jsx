import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const DEFAULT_COLORS = [
  '#54D6B0', // Mint Green
  '#3EA698', // Teal
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#8B5CF6'  // Purple
];

const SectorDistributionChart = ({
  data = [],
  title = 'Sector Allocation',
  donut = true,
  height = 300
}) => {
  const { isDark } = useTheme();

  const total = useMemo(() => {
    return data.reduce((acc, curr) => acc + (curr.value || 0), 0);
  }, [data]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
      return (
        <div
          className={`p-3 rounded-xl border text-xs shadow-xl backdrop-blur-md ${
            isDark
              ? 'bg-[#101B2B] border-[#54D6B0]/30 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <span className="font-bold block mb-1">{item.name}</span>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-[#54D6B0] font-black">{pct}%</span>
            <span className="text-[#8E9CAE]">({item.count || item.value} items)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-xs text-[#8E9CAE]">
        <span>No asset distribution data available</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white">
          {title}
        </h4>
        <span className="text-[10px] text-[#8E9CAE] font-mono">
          Total Weight: 100%
        </span>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={donut ? 55 : 0}
              outerRadius={85}
              paddingAngle={donut ? 3 : 0}
              dataKey="value"
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                  stroke={isDark ? '#101B2B' : '#FFFFFF'}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-[11px] font-semibold text-[#8E9CAE] px-1">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectorDistributionChart;
