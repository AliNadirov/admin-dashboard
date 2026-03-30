import './DataTable.css'

function DataTable({
  columns,
  data,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) {
  return (
    <>
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {typeof column.render === 'function'
                      ? column.render(item)
                      : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={onPrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="pagination-btn"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default DataTable