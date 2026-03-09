"use client";

import { useState } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  PlusCircle,
  Search,
  SlidersHorizontal,
  CalendarDays,
  Link2,
  Heart,
  LayoutGrid,
  ChevronRight,
  LogOut,
} from "lucide-react";

const navItems = [
  { icon: PanelLeftClose, label: "Dashboard", id: "dashboard" },
  { icon: PlusCircle, label: "Neue Buchung", id: "new" },
  { icon: Search, label: "Suche", id: "search" },
  { icon: SlidersHorizontal, label: "Einstellungen", id: "settings-nav" },
  { icon: CalendarDays, label: "Kalender", id: "calendar" },
  { icon: Link2, label: "Verbindungen", id: "links" },
  { icon: Heart, label: "Favoriten", id: "favorites" },
  { icon: LayoutGrid, label: "Übersicht", id: "overview" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div
      className={`flex flex-col bg-[#F7F7F7] rounded-tr-2xl rounded-br-2xl transition-all duration-300 ease-in-out min-h-screen relative ${
        collapsed ? "w-[64px]" : "w-[220px]"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-3 px-[22px] py-6 hover:opacity-70 transition-opacity"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <PanelLeftOpen size={20} className="text-black" />
        ) : (
          <PanelLeftClose size={20} className="text-black" />
        )}
        {!collapsed && (
          <span className="text-sm font-medium text-[#222222] whitespace-nowrap">
            Menu
          </span>
        )}
      </button>

      {/* Nav items */}
      <div className="flex-1 flex flex-col gap-1 px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeItem === item.id
                ? "bg-[#EBEBEB]"
                : "hover:bg-[#EBEBEB]/50"
            } ${collapsed ? "justify-center" : ""}`}
            title={item.label}
          >
            <item.icon
              size={20}
              className={
                activeItem === item.id ? "text-[#222222]" : "text-[#555555]"
              }
            />
            {!collapsed && (
              <span
                className={`text-sm whitespace-nowrap ${
                  activeItem === item.id
                    ? "text-[#222222] font-medium"
                    : "text-[#555555]"
                }`}
              >
                {item.label}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Profile area */}
      <div className="relative px-3 pb-6 pt-2">
        <div className="h-px bg-[#E2E8F0] mb-4 mx-1" />
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className={`flex items-center gap-3 w-full p-2 rounded-xl hover:bg-[#EBEBEB]/50 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-sm font-medium flex-shrink-0 ring-2 ring-white">
            AY
          </div>
          {!collapsed && (
            <div className="flex-1 flex items-center justify-between min-w-0">
              <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-medium text-[#222222] truncate max-w-[120px]">
                  Ahmet Yılmaz
                </span>
                <span className="text-[11px] text-[#717171] truncate max-w-[120px]">
                  ahmet@airtuerk.com
                </span>
              </div>
              <ChevronRight
                size={14}
                className={`text-[#717171] transition-transform ${
                  profileOpen ? "rotate-90" : ""
                }`}
              />
            </div>
          )}
        </button>

        {/* Profile dropdown */}
        {profileOpen && (
          <div
            className={`absolute bottom-full mb-2 bg-white rounded-xl shadow-lg border border-[#EBEBEB] py-2 z-50 ${
              collapsed ? "left-[64px]" : "left-3 right-3"
            }`}
            style={collapsed ? { minWidth: 200 } : {}}
          >
            <div className="px-4 py-2 border-b border-[#EBEBEB]">
              <p className="text-sm font-medium text-[#222222]">Ahmet Yılmaz</p>
              <p className="text-xs text-[#717171]">ahmet@airtuerk.com</p>
              <p className="text-xs text-[#717171] mt-1">Agentur: AirTuerk GmbH</p>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#717171] hover:bg-[#F7F7F7] transition-colors">
              <SlidersHorizontal size={16} />
              Profil Ayarları
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#D32F2F] hover:bg-[#FFF5F5] transition-colors">
              <LogOut size={16} />
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
