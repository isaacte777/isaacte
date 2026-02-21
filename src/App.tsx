import { BrowserRouter, Routes, Route } from "react-router-dom";
import KappaScore from "./pages/KappaScore";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<KappaScore />} />
    </Routes>
  </BrowserRouter>
);

export default App;
