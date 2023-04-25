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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Overview />} />
          <Route path="/ticker/:ticker" element={<></>} />
          <Route path="/yearlyPaymentMatrix" element={<></>} />
          <Route path="/monthlyDividendsView/:month" element={<></>} />
          <Route path="/dividendAlerts" element={<></>} />
          <Route path="/announcements" element={<></>} />
          <Route path="/portfolio" element={<></>} />
          <Route path="/screener" element={<></>} />
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
