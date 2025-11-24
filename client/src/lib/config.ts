// Central place for environment-dependent values used across the client.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'
const API_URL = `${API_BASE_URL}/api`

export { API_BASE_URL, API_URL }

