import PortfoliosDropdown from "../header/PortfoliosDropdown";

const AddTransactionDialog = () => {
  const ticker = "1";
  const portfolio = "1";

  return (
    <div className="flex flex-col items-center bg-drawerBackground h-[100%]">
      <span>
        Add transaction to {ticker} in portfolio   <PortfoliosDropdown readOnly={true} />
      </span>
      
    </div>
  );
};

export default AddTransactionDialog;
