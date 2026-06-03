import { useEffect, useState } from 'react'
import apiBase from '../apiBase'

interface Team {
  _id: string
  name: string
  region?: string
  members?: Array<{ username: string }>
}

function extractData<T>(response: unknown): T[] {
  if (Array.isArray(response)) return response as T[]
  const r = response as Record<string, unknown>
  if (r && Array.isArray(r.data)) return r.data as T[]
  return []
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${apiBase}/teams/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => setTeams(extractData<Team>(json)))
      .catch((err: Error) => setError(err.message))
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
