import ErrorNotFound from "./pages/ErrorNotFound";
import Login from "./features/auth/Login";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
} from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Overview from "./pages/Overview";
import RequireAuth from "./features/auth/RequireAuth";
import Portfolio from "./pages/Portfolio";
import TickerPage from "./pages/TickerPage";
import DividendAlerts from "./pages/DividendAlerts";
import Screener from "./pages/Screener";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Overview />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/ticker/:ticker" element={<TickerPage/>} />
          <Route path="/yearlyPaymentMatrix" element={<></>} />
          <Route path="/monthlyDividendsView/:month" element={<></>} />
          <Route path="/announcements" element={<></>} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/dividendAlerts" element={<DividendAlerts />} />
          <Route path="/screener" element={<Screener/>} />
          <Route path="*" element={<ErrorNotFound />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
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
    </>
  );
}

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>Dang!</div>;
}

export default App;
