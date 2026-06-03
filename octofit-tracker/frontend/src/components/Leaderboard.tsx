import { useEffect, useState } from 'react'
import apiBase from '../apiBase'

interface LeaderboardEntry {
  _id: string
  points: number
  rank?: number
  user?: { username: string; fullName?: string }
  team?: { name: string }
}

function extractData<T>(response: unknown): T[] {
  if (Array.isArray(response)) return response as T[]
  const r = response as Record<string, unknown>
  if (r && Array.isArray(r.data)) return r.data as T[]
  return []
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${apiBase}/leaderboard/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => setEntries(extractData<LeaderboardEntry>(json)))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-4">Loading leaderboard…</p>
  if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Leaderboard</h2>
      {entries.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, index) => (
                <tr key={e._id}>
                  <td>{e.rank ?? index + 1}</td>
                  <td>{e.user?.username ?? '—'}</td>
                  <td>{e.team?.name ?? '—'}</td>
                  <td>
                    <span className="badge bg-success fs-6">{e.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
