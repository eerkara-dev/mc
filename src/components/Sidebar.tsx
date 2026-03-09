"use client";

import { useState } from "react";
import { Search, PanelLeftClose, PanelLeftOpen } from "./Icons";

/* Inline SVG icons matching the design */
function SearchIcon(p: { size?: number; className?: string }) {
  return (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ListIcon(p: { size?: number; className?: string }) {
  return (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function UsersIcon(p: { size?: number; className?: string }) {
  return (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function FileIcon(p: { size?: number; className?: string }) {
  return (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function ChartIcon(p: { size?: number; className?: string }) {
  return (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
      <path d="M7 15h4" />
      <path d="M7 12h2" />
    </svg>
  );
}

function BellIcon(p: { size?: number; className?: string }) {
  return (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function SettingsIcon(p: { size?: number; className?: string }) {
  return (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function SidebarToggleIcon(p: { size?: number; className?: string }) {
  return (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={p.className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
}

/* Multicheck logo */
function MulticheckLogo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {/* Logo mark — 3 diagonal stripes */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
        <path d="M8 4L14 28" stroke="#1E3A5F" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M14 4L20 28" stroke="#D32F2F" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M20 4L26 28" stroke="#1E3A5F" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      {!collapsed && (
        <span className="text-lg font-semibold text-[#222222] whitespace-nowrap">
          multicheck
        </span>
      )}
    </div>
  );
}

const mainNav = [
  { icon: SearchIcon, label: "Uçuş Ara", id: "search" },
  { icon: ListIcon, label: "Rezervasyonlarım", id: "reservations" },
  { icon: UsersIcon, label: "Yolcularım", id: "passengers" },
  { icon: FileIcon, label: "Teklifler", id: "offers" },
  { icon: ChartIcon, label: "Raporlarım", id: "reports" },
];

const bottomNav = [
  { icon: BellIcon, label: "Bildirimler", id: "notifications" },
  { icon: SettingsIcon, label: "Kullanıcı Ayarları", id: "settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("search");

  return (
    <div
      className={`flex flex-col bg-white border-r border-[#EBEBEB] transition-all duration-300 ease-in-out h-screen sticky top-0 ${
        collapsed ? "w-[72px]" : "w-[280px]"
      }`}
    >
      {/* Header: Logo + toggle */}
      <div className="flex items-center justify-between px-5 py-5">
        <MulticheckLogo collapsed={collapsed} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-[#F7F7F7] rounded-lg transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <SidebarToggleIcon size={20} className="text-[#555]" />
        </button>
      </div>

      {/* Main nav */}
      <div className="flex-1 flex flex-col gap-1 px-3 pt-4">
        {mainNav.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
              activeItem === item.id
                ? "bg-[#F5F5F5]"
                : "hover:bg-[#F9F9F9]"
            } ${collapsed ? "justify-center" : ""}`}
            title={item.label}
          >
            <item.icon
              size={22}
              className={
                activeItem === item.id ? "text-[#222222]" : "text-[#555555]"
              }
            />
            {!collapsed && (
              <span
                className={`text-[15px] whitespace-nowrap ${
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

      {/* Bottom nav */}
      <div className="flex flex-col gap-1 px-3 pb-6 pt-2">
        <div className="h-px bg-[#EBEBEB] mx-1 mb-3" />
        {bottomNav.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
              activeItem === item.id
                ? "bg-[#F5F5F5]"
                : "hover:bg-[#F9F9F9]"
            } ${collapsed ? "justify-center" : ""}`}
            title={item.label}
          >
            <item.icon
              size={22}
              className={
                activeItem === item.id ? "text-[#222222]" : "text-[#555555]"
              }
            />
            {!collapsed && (
              <span
                className={`text-[15px] whitespace-nowrap ${
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
    </div>
  );
}
