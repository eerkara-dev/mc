"use client";

import { useState } from "react";

/* Compact sidebar icons */
function SidebarToggleIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
}

function PlusCircleIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 17H7A5 5 0 0 1 7 7h2" />
      <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
      <path d="M8 12h8" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

const navItems = [
  { icon: PlusCircleIcon, id: "new", label: "Neue Buchung" },
  { icon: SearchIcon, id: "search", label: "Suche" },
  { icon: SettingsIcon, id: "settings", label: "Einstellungen" },
  { icon: CalendarIcon, id: "calendar", label: "Kalender" },
  { icon: LinkIcon, id: "links", label: "Verbindungen" },
  { icon: HeartIcon, id: "favorites", label: "Favoriten" },
  { icon: GridIcon, id: "overview", label: "Übersicht" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState("search");

  return (
    <div
      className={`flex flex-col bg-[#F7F7F7] h-screen sticky top-0 transition-all duration-200 ease-in-out ${
        collapsed ? "w-[52px] min-w-[52px] items-center" : "w-[200px] min-w-[200px]"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors mt-4 hover:bg-[#EBEBEB] ${
          collapsed ? "" : "ml-[10px]"
        }`}
        title={collapsed ? "Expand" : "Collapse"}
      >
        <SidebarToggleIcon className="text-[#222]" />
      </button>

      {/* Nav icons */}
      <div className={`flex flex-col gap-[2px] mt-1 ${collapsed ? "items-center" : "px-[10px]"}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`flex items-center gap-2 rounded-lg transition-colors ${
              collapsed ? "w-9 h-9 justify-center" : "w-full h-9 px-2"
            } ${
              activeItem === item.id
                ? "bg-[#E5E5E5] text-[#222]"
                : "text-[#888] hover:text-[#555] hover:bg-[#EBEBEB]"
            }`}
            title={item.label}
          >
            <item.icon className={activeItem === item.id ? "text-[#222]" : "text-[#888]"} />
            {!collapsed && (
              <span className={`text-[13px] whitespace-nowrap ${
                activeItem === item.id ? "text-[#222] font-medium" : "text-[#555]"
              }`}>
                {item.label}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Profile avatar */}
      <div className={`pb-4 ${collapsed ? "flex justify-center" : "px-[10px]"}`}>
        <button className={`rounded-full overflow-hidden ring-2 ring-white shadow-sm ${
          collapsed ? "w-9 h-9" : "w-9 h-9"
        }`}>
          <div className="w-full h-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-xs font-medium">
            AY
          </div>
        </button>
      </div>
    </div>
  );
}
