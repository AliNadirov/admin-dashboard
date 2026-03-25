import { useEffect, useState } from 'react'
import StatCard from '../../components/StatCard/StatCard'
import ChartBox from '../../components/ChartBox/ChartBox'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { getUsersCount } from '../../services/userService'
import { getProductsSummary } from '../../services/productService'
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard'
import SkeletonChart from '../../components/SkeletonChart/SkeletonChart'
import { formatNumber, formatCurrency } from '../../utils/formatters'
import './Dashboard.css'


function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    revenue: 0,
    categories: 0,
  })
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const usersCount = await getUsersCount()
        const productsData = await getProductsSummary()
        const products = productsData.products || []

        const totalRevenue = products.reduce((sum, product) => {
          return sum + Number(product.price || 0)
        }, 0)

        const uniqueCategories = new Set(
          products.map((product) => product.category)
        ).size

        const categoryMap = {}

        products.forEach((product) => {
          const category = product.category || 'Other'
          const price = Number(product.price || 0)

          if (categoryMap[category]) {
            categoryMap[category] += price
          } else {
            categoryMap[category] = price
          }
        })

        const groupedCategoryData = Object.entries(categoryMap)
          .map(([category, value]) => ({
            category,
            value: Number(value.toFixed(2)),
          }))
          .sort((a, b) => a.value - b.value)

        setStats({
          users: usersCount,
          products: productsData.total || 0,
          revenue: totalRevenue.toFixed(2),
          categories: uniqueCategories,
        })

        setChartData(groupedCategoryData)
      } catch (err) {
        console.error(err)
        setError('Failed to load dashboard statistics')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  if (loading) {
    return (
      <section className="dashboard-page">
        <h2>Dashboard</h2>

        <div className="stats-grid">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <SkeletonChart />
      </section>
    )
  }
  if (error) {
    return (
      <section className="dashboard-page">
        <h2>Dashboard</h2>
        <ErrorMessage message={error} />
      </section>
    )
  }

  return (
    <section className="dashboard-page">
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <StatCard title="Users" value={formatNumber(stats.users)} />
        <StatCard title="Products" value={formatNumber(stats.products)} />
        <StatCard title="Catalog Value" value={formatCurrency(stats.revenue)} />
        <StatCard title="Categories" value={formatNumber(stats.categories)} />
      </div>

      <ChartBox data={chartData} />
    </section>
  )
}

export default Dashboard