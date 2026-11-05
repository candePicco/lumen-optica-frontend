import ProtectedRoute from "@/components/ProtectedRoute";

// Todas las páginas dentro de /admin requieren sesión iniciada.
export default function AdminLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
