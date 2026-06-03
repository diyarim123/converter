import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <h1 className="text-xl font-bold mb-6 text-blue-600">ConvertFlow</h1>
        <nav className="flex flex-col space-y-2">
          <div>Navigation items go here</div>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        
        <Outlet />

      </main>
    </div>
  )
}