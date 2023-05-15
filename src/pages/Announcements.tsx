const Announcements = () => {
  const mockedAnnouncements: { theDate: string; theMessage: string }[] =
    [
      {
        theDate: new Date().toString(),
        theMessage: "111",
      },
      {
        theDate: new Date().toString(),
        theMessage: "222",
      },
    ];

  return (
    <div className="mt-[160px] flex flex-col items-center">
      <div className="text-blue-400 cursor-pointer">
        Mark all messages as read
      </div>
      {mockedAnnouncements.map((announcement) => (
        <span>
          <span>{announcement.theDate}</span>
          <span>{announcement.theMessage}</span>
        </span>
      ))}
    </div>
  );
};

export default Announcements;
