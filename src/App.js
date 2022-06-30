import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import CompletedBudget from './pages/CompletedBudget';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const {user, authIsReady} = useAuthContext()
  return (
    <div className="App">
      { authIsReady &&
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/:id' element={<CompletedBudget />} />
        </Routes>     
      </BrowserRouter>}
    </div>
  );
}

export default App;
