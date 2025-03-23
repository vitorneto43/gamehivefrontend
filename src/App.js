import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './components/Home/Home';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Sucesso from './components/Pagamento/Sucesso';
import Cancelado from './components/Pagamento/Cancelado'; // ⬅️ Importa o componente da página cancelada

import Sobre from './components/Sobre/Sobre';
import FAQ from './components/FAQ/FAQ';
import Contato from './components/Contato/Contato';
import Diretorio from './components/Diretorio/Diretorio';
import Termos from './components/Termos/Termos';
import Privacidade from './components/Privacidade/Privacidade';
import CookiesPolicy from './components/Cookies/CookiesPolicy';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />

          <main style={{ flex: '1', padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />

              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/sucesso" element={<Sucesso />} />
              <Route path="/cancelado" element={<Cancelado />} /> {/* ⬅️ Adiciona aqui */}

              <Route path="/sobre" element={<Sobre />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/diretorio" element={<Diretorio />} />
              <Route path="/termos" element={<Termos />} />
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/cookies" element={<CookiesPolicy />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;



