import { useEffect, useState } from 'react'
import apiBase from '../apiBase'

interface Activity {
  _id: string
  type: string
  durationMinutes: number
  caloriesBurned?: number
  performedAt?: string
  user?: { username: string; fullName?: string }
  team?: { name: string }
}

function extractData<T>(response: unknown): T[] {
  if (Array.isArray(response)) return response as T[]
  const r = response as Record<string, unknown>
  if (r && Array.isArray(r.data)) return r.data as T[]
  return []
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${apiBase}/activities/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => setActivities(extractData<Activity>(json)))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-4">Loading activities…</p>
  if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>User</th>
                <th>Team</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a) => (
                <tr key={a._id}>
                  <td>{a.type}</td>
                  <td>{a.durationMinutes}</td>
                  <td>{a.caloriesBurned ?? '—'}</td>
                  <td>{a.user?.username ?? '—'}</td>
                  <td>{a.team?.name ?? '—'}</td>
                  <td>{a.performedAt ? new Date(a.performedAt).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
