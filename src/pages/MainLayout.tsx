import { useGetUserNameQuery } from "../features/users/usersApiSlice";
import { logOut } from "../features/auth/authSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdAnnouncement } from "react-icons/md";
import HeaderPanelOverview from "../components/headerPanels/HeaderPanelOverview";
import HeaderPanelPortfolio from "../components/headerPanels/HeaderPanelPortfolio";
import SearchTickerOrName from "../components/header/SearchTickerOrName";
import HeaderPanelTicker from "../components/headerPanels/HeaderPanelTicker";
import PortfoliosDropdown from "../components/header/PortfoliosDropdown";

function MainLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  const { data: userName } = useGetUserNameQuery({});

  const currentRoute = location.pathname;

  const goToDonate = () => {
    window.open("https://www.paypal.me/StockDiv", "_blank");
  };

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  const getHeaderPanelByRoute = () => {
    const routeFirstFragment = currentRoute.split("/")[1];

    switch (routeFirstFragment) {
      case "portfolio":
        return <HeaderPanelPortfolio />;
      case "ticker":
        return <HeaderPanelTicker />;
      case "":
      case "overview":
        return <HeaderPanelOverview />;
      default:
        <></>;
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="fixed top-0 z-50 w-full">
        <div className="shadow-lg bg-headerBackground ">
          <div className="flex flex-row justify-between">
            <span className="flex flex-row items-center gap-2 mx-4 my-4">
              <button
                className="px-2 py-1 mr-2 text-white bg-green-700 rounded"
                onClick={goToDonate}
                title="donating is caring :)"
              >
                DONATE
              </button>
              <span className="font-bold text-indigo">{`Hello ${userName}`}</span>
              <span className="cursor-pointer" title="Settings">
                <IoMdSettings className="fill-iconsColor" />
              </span>
              <span
                className="cursor-pointer"
                title="Overview"
                onClick={() => navigate("/overview")}
              >
                <FaHome className="cursor-pointer fill-iconsColor" />
              </span>
            </span>
            <span className="flex flex-row items-center gap-2 mx-4 my-4">
              <span className="cursor-pointer" title="Announcements">
                <MdAnnouncement className="fill-iconsColor" />
              </span>
              <span
                className="cursor-pointer"
                title="LogOut"
                onClick={handleLogOut}
              >
                <FiLogOut className="stroke-iconsColor" />
              </span>
            </span>
          </div>
          <div className="flex flex-row justify-between px-3">
            <PortfoliosDropdown />
            <SearchTickerOrName />
          </div>
        </div>
        <div className="flex justify-center">{getHeaderPanelByRoute()}</div>
      </header>
      <Outlet />
    </div>
  );
}

export default MainLayout;
