import { useEffect, useState } from 'react'
import apiBase from '../apiBase'

interface User {
  _id: string
  username: string
  fullName?: string
  email?: string
  age?: number
  team?: { name: string; region?: string }
}

function extractData<T>(response: unknown): T[] {
  if (Array.isArray(response)) return response as T[]
  const r = response as Record<string, unknown>
  if (r && Array.isArray(r.data)) return r.data as T[]
  return []
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${apiBase}/users/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => setUsers(extractData<User>(json)))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-4">Loading users…</p>
  if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <strong>{u.username}</strong>
                  </td>
                  <td>{u.fullName ?? '—'}</td>
                  <td>{u.email ?? '—'}</td>
                  <td>{u.age ?? '—'}</td>
                  <td>{u.team?.name ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
