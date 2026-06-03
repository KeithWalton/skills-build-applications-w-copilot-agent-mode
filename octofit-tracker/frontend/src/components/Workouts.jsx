import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

const difficultyColor = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
}

function extractData(response) {
  if (Array.isArray(response)) return response
  if (response && Array.isArray(response.data)) return response.data
  return []
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => setWorkouts(extractData(json)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-4">Loading workouts…</p>
  if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {workouts.map((w) => {
            const difficulty = (w.difficulty ?? '').toLowerCase()
            const badgeColor = difficultyColor[difficulty] ?? 'secondary'
            return (
              <div className="col" key={w._id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{w.name}</h5>
                    {w.description && (
                      <p className="card-text text-muted">{w.description}</p>
                    )}
                    <p className="card-text">
                      <strong>Duration:</strong> {w.durationMinutes} min
                    </p>
                    {w.category && (
                      <p className="card-text">
                        <strong>Category:</strong> {w.category}
                      </p>
                    )}
                  </div>
                  {w.difficulty && (
                    <div className="card-footer">
                      <span className={`badge bg-${badgeColor}`}>{w.difficulty}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
