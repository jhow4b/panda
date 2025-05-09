import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Termooo from "./components/pages/Termooo";
import Potterdle from "./components/pages/Potterdle";
import PotterdleClassico from "./components/pages/PotterdleClassico";
import PotterdleImagem from "./components/pages/PotterdleImagem";
import PomoDeOuro from "./components/pages/PomoDeOuro";
import PotterdleFrase from "./components/pages/PotterdleFrase";
import PotterdleEmoji from "./components/pages/PotterdleEmoji";

function App() {
  return (
    <Router>

      <Navbar />
        <Routes>
          <Route path="/" element={<Termooo />} />
          <Route path="/potterdle" element={<Potterdle />} />
          <Route path="/potterdle_classico" element={<PotterdleClassico />} />
          <Route path="/potterdle_imagem" element={<PotterdleImagem />} />
          <Route path="/potterdle_emoji" element={<PotterdleEmoji />} />
          <Route path="/potterdle_frase" element={<PotterdleFrase />} />
          <Route path="/pomo_de_ouro" element={<PomoDeOuro />} />
        </Routes>

        <Footer />
    </Router>
  );
}

export default App;
