import { useEffect, useState } from "react";
import { useGetUserNameQuery } from "../features/users/usersApiSlice";
import { useGetPortfoliosQuery } from "../features/portfolio/portfolioApiSlice";
import { selectCurrentToken } from "../features/auth/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import {FaHome} from "react-icons/fa"
import {IoMdSettings} from "react-icons/io"
import {FiLogOut} from "react-icons/fi"
import {MdAnnouncement} from "react-icons/md"



function MainLayout() {
  const { data: userName } = useGetUserNameQuery({});
  const { data: portfolios } = useGetPortfoliosQuery({});

  //     const [importFileContent, setImportFileContent] = useState('');
  //     const dateFormatOptions = ['YYYY-MM-DD', 'DD-MM-YYYY', 'MM-DD-YYYY'];
  //     const [feedback, setFeedback] = useState('');
  //     const [showContactWindow, setShowContactWindow] = useState(false);
  //     const [userName, setUserName] = useState('');
  //     const [loginLoading, setLoginLoading] = useState(false);
  //     const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  //     const [userNameEdit, setUserNameEdit] = useState('');
  //     const [csvToImport, setCsvToImport] = useState(null);
  //     const [importInProcess, setImportInProcess] = useState(false);
  //     const [isSharePrice, setIsSharePrice] = useState(false);
  //     const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');
  //     const searchTickerInput = useRef(null);
  //     const [dataToSearch, setDataToSearch] = useState('');
  //     const [searchListOptions, setSearchListOptions] = useState([]);
  //     const [showSearchResultsMenu, setShowSearchResultsMenu] = useState(false);
  //     const [showNoTransactionsDialog, setShowNoTransactionsDialog] = useState(false);
  //     const [defaultTax, setDefaultTax] = useState(0);
  //     const [decimalDigits, setDecimalDigits] = useState(2);
  //     const [savingSettings, setSavingSettings] = useState(false);
  //     const [sendingFeedback, setSendingFeedback] = useState(false);

  //   const searchKeyDown = (e) => {
  //     if (/[^A-Za-z&]$/.test(e.key)) {
  //       e.preventDefault();
  //     }
  //   };

  //   const sendFeedback = () => {
  //     setSendingFeedback(true);
  //     axios
  //       .post('user/contact', { feedback })
  //       .then((response) => {
  //         if (response.data.error) {
  //           showNotification(response.data.error);
  //         } else {
  //           setShowContactWindow(false);
  //           setFeedback('');
  //           showNotification("Thank you for your feedback, we'll be in touch");
  //         }
  //       })
  //       .catch((err) => {
  //         showAPIError(err);
  //       })
  //       .finally(() => {
  //         setSendingFeedback(false);
  //       });
  //   };

  //   const showContactUsWindow = () => {
  //     setShowContactWindow(true);
  //     setShowSettingsPopup(false);
  //   };

  //   const showAnnouncements = () => {
  //     // router.push({ path: '/announcements' });
  //   };

  //   const gotoYearlyPaymentMatrix = () => {
  //     // router.push({ path: '/yearlyPaymentMatrix' });
  //   };

  //   const importTransactionsWindow = () => {
  //     setShowNoTransactionsDialog(true);
  //   };

  //   const exportTransactions = () => {
  //     setSavingSettings(true);
  //     axios
  //       .get('user/exportTransactions')
  //       .then((response) => {
  //         if (response.data.error) {
  //           showNotification(response.data.error);
  //         } else {
  //           const blob = new Blob([response.data]);
  //           const url = window.URL.createObjectURL(blob);
  //           const link = document.createElement('a');
  //           link.href = url;
  //           let fileName = 'transactions.csv';
  //           link.setAttribute('download', fileName);
  //           document.body.appendChild(link);
  //           link.click();
  //           link.remove();
  //         }
  //       })
  //       .catch((err) => {
  //         showAPIError(err);
  //       })
  //       .finally(() => {
  //         setSavingSettings(false);
  //       });
  //   };

  //   const handlePasswordChange = () => {
  //     setSavingSettings(true);
  //     axios
  //       .patch('user/password', {
  //         oldPassword,
  //         newPassword,
  //       })
  //       .then((response) => {
  //         if (response.data.error) {
  //           showNotification(response.data.error);
  //         } else {
  //           showNotification(
  //             'Password was changed successfully, you must re-login'
  //           );
  //           logout();
  //         }
  //       })
  //       .catch((err) => {
  //         showAPIError(err);
  //       })
  //       .finally(() => {
  //         setSavingSettings(false);
  //       });
  //   };

  const goToDonate = () => {
    window.open("https://www.paypal.me/StockDiv", "_blank");
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="bg-[#c8e6c9] shadow-lg">
        <div className="container flex items-center justify-between py-2 mx-auto">
          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 mr-2 text-white bg-green-700 rounded"
              onClick={goToDonate}
              title="donating is caring :)"
            >
              Donate
            </button>
            <span className="font-bold text-indigo">{`Hello ${userName}`}</span>
             <span className="cursor-pointer" title="Settings"><IoMdSettings /></span>
             <span className="cursor-pointer" title="Overview"><FaHome/></span>
             <span className="cursor-pointer" title="Announcements"><MdAnnouncement/></span>
             <span className="cursor-pointer" title="LogOut"><FiLogOut/></span>
            {/* {portfolios?.length > 0 && (
              <>
                <button className="ml-2 text-blue-500 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8v.01M12 8v.01M7 8v.01M17 12v.01M7 12v.01M17 16v.01M12 16v.01M7 16v.01M17 20v.01M12 20v.01M7 20v.01"
                    />
                  </svg>
                  <span className="ml-1">Settings</span>
                </button>
                <button className="ml-2 text-blue-500 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  />
                </button>
              </>
            )} */}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
