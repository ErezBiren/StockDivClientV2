import { FormEvent, useState } from "react";
import LogoImage from "../../assets/logo.png";
import Splitter from "../common/Splitter";
import TooltipStock from "../common/TooltipStock";
import { IoMdSend } from "react-icons/io";
import { useContactMutation } from "../../features/users/usersApiSlice";
import { showError, showNotification } from "../../utils/utils";

const ContactDialog = () => {
  function submitNewTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const [message, setMessage] = useState<string>();
  const [contact] = useContactMutation();

  function sendFeedback() {
    contact(message ?? "")
      .then((response) => {
        if (response) {
          setMessage("");
          showNotification("Thank you for your feedback, we'll be in touch");
        } else {
          showNotification(response);
        }
      })
      .catch((err) => {
        showError(err);
      });
  }

  return (
    <form
      className="flex flex-col  bg-drawerBackground h-[100%] gap-1 p-5"
      onSubmit={submitNewTransaction}
    >
      <div className="flex flex-row items-center justify-center">
        <img src={LogoImage} alt="logo" style={{ width: "40px" }} />
        <span className="text-2xl ">Contact</span>
      </div>
      <Splitter bgColor="bg-gray-500" />
      <input
        value={message}
        maxLength={200}
        type="text"
        name="notes"
        id="notes"
        className="bg-transparent border-0 border-b-2"
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex flex-row justify-between text-xs">
        <span>What's on your mind?</span>
        <span>{message?.length ?? 0}/200</span>
      </div>
      <div className="flex flex-row justify-end">
        <TooltipStock content="Send">
          <span className="cursor-pointer" onClick={sendFeedback}>
            <IoMdSend />
          </span>
        </TooltipStock>
      </div>
    </form>
  );
};

export default ContactDialog;
