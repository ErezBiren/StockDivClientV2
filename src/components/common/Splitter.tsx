const Splitter = ({ bgColor }: { bgColor?: string }) => {
  return <div className={`w-full ${bgColor ?? "bg-gray-300"} h-[1px]`} />;
};

export default Splitter;
