import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Registration from '../pages/Registration/Registration'
import Users from '../pages/Users/Users'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import '../i18n';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Registration />} />
      <Route
        path='users'
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } />
    </Routes>
  )
}

export default App
