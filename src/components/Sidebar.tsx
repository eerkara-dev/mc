"use client";

import {
  LayoutGrid,
  Search,
  List,
  Users,
  FileText,
  Map,
  Settings,
  HelpCircle,
  PanelLeftClose,
} from "lucide-react";

const topNavItems = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: Search, label: "Search" },
  { icon: List, label: "Bookings" },
  { icon: Users, label: "Passengers" },
  { icon: FileText, label: "Reports" },
  { icon: Map, label: "Routes" },
];

const bottomNavItems = [
  { icon: HelpCircle, label: "Help" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center bg-[#F7F7F7] rounded-tr-2xl rounded-br-2xl py-6 w-[64px] min-h-screen">
      <div className="p-4 mb-2">
        <PanelLeftClose size={20} className="text-black" />
      </div>

      <div className="flex-1 flex flex-col items-center gap-1 px-4">
        {topNavItems.map((item, i) => (
          <button
            key={i}
            className={`p-3 rounded-xl transition-colors ${
              item.active
                ? "bg-[#EBEBEB]"
                : "hover:bg-[#EBEBEB]/50"
            }`}
            title={item.label}
          >
            <item.icon size={20} className="text-[#222222]" />
          </button>
        ))}
      </div>

      <div className="w-full px-4 my-2">
        <div className="h-px bg-[#E2E8F0]" />
      </div>

      <div className="flex flex-col items-center gap-1 px-4 pb-4">
        {bottomNavItems.map((item, i) => (
          <button
            key={i}
            className="p-3 rounded-full hover:bg-[#EBEBEB]/50 transition-colors"
            title={item.label}
          >
            <item.icon size={20} className="text-[#222222]" />
          </button>
        ))}
      </div>
    </div>
  );
}
