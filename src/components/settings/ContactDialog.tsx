import { FormEvent } from "react";
import LogoImage from "../../assets/logo.png";

const ContactDialog = () => {
  function submitNewTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    </form>
  );
};

export default ContactDialog;
