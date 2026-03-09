"use client";

import {
  Plane,
  ArrowLeftRight,
  Search,
  ChevronDown,
  RefreshCw,
} from "lucide-react";

function TripTypeSelector() {
  return (
    <div className="flex items-center p-[2px] bg-[#EBEBEB] rounded-[10px] border border-[#EBEBEB] w-[419px] h-[43px]">
      <button className="flex-1 flex items-center justify-center gap-[5px] h-full px-5 rounded-[10px] text-[#717171]">
        <Plane size={18} className="text-[#717171]" />
        <span className="text-[13px] font-normal leading-[22px]">Tek Yön</span>
      </button>
      <button className="flex items-center justify-center gap-[5px] w-[151px] h-full px-5 bg-white rounded-[10px] shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
        <ArrowLeftRight size={18} className="text-[#0A82DF]" />
        <span className="text-[15px] font-medium leading-[22px] text-[#222222]">
          Gidiş - Dönüş
        </span>
      </button>
      <button className="flex-1 flex items-center justify-center gap-[5px] h-full px-5 rounded-[10px] text-[#717171]">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-[#717171]">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="7" cy="5" r="2" fill="currentColor"/>
          <circle cx="13" cy="10" r="2" fill="currentColor"/>
          <circle cx="7" cy="15" r="2" fill="currentColor"/>
        </svg>
        <span className="text-[13px] font-normal leading-[22px]">Çoklu Uçuş</span>
      </button>
    </div>
  );
}

function Toggle({ checked = true }: { checked?: boolean }) {
  return (
    <div
      className={`w-8 h-5 rounded-full relative ${
        checked ? "bg-[#0A82DF]" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full absolute top-[2px] shadow-[0_3px_1px_rgba(0,0,0,0.06),0_3px_8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)] transition-all ${
          checked ? "left-[14px]" : "left-[2px]"
        }`}
      />
    </div>
  );
}

function SearchForm() {
  return (
    <div className="bg-white shadow-[0_2px_8px_rgba(17,24,39,0.06)] rounded-xl border border-[#EBEBEB] flex flex-col">
      {/* Top options row */}
      <div className="flex items-center gap-3 px-3 h-12">
        <div className="flex items-center gap-[6px] px-2 py-4 rounded-[10px] shadow-[0_2px_4px_rgba(77,145,225,0.1)] min-w-[110px] max-w-[110px] justify-center">
          <span className="text-[#5E5E5E] text-xs text-center">Havayolu Seç</span>
          <ChevronDown size={12} className="text-[#5E5E5E]" />
        </div>
        <div className="flex items-center gap-[6px] px-2 py-4 rounded-[10px] min-w-[110px] max-w-[110px] justify-center">
          <span className="text-[#5E5E5E] text-xs text-center">1 Yolcu</span>
          <ChevronDown size={12} className="text-[#5E5E5E]" />
        </div>
        <div className="flex items-center gap-2 h-12">
          <span className="text-[#5E5E5E] text-xs">Bagaj Dahil</span>
          <Toggle checked />
        </div>
        <div className="flex items-center gap-2 h-12">
          <span className="text-[#5E5E5E] text-xs">Direkt Uçuşlar</span>
          <Toggle checked />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E5E7EB]" />

      {/* Search fields row */}
      <div className="flex items-center">
        {/* Origin */}
        <div className="w-[260px] h-20 px-6 py-4 flex items-center gap-[2px]">
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[#5E5E5E] text-xs">Nereden</span>
            <span className="text-black text-base font-medium">Origin</span>
          </div>
          <ChevronDown size={16} className="text-[#222222]" />
        </div>

        {/* Swap button */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <ArrowLeftRight size={18} className="text-[#0A82DF]" />
        </div>

        {/* Destination */}
        <div className="w-[260px] h-20 px-6 py-4 flex items-center gap-[2px]">
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[#5E5E5E] text-xs">Nereye</span>
            <span className="text-black text-base font-medium">Origin</span>
          </div>
          <ChevronDown size={16} className="text-[#222222]" />
        </div>

        {/* Departure date */}
        <div className="w-[160px] h-20 p-4 flex items-center gap-[1px]">
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[#5E5E5E] text-xs">Gidiş Tarihi</span>
            <span className="text-black text-base font-medium">01.01.2026</span>
          </div>
          <ChevronDown size={16} className="text-[#222222]" />
        </div>

        {/* Return date */}
        <div className="flex-1 h-20 p-4 max-w-[160px] min-w-[160px] flex items-center gap-[1px]">
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[#5E5E5E] text-xs">Dönüş Tarihi</span>
            <span className="text-black text-base font-medium">01.01.2026</span>
          </div>
          <ChevronDown size={16} className="text-[#222222]" />
        </div>

        {/* Search button */}
        <div className="h-20 p-[10px] flex items-center">
          <button className="w-[68px] h-[68px] bg-[#0A82DF] rounded-2xl flex items-center justify-center hover:bg-[#0971c4] transition-colors">
            <Search size={25} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

const recentSearches = [
  {
    route: "IST → LON",
    type: "Tek Yön",
    passengers: "1 Yetişkin",
    dates: "15.–20. Nisan",
  },
  {
    route: "MUC ⇆ IST",
    type: null,
    passengers: "1 Yetişkin, 2 Çocuk",
    dates: "3–10 Mart",
  },
  {
    route: "PAR ⇆ BER",
    type: null,
    passengers: "2 Yetişkin, 1 Çocuk",
    dates: "5.–12. Mayıs",
  },
  {
    route: "ROM → MAD",
    type: "Tek Yön",
    passengers: "3 Yetişkin",
    dates: "10.–17. Temmuz",
  },
];

function RecentSearches() {
  return (
    <div className="flex self-stretch">
      {recentSearches.map((search, i) => (
        <div
          key={i}
          className="flex-1 p-3 bg-white rounded-2xl border border-[#EBEBEB] flex flex-col"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 flex flex-col gap-[6px]">
              <div className="flex items-center gap-[6px]">
                <span className="text-[#222222] text-sm font-semibold">
                  {search.route}
                </span>
                {search.type && (
                  <span className="text-[#222222] text-[10px]">
                    {search.type}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[#717171] text-xs">{search.passengers}</span>
                <span className="text-[#717171] text-xs">{search.dates}</span>
              </div>
            </div>
            <div className="opacity-80 flex items-center">
              <RefreshCw size={16} className="text-[#0A82DF]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FlightSearch() {
  return (
    <div className="flex flex-col items-center gap-6">
      <TripTypeSelector />
      <SearchForm />
      <RecentSearches />
    </div>
  );
}
