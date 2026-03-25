import './SkeletonTable.css'

function SkeletonTable({ rows = 6, columns = 3 }) {
  return (
    <div className="skeleton-table-wrapper">
      <div className="skeleton-table-header">
        <div className="skeleton skeleton-search"></div>
      </div>

      <div className="skeleton-table">
        <div
          className="skeleton-table-row skeleton-table-head"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="skeleton skeleton-cell skeleton-head-cell"></div>
          ))}
        </div>

        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="skeleton-table-row"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="skeleton skeleton-cell"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkeletonTable