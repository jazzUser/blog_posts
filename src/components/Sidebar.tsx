interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen }: Props) => {
  return (
    <div
      className={`fixed top-[64px] left-0 bg-base-300 w-[220px] h-full z-50 transition-transform ${
        isOpen ? "transform-none" : "transform -translate-x-full"
      }`}
    >
      <div className="p-4 h-full">
        {/* Accordion for Most Popular */}
        <div className="collapse collapse-plus border border-gray-300 border-opacity-60 rounded-md">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-sm font-medium px-4 py-1 flex items-center justify-between">
            <span className="flex-1 text-left">Most Popular</span>
            {/* Only show the minus icon when the accordion is open */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-5 w-5 stroke-current peer-checked:block hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="collapse-content">
            <ul className="space-y-2 text-center">
              <li className="py-2 text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md">History</li>
              <li className="py-2 text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md">American</li>
              <li className="py-2 text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md">Crime</li>
              <li className="py-2 text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md">English</li>
              <li className="py-2 text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md">French</li>
              <li className="py-2 text-sm border border-gray-300 border-opacity-60 px-3 py-2 rounded-md">Fiction</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
