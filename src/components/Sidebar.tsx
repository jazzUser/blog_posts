interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen}: Props) => {
  return (
  <div
      className={`fixed top-[64px] left-0 bg-base-300 w-[200px] h-full z-50 transition-transform ${
        isOpen ? "transform-none" : "transform -translate-x-full"
      }`}
    >
      <div className="p-4 h-full">
        <ul className="space-y-4 text-center" >      
          <li className="py-2 text-xl border border-gray-300 border-opacity-60 p-4 rounded-md">History</li>
          <li className="py-2 text-xl border border-gray-300 border-opacity-60 p-4 rounded-md">American</li>
          <li className="py-2 text-xl border border-gray-300 border-opacity-60 p-4 rounded-md">Crime</li>
          <li className="py-2 text-xl border border-gray-300 border-opacity-60 p-4 rounded-md">English</li>
          <li className="py-2 text-xl border border-gray-300 border-opacity-60 p-4 rounded-md">French</li>
          <li className="py-2 text-xl border border-gray-300 border-opacity-60 p-4 rounded-md">Fiction</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;


/*
'https://dummyjson.com/posts'
*/