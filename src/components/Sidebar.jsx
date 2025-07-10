import React, { useState } from 'react';
import {
  MdMenuOpen,
  MdOutlineDashboard,
} from 'react-icons/md';
import { IoHomeOutline, IoLogoBuffer } from 'react-icons/io5';
import { FaProductHunt, FaUserCircle } from 'react-icons/fa';
import { TbReportSearch } from 'react-icons/tb';
import { CiSettings } from 'react-icons/ci';

const menuItems = [
  { icon: <IoHomeOutline size={24} />, label: 'Home' },
  { icon: <FaProductHunt size={24} />, label: 'Products' },
  { icon: <MdOutlineDashboard size={24} />, label: 'Dashboard' },
  { icon: <CiSettings size={24} />, label: 'Settings' },
  { icon: <IoLogoBuffer size={24} />, label: 'Logs' },
  { icon: <TbReportSearch size={24} />, label: 'Reports' },
];

function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <nav className={`bg-blue-600 text-white h-screen shadow-md flex flex-col p-2 duration-300 ${open ? 'w-60' : 'w-16'}`}>
      
      {/* Header */}
      <div className="h-16 flex justify-between items-center px-3">
        <span className={`text-xl font-bold transition-all duration-300 ${!open && 'hidden'}`}>
          {/* Bisa ganti logo di sini */}
          Logo
        </span>
        <MdMenuOpen
          size={28}
          onClick={() => setOpen(!open)}
          className={`cursor-pointer transition-transform ${!open && 'rotate-180'}`}
        />
      </div>

      {/* Menu List */}
      <ul className="flex-1 mt-4 space-y-2">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="group relative flex items-center gap-3 p-2 rounded-md hover:bg-blue-800 cursor-pointer transition-all duration-300"
          >
            <div>{item.icon}</div>
            <span className={`whitespace-nowrap transition-all duration-300 ${!open ? 'opacity-0 w-0' : 'opacity-100 w-full'}`}>
              {item.label}
            </span>

            {/* Tooltip when sidebar collapsed */}
            {!open && (
              <span className="absolute left-full ml-2 z-10 px-2 py-1 bg-white text-black text-sm rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Footer - User Info */}
      <div className="flex items-center gap-3 p-2 border-t border-white/20">
        <FaUserCircle size={28} />
        <div className={`transition-all duration-300 ${!open ? 'opacity-0 w-0' : 'opacity-100 w-full'}`}>
          <p className="text-sm font-semibold">Saheb</p>
          <p className="text-xs text-white/80">saheb@gmail.com</p>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
