import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts'
import './ChartBox.css'

const barColors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe']

function formatCurrency(value) {
  return `$${value.toLocaleString()}`
}

function getRoundedMax(value) {
  if (value <= 1000) return 1000
  return Math.ceil(value / 1000) * 1000
}

function getTicks(maxValue) {
  const roundedMax = getRoundedMax(maxValue)
  const step = 1000
  const ticks = []

  for (let i = 0; i <= roundedMax; i += step) {
    ticks.push(i)
  }

  return ticks
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null

  const { category, value } = payload[0].payload

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-title">{category}</p>
      <p className="chart-tooltip-value">{formatCurrency(value)}</p>
    </div>
  )
}

function ChartBox({ data = [] }) {
  const isDark = document.body.classList.contains('dark')
  const axisColor = isDark ? '#94a3b8' : '#6b7280'

  const sortedData = [...data].sort((a, b) => b.value - a.value)
  const maxValue = Math.max(...sortedData.map((item) => item.value), 0)
  const roundedMax = getRoundedMax(maxValue)
  const ticks = getTicks(maxValue)

  return (
    <div className="chart-box">
      <div className="chart-box-header">
        <div>
          <p className="chart-box-label">Analytics</p>
          <h3>Category Value Overview</h3>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <CartesianGrid
              stroke="rgba(148, 163, 184, 0.15)"
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              domain={[0, roundedMax]}
              ticks={ticks}
              tickFormatter={(value) => `$${value}`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: axisColor }}
            />
            <YAxis
              type="category"
              dataKey="category"
              axisLine={false}
              tickLine={false}
              width={100}
              tick={{ fill: axisColor }}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={26}>
              {sortedData.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={barColors[index % barColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ChartBox