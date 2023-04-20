import "./App.css";
import ErrorNotFound from "./pages/ErrorNotFound";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/overview" element={<></>} />
      <Route path="/ticker/:ticker" element={<></>} />
      <Route path="/yearlyPaymentMatrix" element={<></>} />
      <Route path="/monthlyDividendsView/:month" element={<></>} />
      <Route path="/dividendAlerts" element={<></>} />
      <Route path="/announcements" element={<></>} />
      <Route path="/portfolio" element={<></>} />
      <Route path="/screener" element={<></>} />
      <Route path="*" element={<ErrorNotFound />} />
    </Routes>
  );
}

export default App;
