import { Fragment } from "react";
import { useGetUserNameQuery } from "../features/users/usersApiSlice";
import { logOut } from "../features/auth/authSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdAnnouncement } from "react-icons/md";
import HeaderPanelOverview from "../components/headerPanels/HeaderPanelOverview";
import { useSelector, useDispatch } from "react-redux";
import HeaderPanelPortfolio from "../components/headerPanels/HeaderPanelPortfolio";
import {
  selectCurrentPortfolio,
  setSelectedPortfolio,
} from "../features/stockdivSlice";
import SearchTickerOrName from "../components/SearchTickerOrName";
import HeaderPanelTicker from "../components/headerPanels/HeaderPanelTicker";
import { Listbox, Transition } from "@headlessui/react";
import { useGetPortfoliosQuery } from "../features/portfolio/portfolioApiSlice";
import { HiChevronUpDown, HiCheck } from "react-icons/hi2";

function MainLayout() {
  const dispatch = useDispatch();

  const { data: portfolios } = useGetPortfoliosQuery(""); // todo: check why we need the argument

  const navigate = useNavigate();
  const location = useLocation();

  const selectedPortfolio = useSelector(selectCurrentPortfolio);

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

  const selectedPortfolioChanged = (e: string) => {
    console.log(e);
    dispatch(setSelectedPortfolio(e));
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
            <div>
              <Listbox
                value={selectedPortfolio}
                onChange={selectedPortfolioChanged}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selectedPortfolio}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <HiChevronUpDown
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options>
                      <div className="p-3 bg-white">
                        {portfolios?.map((portfolio: string, index: number) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={portfolio}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {portfolio}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <HiCheck
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </div>
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
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
