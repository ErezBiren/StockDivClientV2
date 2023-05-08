import { Listbox, Transition } from '@headlessui/react'
import  { Fragment } from 'react'
import { HiChevronUpDown, HiCheck } from 'react-icons/hi2'
import { useSelector, useDispatch } from "react-redux";
import { useGetPortfoliosQuery } from "../../features/portfolio/portfolioApiSlice";
import {
  selectCurrentPortfolio,
  setSelectedPortfolio,
} from "../../features/stockdivSlice";

const PortfoliosDropdown = () => {
    
    const dispatch = useDispatch();
  const selectedPortfolio = useSelector(selectCurrentPortfolio);
    

    const { data: portfolios } = useGetPortfoliosQuery(""); // todo: check why we need the argument

    const selectedPortfolioChanged = (e: string) => {
        dispatch(setSelectedPortfolio(e));
      };

  return (
    <div>
    <Listbox
      value={selectedPortfolio}
      onChange={selectedPortfolioChanged}
    >
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selectedPortfolio}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <HiChevronUpDown
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options>
            <div className="p-3 bg-white">
              {portfolios?.map((portfolio: string, index: number) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-amber-100 text-amber-900"
                        : "text-gray-900"
                    }`
                  }
                  value={portfolio}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {portfolio}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <HiCheck
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </div>
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
  )
}

export default PortfoliosDropdown