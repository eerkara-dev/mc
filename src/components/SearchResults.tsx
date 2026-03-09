"use client";

import { useState } from "react";

/* ─── Types ─── */
interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departAirport: string;
  arriveAirport: string;
  duration: string;
  stops: number;
  stopCity?: string;
  price?: number;
  comboPrice?: string;
  nextDay?: boolean;
}

interface TicketClass {
  name: string;
  price: number;
  seats: number;
}

interface DayGroup {
  date: string;
  flights: Flight[];
}

interface DatePill {
  day: string;
  date: string;
  price: number;
  active: boolean;
}

/* ─── Inline SVG Icons ─── */
function SwapIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="M16 21l4-4-4-4" />
      <path d="M20 17H4" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ChevronDownIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function SeatIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
      <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5H7V11a2 2 0 0 0-4 0Z" />
      <path d="M5 18v2" />
      <path d="M19 18v2" />
    </svg>
  );
}

function WifiIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </svg>
  );
}

function MealIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

/* ─── Mock Data ─── */
const outboundDatePills: DatePill[] = [
  { day: "Çar", date: "31.12", price: 110, active: false },
  { day: "Per", date: "01.01", price: 90, active: true },
  { day: "Cum", date: "02.01", price: 202, active: true },
  { day: "Cmt", date: "03.01", price: 123, active: false },
];

const returnDatePills: DatePill[] = [
  { day: "Çar", date: "08.01", price: 135, active: true },
  { day: "Per", date: "09.01", price: 132, active: false },
  { day: "Cum", date: "10.01", price: 198, active: false },
  { day: "Cmt", date: "11.01", price: 203, active: false },
];

const outboundDayGroups: DayGroup[] = [
  {
    date: "Per, 01.01.2026",
    flights: [
      {
        id: "out-1",
        airline: "Turkish Airlines",
        airlineCode: "TK",
        flightNumber: "TK 1598",
        departure: "07:05",
        arrival: "15:05",
        departAirport: "FRA",
        arriveAirport: "AYT",
        duration: "6s",
        stops: 1,
        stopCity: "IST",
        price: 148,
      },
      {
        id: "out-2",
        airline: "Pegasus",
        airlineCode: "PC",
        flightNumber: "PC 5036",
        departure: "13:35",
        arrival: "19:00",
        departAirport: "FRA",
        arriveAirport: "AYT",
        duration: "3s 25d",
        stops: 0,
        price: 90,
      },
      {
        id: "out-3",
        airline: "Turkish Airlines",
        airlineCode: "TK",
        flightNumber: "TK 1598",
        departure: "07:05",
        arrival: "14:55",
        departAirport: "FRA",
        arriveAirport: "AYT",
        duration: "5s 50d",
        stops: 1,
        stopCity: "IST",
        comboPrice: "700",
      },
    ],
  },
  {
    date: "Cum, 02.01.2026",
    flights: [
      {
        id: "out-4",
        airline: "Lufthansa",
        airlineCode: "LH",
        flightNumber: "LH 96",
        departure: "08:15",
        arrival: "18:15",
        departAirport: "FRA",
        arriveAirport: "AYT",
        duration: "8s",
        stops: 1,
        stopCity: "MUC",
        price: 202,
      },
      {
        id: "out-5",
        airline: "Turkish Airlines",
        airlineCode: "TK",
        flightNumber: "TK 1598",
        departure: "07:05",
        arrival: "14:55",
        departAirport: "FRA",
        arriveAirport: "AYT",
        duration: "5s 50d",
        stops: 1,
        stopCity: "IST",
        comboPrice: "700",
      },
    ],
  },
];

const returnDayGroups: DayGroup[] = [
  {
    date: "Çar, 08.01.2026",
    flights: [
      {
        id: "ret-1",
        airline: "VietJet Air",
        airlineCode: "VF",
        flightNumber: "VF 4005",
        departure: "13:40",
        arrival: "21:00",
        departAirport: "AYT",
        arriveAirport: "FRA",
        duration: "6s 20d",
        stops: 1,
        stopCity: "SAW",
        price: 307,
        nextDay: true,
      },
      {
        id: "ret-2",
        airline: "SunExpress",
        airlineCode: "XQ",
        flightNumber: "XQ 140",
        departure: "10:45",
        arrival: "12:45",
        departAirport: "AYT",
        arriveAirport: "FRA",
        duration: "4s",
        stops: 0,
        price: 182,
      },
    ],
  },
];

