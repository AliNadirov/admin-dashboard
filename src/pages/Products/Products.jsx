import { useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getProducts } from '../../services/productService'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import EmptyState from '../../components/EmptyState/EmptyState'
import DataTable from '../../components/DataTable/DataTable'
import SkeletonTable from '../../components/SkeletonTable/SkeletonTable'
import './Products.css'

function Products() {
  const { searchTerm } = useOutletContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const productsPerPage = 9

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    const value = searchTerm.toLowerCase().trim()

    if (!value) return products

    return products.filter((product) => {
      const title = product.title.toLowerCase()
      const category = product.category.toLowerCase()

      return title.includes(value) || category.includes(value)
    })
  }, [products, searchTerm])

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    {
      key: 'price',
      label: 'Price',
      render: (product) => `$${product.price}`,
    },
  ]

  if (loading) {
    return (
      <section className="products-page">
        <div className="products-header">
          <h2>Products</h2>
        </div>

        <SkeletonTable rows={9} columns={4} />
      </section>
    )
  }

  if (error) {
    return (
      <section className="products-page">
        <h2>Products</h2>
        <ErrorMessage message={error} />
      </section>
    )
  }

  return (
    <section className="products-page">
      <div className="products-header">
        <h2>Products</h2>
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState message="No products found." />
      ) : (
        <DataTable
          columns={columns}
          data={paginatedProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={() => setCurrentPage((prev) => prev - 1)}
          onNextPage={() => setCurrentPage((prev) => prev + 1)}
        />
      )}
    </section>
  )
}

export default Products