import {
  Fragment,
  useState,
} from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";
import { AiOutlineCheck } from "react-icons/ai";
import { useLazyGetTickerSearchQuery } from "../features/ticker/tickerApiSlice";

const SearchTickerOrName = () => {

  const [trigger, result] = useLazyGetTickerSearchQuery();

  const [selected, setSelected] = useState();
  const [query, setQuery] = useState("");

  const triggerSearch = (e) => {
    const dataToSearch = e.target.value;
    if(dataToSearch === '' || dataToSearch.length < 3) return;
    trigger(e.target.value);
  };

  return (
    <div title="Enter 3 chars minimum to see available tickers">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0"
              displayValue={(item) => item.name}
              onChange={(event) => setQuery(event.target.value)}
              // onKeyDown={searchKeyDown}
              onKeyDownCapture={triggerSearch}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {result?.data?.length === 0 && query !== "" ? (
                <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                  Nothing found.
                </div>
              ) : (
                result?.data?.map((item) => (
                  <Combobox.Option
                    key={item.ticker}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 border-b-2 border-gray-500${
                        active ? "bg-gray-400" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.ticker}
                        </span>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-gray-400"
                            }`}
                          >
                            <AiOutlineCheck
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <span className="mt-2 text-xs">Search ticker/name</span>
    </div>
  );
};

// const SearchTickerOrName = () => {
//   return (
//     <span className="flex flex-row items-center gap-2 mx-4 mb-4">
//       <div>
//         <input
//           type="text"
//           id="success"
//           className="bg-green-50 border-b-2 border-green-500 text-green-900  placeholder-green-700  text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 "
//         />
//         <span className="mt-2 text-xs">Search ticker/name</span>
//       </div>
//     </span>
//   );
// };

export default SearchTickerOrName;
