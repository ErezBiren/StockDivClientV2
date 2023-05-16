import { FormEvent } from "react";
import LogoImage from "../../assets/logo.png";
import Splitter from "../common/Splitter";
import {
  MdFileDownload,
  MdFileUpload,
  MdPassword,
  MdRateReview,
} from "react-icons/md";
import TooltipStock from "../common/TooltipStock";
import { showError, showNotification } from "../../utils/utils";
import { useLazyGetExportTransactionsQuery } from "../../features/users/usersApiSlice";

type SettingsDialogProps = {
  closeAndOpenContact: () => void;
};
const SettingsDialog = ({ closeAndOpenContact }: SettingsDialogProps) => {
  function submitNewTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const [getExportTransactions] = useLazyGetExportTransactionsQuery();

  function exportTransactions() {
    getExportTransactions("user/exportTransactions")
      .unwrap()
      .then((response) => {
        if (!response) {
          showNotification(response);
        } else {
          const blob = new Blob([response]);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          const fileName = "transactions.csv";
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      })
      .catch((error) => {
        showError(error);
      });
  }

  return (
    <form
      className="flex flex-col items-center bg-drawerBackground h-[100%] gap-1 p-5"
      onSubmit={submitNewTransaction}
    >
      <div className="flex flex-row items-center justify-between">
        <img src={LogoImage} alt="logo" style={{ width: "40px" }} />
        <span className="text-2xl ">Settings</span>
        <span className="text-small justify-self-end">3.2.7</span>
      </div>
      <div>
        Click{" "}
        <a
          href="https://poll.ly/pAQ1KeZI5F2FFnNqpFFF"
          className="underline cursor-pointer"
        >
          here
        </a>{" "}
        to suggest or upvote a feature request
      </div>
      <Splitter bgColor="bg-gray-500" />
      <Splitter bgColor="bg-gray-500" />
      <div className="flex flex-row self-end gap-3 py-2">
        <TooltipStock content="Change password">
          <span className="cursor-pointer">
            <MdPassword />
          </span>
        </TooltipStock>
        <TooltipStock content="Export transactions">
          <span className="cursor-pointer" onClick={exportTransactions}>
            <MdFileDownload />
          </span>
        </TooltipStock>
        <TooltipStock content="Import transactions">
          <span className="cursor-pointer">
            <MdFileUpload />
          </span>
        </TooltipStock>
        <TooltipStock content="Contact">
          <span className="cursor-pointer" onClick={closeAndOpenContact}>
            <MdRateReview />
          </span>
        </TooltipStock>
      </div>
      <Splitter bgColor="bg-gray-500" />
      <div className="text-xs">Logo: @luca_pettini</div>
    </form>
  );
};

export default SettingsDialog;
