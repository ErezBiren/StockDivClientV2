import {
  useGetUserMessagesQuery,
  useGetUserNameQuery,
} from "../features/users/usersApiSlice";
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
import Dropdown from "../components/common/Dropdown";
import TooltipStock from "../components/common/TooltipStock";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useGetPortfoliosQuery } from "../features/portfolio/portfolioApiSlice";
import {
  selectCurrentPortfolio,
  setSelectedPortfolio,
} from "../features/stockdivSlice";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedPortfolio = useSelector(selectCurrentPortfolio);
  const { data: portfolios } = useGetPortfoliosQuery("");
  const { data: userName } = useGetUserNameQuery({});
  const { data: messages } = useGetUserMessagesQuery();

  console.log(messages);

  const currentRoute = location.pathname;

  function goToDonate() {
    window.open("https://www.paypal.me/StockDiv", "_blank");
  }

  function handleLogOut() {
    logOut();
    navigate("/login");
  }

  function getHeaderPanelByRoute() {
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
  }

  function selectedPortfolioChanged(e: string) {
    dispatch(setSelectedPortfolio(e));
  }

  function goToAnnouncements() {
    navigate("/announcements");
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="fixed top-0 z-50 w-full">
        <div className="shadow-lg bg-headerBackground ">
          <div className="flex flex-row justify-between">
            <span className="flex flex-row items-center gap-2 mx-4 my-4">
              <TooltipStock content="donating is caring :)">
                <button
                  className="px-2 py-1 mr-2 text-white bg-green-700 rounded"
                  onClick={goToDonate}
                >
                  DONATE
                </button>
              </TooltipStock>
              <span className="font-bold text-indigo">{`Hello ${userName}`}</span>

              <TooltipStock content="Settings">
                <span className="cursor-pointer">
                  <IoMdSettings className="fill-iconsColor" />
                </span>
              </TooltipStock>
              <TooltipStock content="Overview">
                <span
                  className="cursor-pointer"
                  onClick={() => navigate("/overview")}
                >
                  <FaHome className="cursor-pointer fill-iconsColor" />
                </span>
              </TooltipStock>
            </span>
            <span className="flex flex-row items-center gap-2 mx-4 my-4">
              {messages?.length > 0 && portfolios?.length > 0 && (
                <TooltipStock content="Announcements">
                  <span
                    className="flex flex-row cursor-pointer"
                    onClick={goToAnnouncements}
                  >
                    <span className="bg-[#f44336] text-xs px-2 text-white rounded">
                      {messages?.length}
                    </span>
                    <MdAnnouncement className="fill-iconsColor" />
                  </span>
                </TooltipStock>
              )}
              <TooltipStock content="LogOut">
                <span className="cursor-pointer" onClick={handleLogOut}>
                  <FiLogOut className="stroke-iconsColor" />
                </span>
              </TooltipStock>
            </span>
          </div>
          <div className="flex flex-row justify-between px-3">
            <Dropdown
              items={portfolios}
              selectedItem={selectedPortfolio}
              onItemChanged={selectedPortfolioChanged}
            />
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
