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
import TooltipStock from "../components/common/TooltipStock";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import TickerPropertiesDialog from "../components/ticker/TickerPropertiesDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  setShowAddTransactionDialog,
  setShowTickerPropertiesDialog,
} from "../features/stockdivSlice";
import AddTransactionDialog from "../components/ticker/AddTransactionDialog";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { data: userName } = useGetUserNameQuery({});
  const { show: showPropertiesDialog, tickerUserData } = useSelector(
    (state: RootState) => state.stockdiv.showTickerPropertiesDialog
  );

  const { show: showAddTransactionDialog } = useSelector(
    (state: RootState) => state.stockdiv.showAddTransactionDialog
  );

  console.log(showPropertiesDialog);

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

  const closePropertiesDialog = () => {
    dispatch(
      setShowTickerPropertiesDialog({
        show: false,
        tickerUserData: null,
      })
    );
  };

  const closeAddTransactionDialog = () => {
    dispatch(
      setShowAddTransactionDialog({
        show: false,
      })
    );
  };

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
              <TooltipStock content="Announcements">
                <span className="cursor-pointer">
                  <MdAnnouncement className="fill-iconsColor" />
                </span>
              </TooltipStock>
              <TooltipStock content="LogOut">
                <span className="cursor-pointer" onClick={handleLogOut}>
                  <FiLogOut className="stroke-iconsColor" />
                </span>
              </TooltipStock>
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

      <Drawer
        open={showPropertiesDialog}
        onClose={closePropertiesDialog}
        direction="bottom"
      >
        <TickerPropertiesDialog tickerUserData={tickerUserData} />
      </Drawer>
      <Drawer
        open={showAddTransactionDialog}
        onClose={closeAddTransactionDialog}
        direction="bottom"
      >
        <AddTransactionDialog />
      </Drawer>
    </div>
  );
}

export default MainLayout;
