import ChartCard from "../components/ChartCard";
import Splitter from "../components/common/Splitter";
import { useGetUserMessagesQuery } from "../features/users/usersApiSlice";

const Announcements = () => {
  const { data: announcements } = useGetUserMessagesQuery();

  return (
    <div className="mt-[160px] flex flex-col items-center">
      <div className="text-blue-400 cursor-pointer">
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
