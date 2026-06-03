import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

function extractData(response) {
  if (Array.isArray(response)) return response
  if (response && Array.isArray(response.data)) return response.data
  return []
}

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => setActivities(extractData(json)))
      .catch((err) => setError(err.message))
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
