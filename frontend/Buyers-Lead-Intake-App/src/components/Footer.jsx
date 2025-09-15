import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { RiCopyrightLine } from "react-icons/ri";

export default function Footer({personType='seeker'}) {
  return (
    <footer className="bg-gray-200 shadow-2xl flex flex-col md:flex-col">
        <div className="flex justify-around">
            <div className="pt-4 px-3">
                <div className="text-xl font-bold">BUYERS LEAD INTAKE APP</div>
                <div className="text-xs">Manage leads, track history, and export data with ease</div>
            </div>
            <div className="p-3 text-sm">
                <div className="text-xl font-bold">Quick Links</div>
                <div className=''>Home</div>
                <div className=''>Add Item</div>
                <div className=''>History</div>
            </div>
            <div className="pb-4 p-3">
                <div className="text-xl font-bold">Follow Us</div>
                <div className="flex items-center">
                    <div className="p-1"><BsLinkedin size={25}/></div>
                    <div className="p-1"><FaInstagramSquare size={28} /></div>
                    <div className="p-1"><ImFacebook2 size={25} /></div>
                </div>
            </div>
        </div>
        <hr />
        <div className="p-2 flex items-center justify-center"><RiCopyrightLine /> 2025 BUYERS LEAD INTAKE. All Rights Reserved</div>
    </footer>
  );
}
