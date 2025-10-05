import './App.css'
import Sidebar from "./components/layout/Sidebar";
import PropertyListScreen from "./screens/PropertyListScreen"

function App() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-4 overflow-auto">
        <PropertyListScreen/>
      </main>
    </div>
  )
}

export default App