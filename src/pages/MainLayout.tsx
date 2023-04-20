import axios from "axios";
import { useState } from "react";

function MainLayout() {
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

  const store = { portfolios: [], token: "X" };
  const userName = "erez";

  return (
    <div className="flex flex-col h-screen">
      <header
        className="bg-white shadow-lg"
        style={{ display: store.token !== "" ? "block" : "none" }}
      >
        <div className="container flex justify-between items-center mx-auto py-2">
          <div className="flex items-center">
            <button className="bg-green-500 text-white rounded px-2 py-1 mr-2">
              Donate
            </button>
            <span className="text-indigo font-bold">{`Hello ${userName}`}</span>
            {store.portfolios.length > 0 && (
              <>
                <button className="text-blue-500 cursor-pointer ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block"
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
                <button className="text-blue-500 cursor-pointer ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default MainLayout;
