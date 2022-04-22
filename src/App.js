import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Navbar from './components/Navbar';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>     
      </BrowserRouter>
    </div>
  );
}

export default App;