const ticketClasses: TicketClass[] = [
  { name: "Light", price: 84.93, seats: 8 },
  { name: "Super Eko", price: 103.93, seats: 5 },
  { name: "Avantaj", price: 118.93, seats: 4 },
  { name: "Comfort Flex", price: 129.93, seats: 3 },
];

/* ─── Airline logo colors ─── */
const airlineColors: Record<string, string> = {
  TK: "#E31937",
  PC: "#FFB800",
  LH: "#00247D",
  XQ: "#F5A623",
  VF: "#E4002B",
};

/* ─── Components ─── */

function MiniSearchBar() {
  return (
    <div className="sticky top-0 z-30 bg-[#F7F7F7] border-b border-[#EBEBEB]">
      <div className="flex items-center justify-center gap-3 px-4 py-2">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-[#EBEBEB] px-4 py-2 shadow-sm">
          <span className="text-sm font-medium text-[#222]">Frankfurt am Main</span>
          <SwapIcon className="text-[#0A82DF] mx-1" />
          <span className="text-sm font-medium text-[#222]">Antalya (AYT)</span>
          <span className="text-[#999] mx-1">|</span>
          <span className="text-sm text-[#555]">01.01.2026</span>
          <span className="text-[#999] mx-1">|</span>
          <span className="text-sm text-[#555]">08.01.2026</span>
          <button className="ml-2 bg-[#0A82DF] hover:bg-[#0971c4] text-white rounded-lg px-3 py-1.5 transition-colors">
            <SearchIcon className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DatePillsRow({ pills }: { pills: DatePill[] }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {pills.map((pill, i) => (
        <button
          key={i}
          className={`flex flex-col items-center px-4 py-2 rounded-xl border min-w-[80px] transition-colors ${
            pill.active
              ? "bg-[rgba(10,130,223,0.10)] border-[#0A82DF] text-[#0A82DF]"
              : "border-[#DCDCDC] text-[#555] hover:border-[#999]"
          }`}
        >
          <span className={`text-xs font-medium ${pill.active ? "text-[#0A82DF]" : "text-[#555]"}`}>
            {pill.day} {pill.date}
          </span>
          <span className={`text-sm font-semibold ${pill.active ? "text-[#0A82DF]" : "text-[#222]"}`}>
            {pill.price} &euro;
          </span>
        </button>
      ))}
    </div>
  );
}

function StopIndicator({ stops }: { stops: number }) {
  if (stops === 0) {
    return (
      <div className="flex items-center gap-[3px]">
        <div className="w-[5px] h-[5px] rounded-full bg-[#0A82DF]" />
        <div className="w-[40px] h-[1px] bg-[#BCBCBC]" />
        <div className="w-[5px] h-[5px] rounded-full bg-[#0A82DF]" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-[3px]">
      <div className="w-[4px] h-[4px] rounded-full bg-[#BCBCBC]" />
      <div className="w-[16px] h-[1px] bg-[#BCBCBC]" />
      <div className="w-[7px] h-[7px] rounded-full bg-[#E27100]" />
      <div className="w-[16px] h-[1px] bg-[#BCBCBC]" />
      <div className="w-[4px] h-[4px] rounded-full bg-[#BCBCBC]" />
    </div>
  );
}

function AirlineLogo({ code }: { code: string }) {
  const bg = airlineColors[code] || "#888";
  return (
    <div
      className="w-[48px] h-[44px] rounded-lg flex items-center justify-center text-white text-xs font-bold"
      style={{ backgroundColor: bg }}
    >
      {code}
    </div>
  );
}

function TicketClassCard({ tc }: { tc: TicketClass }) {
  return (
    <div className="min-w-[150px] bg-white rounded-xl border border-[#EBEBEB] p-3 flex flex-col gap-2">
      <span className="inline-flex self-start px-2 py-0.5 rounded-md text-[11px] font-semibold" style={{ backgroundColor: "rgba(249,175,179,0.11)", color: "#700110" }}>
        {tc.name}
      </span>
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(28,146,24,0.10)", color: "#1C9218" }}>
          {tc.seats}
        </span>
        <span className="text-[11px] text-[#717171]">koltuk</span>
      </div>
      <div className="flex gap-2 text-[#717171]">
        <BagIcon />
        <SeatIcon />
        <WifiIcon />
        <MealIcon />
      </div>
      <div className="mt-auto pt-1">
        <span className="text-[18px] font-semibold text-[#222]">{tc.price.toFixed(2)}&euro;</span>
      </div>
    </div>
  );
}

function FlightCard({ flight, defaultExpanded = false }: { flight: Flight; defaultExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-[#F0F0F0] last:border-b-0">
      {/* Collapsed row */}
      <div
        className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Route info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex flex-col items-center">
            <span className="text-[18px] font-medium text-[#222]">{flight.departure}</span>
            <span className="text-[11px] text-[#717171]">{flight.departAirport}</span>
          </div>
          <div className="flex flex-col items-center gap-1 min-w-[80px]">
            <span className="text-[11px] text-[#999]">{flight.duration}</span>
            <StopIndicator stops={flight.stops} />
            {flight.stops > 0 && flight.stopCity && (
              <span className="text-[10px] text-[#999]">{flight.stops} aktarma ({flight.stopCity})</span>
            )}
            {flight.stops === 0 && (
              <span className="text-[10px] text-[#289E00]">Direkt</span>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="text-[18px] font-medium text-[#222]">{flight.arrival}</span>
              {flight.nextDay && (
                <span className="text-[10px] font-medium text-[#0A82DF]">+1</span>
              )}
            </div>
            <span className="text-[11px] text-[#717171]">{flight.arriveAirport}</span>
          </div>
        </div>

        {/* Airline */}
        <div className="flex items-center gap-2">
          <AirlineLogo code={flight.airlineCode} />
          <div className="flex flex-col">
            <span className="text-[13px] text-[#222]">{flight.airline}</span>
            <span className="text-[12px] text-[#717171]">{flight.flightNumber}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 min-w-[100px] justify-end">
          {flight.comboPrice ? (
            <span
              className="px-3 py-1 rounded-lg text-[13px] font-semibold"
              style={{ backgroundColor: "rgba(28,146,24,0.09)", color: "#1C9218" }}
            >
              Gidis+Donus {flight.comboPrice} &euro;
            </span>
          ) : (
            <span className="text-[18px] font-semibold text-[#222]">{flight.price} &euro;</span>
          )}
          <ChevronDownIcon
            className={`text-[#999] transition-transform ${expanded ? "rotate-180" : ""}`}
            size={18}
          />
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="bg-[#FAFAFA] px-4 py-3 border-t border-[#F0F0F0]">
          <div className="flex items-center gap-3 text-sm text-[#555] mb-3">
            <span className="font-medium text-[#222]">Per, 01.01.2026</span>
            <span className="text-[#999]">
              {flight.departAirport} {flight.departure} &rarr; {flight.arriveAirport} {flight.arrival} &bull; {flight.duration} &bull; {flight.flightNumber}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[13px] text-[#289E00] font-medium">13 bilet var.</span>
            <button className="px-3 py-1 border border-[#0A82DF] text-[#0A82DF] rounded-lg text-[13px] font-medium hover:bg-[rgba(10,130,223,0.05)] transition-colors">
              Teklife ekle
            </button>
          </div>
          {/* Ticket classes */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {ticketClasses.map((tc) => (
              <TicketClassCard key={tc.name} tc={tc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DayGroupSection({ group }: { group: DayGroup }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="mb-4">
      {/* Day header */}
      <div className="bg-[#EBEBEB] rounded-t-[12px] px-4 py-2.5 flex items-center justify-between">
        <span className="text-[14px] font-semibold text-[#222]">{group.date}</span>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#555] bg-white px-2.5 py-1 rounded-full border border-[#DCDCDC]">Bagaj Dahil</span>
          <span className="text-[12px] text-[#555] bg-white px-2.5 py-1 rounded-full border border-[#DCDCDC]">Direkt Ucuslar</span>
          <span className="text-[12px] text-[#555] bg-white px-2.5 py-1 rounded-full border border-[#DCDCDC]">Havayoluna gore</span>
          <span className="text-[12px] text-[#555] bg-white px-2.5 py-1 rounded-full border border-[#DCDCDC]">Fiyata gore</span>
          <button onClick={() => setCollapsed(!collapsed)} className="ml-1">
            <ChevronDownIcon className={`text-[#555] transition-transform ${collapsed ? "rotate-180" : ""}`} size={18} />
          </button>
        </div>
      </div>
      {/* Flight cards */}
      {!collapsed && (
        <div className="bg-white border border-[#EBEBEB] border-t-0 rounded-b-[17px] overflow-hidden">
          {group.flights.map((f) => (
            <FlightCard key={f.id} flight={f} defaultExpanded={f.id === "out-2"} />
          ))}
        </div>
      )}
    </div>
  );
}

function FlightColumn({
  type,
  title,
  pills,
  dayGroups,
}: {
  type: "outbound" | "return";
  title: string;
  pills: DatePill[];
  dayGroups: DayGroup[];
}) {
  const isOutbound = type === "outbound";
  const badgeText = isOutbound ? "Gidis" : "Donus";
  const badgeBg = isOutbound ? "rgba(40,158,0,0.10)" : "rgba(226,113,0,0.10)";
  const badgeColor = isOutbound ? "#289E00" : "#E27100";

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="mb-3">
        <span
          className="inline-block px-3 py-1 rounded-lg text-[13px] font-semibold mb-2"
          style={{ backgroundColor: badgeBg, color: badgeColor }}
        >
          {badgeText}
        </span>
        <h2 className="text-[22px] font-bold text-[#222] mb-3">{title}</h2>
        <DatePillsRow pills={pills} />
      </div>

      {/* Day groups */}
      {dayGroups.map((group, i) => (
        <DayGroupSection key={i} group={group} />
      ))}
    </div>
  );
}

function SummaryPanel() {
  return (
    <div className="w-[350px] min-w-[350px] flex flex-col gap-3">
      {/* Top buttons */}
      <div className="flex gap-2">
        <button className="flex-1 py-2 bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl text-[13px] font-medium text-[#555] hover:bg-[#EBEBEB] transition-colors">
          Price Overview
        </button>
        <button className="flex-1 py-2 bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl text-[13px] font-medium text-[#555] hover:bg-[#EBEBEB] transition-colors">
          Price Trends
        </button>
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-[17px] border border-[#EBEBEB] p-5">
        <h3 className="text-[24px] font-bold text-[#222] mb-4">Ozet</h3>

        <div className="flex flex-col gap-3 mb-4">
          <p className="text-[14px] text-[#717171]">
            Henuz <span className="font-bold text-[#222]">Gidis</span> secilmedi.
          </p>
          <p className="text-[14px] text-[#717171]">
            Henuz <span className="font-bold text-[#222]">Donus</span> secilmedi.
          </p>
        </div>

        <div className="h-px bg-[#EBEBEB] mb-4" />

        <div className="flex items-center justify-between mb-4">
          <span className="text-[16px] font-semibold text-[#222]">Toplam</span>
          <span className="text-[16px] font-semibold text-[#222]">-</span>
        </div>

        <div className="h-px bg-[#EBEBEB] mb-4" />

        {/* Teklif section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] font-medium text-[#222]">Teklif</span>
            <span className="text-[13px] text-[#999]">bos</span>
          </div>
          <button
            disabled
            className="w-full py-2 rounded-xl text-[13px] font-medium bg-[#C2C2C2] text-[#717171] cursor-not-allowed"
          >
            Teklifi ac
          </button>
        </div>

        <button
          disabled
          className="w-full py-3 rounded-xl text-[15px] font-semibold bg-[#C2C2C2] text-[#717171] cursor-not-allowed"
        >
          Devam
        </button>

        <p className="text-[11px] text-[#999] mt-3 text-center leading-relaxed">
          Vergi ve ucretler dahildir. Secimi bir sonraki adimda degistirebilirsiniz.
        </p>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export default function SearchResults() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <MiniSearchBar />

      <div className="flex flex-1 gap-5 p-5">
        {/* Left column - Outbound */}
        <FlightColumn
          type="outbound"
          title="Frankfurt/Main (FRA) &rarr; Antalya INTL Airport (AYT)"
          pills={outboundDatePills}
          dayGroups={outboundDayGroups}
        />

        {/* Right column - Return */}
        <FlightColumn
          type="return"
          title="Antalya INTL Airport (AYT) &rarr; Frankfurt/Main (FRA)"
          pills={returnDatePills}
          dayGroups={returnDayGroups}
        />

        {/* Summary panel */}
        <SummaryPanel />
      </div>
    </div>
  );
}
