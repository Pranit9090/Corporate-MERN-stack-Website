import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function Layout() {
  return (
    <div className="flex h-screen bg-white">
      {/* persistent sidebar */}
      <Sidebar />

      {/* rest of the app: navbar + content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        {/* Pages get injected here */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
