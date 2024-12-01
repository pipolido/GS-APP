import { useState } from 'react'
import Createfact from './createfact/createfact';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
import Gererstck from './gererstock/gererstck';
import Gererfact from './gererfact/gererfact';
import Gererclt from './gererclt/gererclt';
import Welcome from './welcome/welcome';
import Login from './login/login';
import Signup from './login/signup';
import { EmailProvider } from './contexts/EmailContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import Go from './login/go';

function App() {
  

  return (
    <EmailProvider>
        <Router>
                <div className="App">
                
                    {/* <Routes>
                        <Route path="/create-fact" element={<Createfact/>} />
                        <Route path="/gerer-fact" element={<Gererfact/>} />
                        <Route path="/gerer-clt" element={<Gererclt/>} />
                        
                    </Routes> */}
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/activation" element={<Signup/>} />
                        <Route path="/connexion" element={<Login/>} />
                        <Route path="/go" element={<Go/>} />
                        <Route path="/create-fact" element={<Createfact/>} />
                        <Route path="/gerer-fact" element={<Gererfact/>} />
                        <Route path="/gerer-clt" element={<Gererclt/>} />
                        <Route path="/gerer-stck" element={<Gererstck/>} />
                        
                        
                        
                    </Routes>
                </div>
        </Router>
    </EmailProvider>        
  );
}

export default App;
