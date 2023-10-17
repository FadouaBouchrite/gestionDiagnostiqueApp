import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Diagnostique from './Components/Diagnostique/Diagnostique';
import UserContext from './UserContext';
import { useState } from 'react';
import DiagnostiqueFinale from './Components/DiagnostiqueFinale/DiagnostiqueFinale';
function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="App">
 <UserContext.Provider value={{ userData, setUserData }}>
  <BrowserRouter>
<Routes>

<Route path="/" element={ <Login/>}/>
<Route path="/diagnostique" element={ <Diagnostique/>}/>
<Route path="/diagnoFinal" element={ <DiagnostiqueFinale/>}/>

</Routes>

</BrowserRouter>
    </UserContext.Provider>


     
    </div>
  );
}

export default App;
