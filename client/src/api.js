/* =====================================================
   🌍 API BASE CONFIG (DEV + PRODUCTION SAFE)
===================================================== */

// Use environment variable if available (Vercel)
// Otherwise fallback to localhost for development

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://phishguard-jqr9.onrender.com/api";
/* =========================
   FETCH HISTORY (Protected)
========================= */

export const fetchHistory = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.reload();
    return [];
  }

  const res = await fetch(`${API_BASE}/scan/history`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();
    return [];
  }

  if (!res.ok) {
    throw new Error("Failed to fetch history");
  }

  return res.json();
};

/* =========================
   SCAN URL (Protected)
========================= */

export const scanURL = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}/scan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();
    throw new Error("Session expired");
  }

  if (!response.ok) {
    throw new Error("Scan failed");
  }

  return response.json();
};

/* =========================
   DELETE SCAN (ADMIN ONLY)
========================= */

export const deleteHistory = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}/scan/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.reload();
    throw new Error("Session expired");
  }

  if (response.status === 403) {
    throw new Error("Access denied. Admin only.");
  }

  if (!response.ok) {
    throw new Error("Delete failed");
  }

  return response.json();
};