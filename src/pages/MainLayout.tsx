import { useGetUserNameQuery } from "../features/users/usersApiSlice";
import { useGetPortfoliosQuery } from "../features/portfolio/portfolioApiSlice";
import { logOut, selectCurrentToken } from "../features/auth/authSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdAnnouncement } from "react-icons/md";
import HeaderPanelOverview from "../components/HeaderPanelOverview";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import HeaderPanelPortfolio from "../components/HeaderPanelPortfolio";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPortfolio: string = useSelector(
    (state: RootState) => state.stockdiv.selectedPortfolio
  );

  const { data: userName } = useGetUserNameQuery({});
  const { data: portfolios } = useGetPortfoliosQuery({});

  const currentRoute = location.pathname;
  console.log(currentRoute);

  const goToDonate = () => {
    window.open("https://www.paypal.me/StockDiv", "_blank");
  };

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="fixed top-0 z-50 w-full">
        <div className="bg-[#c8e6c9] shadow-lg ">
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
                <IoMdSettings class="fill-[#2196f3]" />
              </span>
              <span
                className="cursor-pointer"
                title="Overview"
                onClick={() => navigate("/overview")}
              >
                <FaHome class="fill-[#2196f3] cursor-pointer" />
              </span>
            </span>
            <span className="flex flex-row items-center gap-2 mx-4 my-4">
              <span className="cursor-pointer" title="Announcements">
                <MdAnnouncement class="fill-[#2196f3]" />
              </span>
              <span
                className="cursor-pointer"
                title="LogOut"
                onClick={handleLogOut}
              >
                <FiLogOut class="stroke-[#2196f3]" />
              </span>
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="flex flex-row items-center gap-2 mx-4 mb-4">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                {selectedPortfolio ?? ""}
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              <div
                id="dropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </span>
            <span className="flex flex-row items-center gap-2 mx-4 mb-4">
              <div>
                <input
                  type="text"
                  id="success"
                  className="bg-green-50 border-b-2 border-green-500 text-green-900  placeholder-green-700  text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 "
                />
                <span className="mt-2 text-xs">Search ticker/name</span>
              </div>
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          {currentRoute === "/portfolio" ? <HeaderPanelPortfolio/> : <HeaderPanelOverview />}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
