import React from 'react';
import { NavLink } from 'react-router-dom';
import { TbEditCircle } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LiaShippingFastSolid } from "react-icons/lia";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-300">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-lg md:text-xl">
        {[
          //{ to: "/add", icon: <IoMdAddCircleOutline className="text-2xl" />, text: "Add" },
          { to: "/edit", icon: <TbEditCircle className="text-2xl" />, text: "Edit" },
          { to: "/orders", icon: <LiaShippingFastSolid className="text-2xl" />, text: "Orders" }
        ].map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 border border-gray-400 border-r-0 px-4 py-3 rounded-l transition-all group
               hover:bg-gray-200 ${isActive ? "bg-gray-300 text-russian_violet font-semibold" : "text-black"}`
            }
          >
            {item.icon}
            <p className="hidden md:block group-hover:text-russian_violet">{item.text}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
