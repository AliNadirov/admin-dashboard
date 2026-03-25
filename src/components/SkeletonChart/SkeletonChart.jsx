import './SkeletonChart.css'

function SkeletonChart() {
  return (
    <div className="skeleton-chart-box">
      <div className="skeleton skeleton-chart-label"></div>
      <div className="skeleton skeleton-chart-heading"></div>

      <div className="skeleton-chart-bars">
        <div className="skeleton skeleton-bar bar-1"></div>
        <div className="skeleton skeleton-bar bar-2"></div>
        <div className="skeleton skeleton-bar bar-3"></div>
        <div className="skeleton skeleton-bar bar-4"></div>
      </div>
    </div>
  )
}

export default SkeletonChart