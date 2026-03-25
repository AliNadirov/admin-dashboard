import { useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getUsers } from '../../services/userService'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import EmptyState from '../../components/EmptyState/EmptyState'
import DataTable from '../../components/DataTable/DataTable'
import SkeletonTable from '../../components/SkeletonTable/SkeletonTable'
import './Users.css'

function Users() {
  const { searchTerm } = useOutletContext()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const usersPerPage = 9

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    const value = searchTerm.toLowerCase().trim()

    if (!value) return users

    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
      const email = user.email.toLowerCase()

      return fullName.includes(value) || email.includes(value)
    })
  }, [users, searchTerm])

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * usersPerPage
    const endIndex = startIndex + usersPerPage
    return filteredUsers.slice(startIndex, endIndex)
  }, [filteredUsers, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const columns = [
    { key: 'id', label: 'ID' },
    {
      key: 'fullName',
      label: 'Name',
      render: (user) => `${user.firstName} ${user.lastName}`,
    },
    { key: 'email', label: 'Email' },
  ]

  if (loading) {
    return (
      <section className="users-page">
        <div className="users-header">
          <h2>Users</h2>
        </div>

        <SkeletonTable rows={9} columns={3} />
      </section>
    )
  }

  if (error) {
    return (
      <section className="users-page">
        <h2>Users</h2>
        <ErrorMessage message={error} />
      </section>
    )
  }

  return (
    <section className="users-page">
      <div className="users-header">
        <h2>Users</h2>
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState message="No users found." />
      ) : (
        <DataTable
          columns={columns}
          data={paginatedUsers}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={() => setCurrentPage((prev) => prev - 1)}
          onNextPage={() => setCurrentPage((prev) => prev + 1)}
        />
      )}
    </section>
  )
}

export default Users