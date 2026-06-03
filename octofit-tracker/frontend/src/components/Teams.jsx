import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

function extractData(response) {
  if (Array.isArray(response)) return response
  if (response && Array.isArray(response.data)) return response.data
  return []
}

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => setTeams(extractData(json)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-4">Loading teams…</p>
  if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {teams.map((t) => (
            <div className="col" key={t._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{t.name}</h5>
                  {t.region && (
                    <p className="card-text text-muted">
                      <small>Region: {t.region}</small>
                    </p>
                  )}
                  {Array.isArray(t.members) && t.members.length > 0 && (
                    <p className="card-text">
                      <strong>Members:</strong>{' '}
                      {t.members.map((m) => m.username).join(', ')}
                    </p>
                  )}
                </div>
                <div className="card-footer text-muted">
                  <small>{Array.isArray(t.members) ? t.members.length : 0} member(s)</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
