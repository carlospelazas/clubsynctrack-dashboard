import { XIcon } from "lucide-react";
import { FC } from "react";

interface CustomModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CustomModal: FC<CustomModalProps> = ({ onClose, title, children }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white  rounded-xl shadow-lg h-[700px] w-[1000px]">
        <div className="flex flex-row items-center justify-between  px-8 py-6 border-b border-custom-gray-400">
          <p className="text-2xl font-bold text-gray-800">{title}</p>
          <button className="" onClick={onClose}>
            <XIcon className="stroke-2 text-red-600" />
          </button>
        </div>
        <div className="px-16 py-5 h-[calc(100%-5rem)]">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
