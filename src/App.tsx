import "./App.css";
import ErrorNotFound from "./pages/ErrorNotFound";
import Login from "./features/auth/Login";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import ImportPortfolio from "./components/ImportPortfolio";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Overview from "./pages/Overview";

function App() {
  return (
    <div>
      <MainLayout />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/ticker/:ticker" element={<></>} />
        <Route path="/yearlyPaymentMatrix" element={<></>} />
        <Route path="/monthlyDividendsView/:month" element={<></>} />
        <Route path="/dividendAlerts" element={<></>} />
        <Route path="/announcements" element={<></>} />
        <Route path="/portfolio" element={<></>} />
        <Route path="/screener" element={<></>} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
