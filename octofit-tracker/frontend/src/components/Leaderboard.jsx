import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard'

function extractData(response) {
  if (Array.isArray(response)) return response
  if (response && Array.isArray(response.data)) return response.data
  return []
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => setEntries(extractData(json)))
      .catch((err) => setError(err.message))
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
