import { useNavigate } from "react-router-dom";
import ChartCard from "../components/ChartCard";
import Splitter from "../components/common/Splitter";
import {
  useGetUserMessagesQuery,
  useLastReadMessagesMutation,
} from "../features/users/usersApiSlice";
import { showError, showNotification } from "../utils/utils";

const Announcements = () => {
  const { data: announcements } = useGetUserMessagesQuery();
  const [lastReadMessages] = useLastReadMessagesMutation();
  const navigate = useNavigate();

  function markAsRead() {
    lastReadMessages()
      .unwrap()
      .then((response) => {
        if (response.error) {
          showError(response.error);
        } else {
          showNotification("Mark as read updated successfully");
          navigate("/overview");
        }
      })
      .catch((err) => showError(err));
  }

  return (
    <div className="mt-[160px] flex flex-col items-center gap-4">
      <div className="text-[#1e88e5] cursor-pointer" onClick={markAsRead}>
        Mark all messages as read
      </div>
      {announcements?.map((announcement) => (
        <ChartCard>
          <div className="flex flex-col items-center p-2">
            <div>{announcement.theDate}</div>
            <Splitter />
            <div className="text-center">{announcement.theMessage}</div>
          </div>
        </ChartCard>
      ))}
    </div>
  );
};

export default Announcements;
