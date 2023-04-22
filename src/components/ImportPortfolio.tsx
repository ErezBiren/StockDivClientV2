import { ChangeEvent, useState } from "react";

const ImportPortfolio = () => {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const importFile = () => {
    console.log(file);
  };

  return (
    <div className="relative w-full max-w-2xl max-h-full text-left">
      {/* <!-- Modal content --> */}
      <div className="relative bg-[#31ccec] rounded-lg shadow ">
        {/* <!-- Modal header --> */}
        <div className="flex items-start justify-between p-4 border-b rounded-t ">
          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed">
              Import your portfolio from a csv file or search for a ticker to
              add a transaction manually
            </p>
          </div>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
            data-modal-hide="defaultModal"
          >
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* <!-- Modal body --> */}
        <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed">
            File format: Share price instead of total price ticker, quantity,
            total price, date (yyyy-mm-dd), portfolio, commissions, currency *
            Commissions and currency are optional * Negative quantity represents
            a sell transaction
          </p>
        </div>
        <input type="file" onChange={handleFileChange} accept=".csv" />
        <button
          data-modal-hide="defaultModal"
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
          onClick={importFile}
        >
          IMPORT
        </button>
        {/* <!-- Modal footer --> */}
        <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-400 rounded-b ">
          <button
            data-modal-hide="defaultModal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
          >
            ADD TRANSACTION MANUALLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportPortfolio;
