import { FormEvent, useState } from "react";
import { useRenamePortfolioMutation } from "../../features/portfolio/portfolioApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { showError, showNotification } from "../../utils/utils";
import {
  selectCurrentPortfolio,
  setSelectedPortfolio,
} from "../../features/stockdivSlice";

const ChangePortfolioNameDialog = () => {
  const portfolio = useSelector(selectCurrentPortfolio);
  const [newPortfolioName, setNewPortfolioName] = useState("");

  const dispatch = useDispatch();
  const [renamePortfolio] = useRenamePortfolioMutation();

  function submitNewTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    renamePortfolio({ portfolio: portfolio, newName: newPortfolioName })
      .unwrap()
      .then((response) => {
        if (response.data.error) {
          showNotification(response.data.error);
        } else {
          dispatch(setSelectedPortfolio(newPortfolioName));
        }
      })
      .catch((err) => {
        showError(err.data.error);
      });
  }

  return (
    <form
      className="flex flex-col items-start bg-drawerBackground h-[100%] gap-5 p-5"
      onSubmit={submitNewTransaction}
    >
      <div className="text-xl font-semibold">Rename Portfolio</div>
      <div>Enter portfolio name</div>
      <input
        value={newPortfolioName}
        type="text"
        name="name"
        id="name"
        className="bg-transparent border-0 border-b-2"
        onChange={(e) => {
          setNewPortfolioName(e.target.value);
        }}
      />

      <button type="submit" className="self-end">
        ok
      </button>
    </form>
  );
};

export default ChangePortfolioNameDialog;
