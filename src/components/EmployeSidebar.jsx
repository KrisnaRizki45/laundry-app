import React, { useState } from 'react';
import {
  MdMenuOpen,
  MdOutlineDashboard,
  MdLogout,
  MdExpandLess,
  MdExpandMore,
} from 'react-icons/md';
import {
  FaProductHunt,
  FaUserCircle,
} from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/authProvider'; // 🔥 Import auth context

const EmployeSidebar = () => {
  const [open, setOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const { setToken, userInfo } = useAuth();

  const handleToggleSidebar = () => setOpen(!open);
  const handleToggleSubmenu = (label) => {
    setExpandedMenu((prev) => (prev === label ? null : label));
  };

  const menuItems = [
    {
      icon: <MdOutlineDashboard size={22} />,
      label: 'Dashboard',
      to: 'employe/dashboard',
    },
    {
      icon: <FaProductHunt size={22} />,
      label: 'Manajemen Produk',
      to: 'employe/products'
    },
    {
      icon: <FaUserCircle size={22} />,
      label: 'Manajemen Pelanggan',
      to: 'employe/customer'
    },
    {
      icon: <AiOutlineShoppingCart size={22} />,
      label: 'Manajemen Transaksi',
      to: 'employe/transaction'
    },
  ];

  return (
    <nav className={`bg-blue-600 text-white min-h-screen shadow-md flex flex-col p-2 transition-all duration-300 ${open ? 'w-64' : 'w-20'}`}>
      
      {/* Header */}
      <div className="h-16 flex items-center px-2">
        {open && (
          <span className="text-xl font-bold transition-all">Laundry</span>
        )}
        <button
          onClick={handleToggleSidebar}
          className="ml-auto p-3 rounded hover:bg-blue-500 transition"
        >
          <MdMenuOpen
            size={26}
            className={`transition-transform duration-300 ${!open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <hr className="my-1 border-t-2 border-gray-300" />

      {/* Menu Items */}
      <ul className="flex-1 mt-4 space-y-1">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            {item.submenu ? (
              <>
                <div
                  onClick={() => open && handleToggleSubmenu(item.label)}
                  className="group flex items-center justify-between gap-2 p-2 rounded-md hover:bg-blue-700 cursor-pointer relative"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {open && <span>{item.label}</span>}
                  </div>
                  {item.submenu && open && (
                    <span>
                      {expandedMenu === item.label ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
                    </span>
                  )}
                  {!open && (
                    <span className="absolute left-full ml-2 z-10 px-2 py-1 bg-white text-black text-sm rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </span>
                  )}
                </div>

                {/* Submenu */}
                {item.submenu && open && (
                  <div
                    className={`ml-8 text-sm overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedMenu === item.label ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-1 py-1">
                      {item.submenu.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <Link
                            to={sub.to}
                            className="hover:text-white text-white/90 cursor-pointer block"
                          >
                            ▸ {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.to}
                className="group flex items-center justify-between gap-2 p-2 rounded-md hover:bg-blue-700 cursor-pointer relative"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {open && <span>{item.label}</span>}
                </div>
                {!open && (
                  <span className="absolute left-full ml-2 z-10 px-2 py-1 bg-white text-black text-sm rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                )}
              </Link>
            )}
          </li>
        ))}

        {/* Logout */}
        <li className="mt-6">
          <div
            className="flex items-center gap-3 p-2 rounded-md hover:bg-red-600 cursor-pointer text-red-200 hover:text-white"
            onClick={() => {
              setToken(null); // 🔥 Gunakan context untuk logout
            }}
          >
            <MdLogout size={22} />
            {open && <span>Logout</span>}
          </div>
        </li>
      </ul>

      {/* Footer */}
      <div className="flex items-center gap-3 p-2 border-t border-white/20 mt-auto">
        <FaUserCircle size={28} />
        <div className={`transition-all duration-300 ${!open ? 'opacity-0 w-0' : 'opacity-100 w-full'}`}>
          <p className="text-sm font-semibold truncate">
            {userInfo?.name || "User"}
          </p>
          <p className="text-xs text-white/80 truncate">
            {userInfo?.email || "user@example.com"}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default EmployeSidebar;