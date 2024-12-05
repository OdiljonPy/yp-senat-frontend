import { Survey, PollItem } from "@/types";
import Image from "next/image";
import React from "react";
import { stripHtml } from "@/lib/utils";
import { result } from "lodash";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    result?: string,
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, result }) => {
    console.log(result, 'survey')
    return (
        <div
            className={`fixed w-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
        >
            <div
                className={`bg-white-900 container w-full p-6 rounded-lg shadow-lg transition-transform duration-300 ${isOpen ? "translate-y-0 scale-100" : "-translate-y-10 scale-95"
                    }`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold mb-4">Natijalar</h2>
                    <Image className="cursor-pointer" src={"/icons/close.svg"} alt="" width={32} height={32} onClick={onClose} />
                </div>
                <p>{stripHtml(result)}</p>
            </div>
        </div>
    );
};

export default Modal;
