import "./App.css";
import ErrorNotFound from "./pages/ErrorNotFound";
import Login from "./features/auth/Login";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./features/mainLayout/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mainLayout" element={<MainLayout />} />
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
