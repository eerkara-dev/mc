"use client";

import {
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronsUpDown,
} from "lucide-react";

type Reservation = {
  timeLeft: string;
  endTime: string;
  urgency: "red" | "yellow" | "default";
  pnr: string;
  airline: string;
  passenger: string;
  paxCount: string;
  flightDate: string;
  flightTime: string;
  price: string;
  priceChange: string;
  priceDirection: "up" | "down";
};

const reservations: Reservation[] = [
  {
    timeLeft: "55dk",
    endTime: "Bitiş: Bugün, 12:36",
    urgency: "red",
    pnr: "46SXBB",
    airline: "XQ",
    passenger: "Muhammed  Yıldız Aktaş",
    paxCount: "6 PAX",
    flightDate: "15.02.2025",
    flightTime: "07:05 - 19:45",
    price: "2746 €",
    priceChange: "+107 €",
    priceDirection: "up",
  },
  {
    timeLeft: "1s 15dk",
    endTime: "Bitiş: Bugün, 13:52",
    urgency: "red",
    pnr: "7KL2M9",
    airline: "TK",
    passenger: "Maria Schmidt",
    paxCount: "6 PAX",
    flightDate: "21.10.2025",
    flightTime: "13:45 - 18:20",
    price: "2746 €",
    priceChange: "+107 €",
    priceDirection: "up",
  },
  {
    timeLeft: "3s 30dk",
    endTime: "Bitiş: Bugün, 15:05",
    urgency: "yellow",
    pnr: "XR45TY",
    airline: "PC",
    passenger: "Hans Weber",
    paxCount: "3 PAX",
    flightDate: "18.11.2025",
    flightTime: "09:30 - 14:15",
    price: "2746 €",
    priceChange: "+107 €",
    priceDirection: "up",
  },
  {
    timeLeft: "24s 00dk",
    endTime: "Bitiş: Bugün, 16:41",
    urgency: "default",
    pnr: "PQ89VN",
    airline: "LH",
    passenger: "Julia Becker",
    paxCount: "5 PAX",
    flightDate: "22.10.2025",
    flightTime: "15:20 - 20:45",
    price: "3116 €",
    priceChange: "124 €",
    priceDirection: "down",
  },
];

function TimeBadge({
  time,
  urgency,
}: {
  time: string;
  urgency: "red" | "yellow" | "default";
}) {
  const styles = {
    red: {
      bg: "bg-[#FFF5F5]",
      border: "border-[#FFE8E8]",
      text: "text-[#ED1C24]",
      icon: "#ED1C24",
    },
    yellow: {
      bg: "bg-[#FFFBEB]",
      border: "border-[#FFF7D6]",
      text: "text-[#92400E]",
      icon: "#92400E",
    },
    default: {
      bg: "bg-white",
      border: "border-[#EBEBEB]",
      text: "text-[#222222]",
      icon: "#C2C2C2",
    },
  };

  const s = styles[urgency];

  return (
    <div
      className={`inline-flex items-center gap-1 px-3 ${s.bg} rounded-full border ${s.border} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`}
    >
      <Clock size={14} color={s.icon} />
      <span className={`${s.text} text-xs font-medium leading-[22px] pb-[2px]`}>
        {time}
      </span>
    </div>
  );
}

function SortIcon() {
  return <ChevronsUpDown size={14} className="text-[#6B7271]" />;
}

function TableHeader() {
  return (
    <div className="flex items-center justify-between p-3 bg-[#F7F7F7] border-t border-b border-[#EBEBEB]">
      <div className="flex items-end gap-0 w-[150px] max-w-[150px]">
        <span className="text-[#6B7271] text-[10px] uppercase leading-[13px]">
          Opsiyon Süresi
        </span>
        <SortIcon />
      </div>
      <div className="flex items-end gap-0 w-20 min-w-[80px] max-w-[80px]">
        <span className="text-[#6B7271] text-[10px] uppercase leading-[13px]">
          airtuerk PNR
        </span>
        <SortIcon />
      </div>
      <div className="flex items-end gap-0 flex-1 max-w-[50px]">
        <span className="text-[#6B7271] text-[10px] leading-[13px]">
          HAVAYOLU
        </span>
        <SortIcon />
      </div>
      <div className="flex items-end gap-0 w-[150px] max-w-[150px]">
        <span className="text-[#6B7271] text-[10px] leading-[13px]">
          YOLCULAR
        </span>
        <SortIcon />
      </div>
      <div className="flex items-end gap-0 w-[100px] min-w-[100px] max-w-[100px]">
        <span className="text-[#6B7271] text-[10px] uppercase leading-[13px]">
          Uçuş
        </span>
        <SortIcon />
      </div>
      <div className="flex items-end gap-0 flex-1 max-w-[60px]">
        <span className="text-[#6B7271] text-[10px] leading-[13px]">FIYAT</span>
        <SortIcon />
      </div>
      <div className="flex items-center justify-end w-[105px] min-w-[105px]">
        <span className="text-[#6B7271] text-[10px] uppercase leading-[13px]">
          İşlem
        </span>
      </div>
    </div>
  );
}

function TableRow({ row }: { row: Reservation }) {
  const rowBg =
    row.urgency === "red"
      ? "bg-[rgba(255,245,245,0.4)]"
      : row.urgency === "yellow"
      ? "bg-[rgba(255,251,235,0.4)]"
      : "bg-white";

  const borderColor =
    row.urgency === "red"
      ? "border-l-[#D32F2F]"
      : row.urgency === "yellow"
      ? "border-l-[#92400E]"
      : "border-l-transparent";

  return (
    <div
      className={`flex items-center justify-between p-3 ${rowBg} border-l ${borderColor}`}
    >
      {/* Time */}
      <div className="flex flex-col gap-[3px] w-[150px] max-w-[150px] min-w-[150px]">
        <TimeBadge time={row.timeLeft} urgency={row.urgency} />
        <span className="text-[#6B7271] text-xs leading-[15.6px]">
          {row.endTime}
        </span>
      </div>

      {/* PNR */}
      <div className="flex flex-col gap-[3px] w-20 min-w-[80px] max-w-[80px]">
        <div className="inline-flex self-start px-3 bg-[rgba(34,34,34,0.05)] rounded-full border border-[rgba(34,34,34,0.05)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <span className="text-[#222222] text-xs font-medium leading-[22px] pb-[2px]">
            {row.pnr}
          </span>
        </div>
      </div>

      {/* Airline */}
      <div className="flex-1 max-w-[50px]">
        <span className="text-[#6B7271] text-xs">{row.airline}</span>
      </div>

      {/* Passengers */}
      <div className="flex flex-col gap-[3px] w-[150px] max-w-[160px] min-w-[150px]">
        <span className="text-[#242E2C] text-xs">{row.passenger}</span>
        <span className="text-[#6B7271] text-xs leading-[15.6px]">
          {row.paxCount}
        </span>
      </div>

      {/* Flight */}
      <div className="flex flex-col gap-[3px] w-[100px] min-w-[100px] max-w-[100px]">
        <span className="text-[#222222] text-xs">{row.flightDate}</span>
        <span className="text-[#6B7271] text-xs leading-[15.6px]">
          {row.flightTime}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-[14px] w-[90px] min-w-[90px] max-w-[90px] justify-center">
        <div className="flex flex-col gap-[3px]">
          <span className="text-[#5E5E5E] text-xs">{row.price}</span>
          <div className="flex items-center gap-[3px]">
            {row.priceDirection === "up" ? (
              <ArrowUpRight size={12} className="text-[#E7000B]" />
            ) : (
              <ArrowDownRight size={12} className="text-[#1C9218]" />
            )}
            <span
              className={`text-[10px] ${
                row.priceDirection === "up"
                  ? "text-[#D32F2F]"
                  : "text-[#1C9218]"
              }`}
            >
              {row.priceChange}
            </span>
          </div>
        </div>
        <RotateCcw size={20} className="text-black" />
      </div>

      {/* Action */}
      <div className="flex items-center justify-end w-[105px]">
        <button className="px-[18px] py-[6px] bg-[#222222] rounded-[10px] text-white text-sm font-medium hover:bg-[#333] transition-colors">
          Biletle
        </button>
      </div>
    </div>
  );
}

export default function ReservationsTable() {
  return (
    <div className="w-full max-w-[968px] flex flex-col gap-5">
      <div className="p-5 rounded-[20px] border border-[#EBEBEB] flex flex-col gap-5">
        {/* Tabs */}
        <div className="flex items-start gap-2">
          <button className="px-[14px] py-1 bg-[rgba(10,130,223,0.1)] rounded-full border border-[#0A82DF] flex items-center">
            <span className="text-[#0A82DF] text-xs font-medium py-1">
              Opsiyonu Yaklaşanlar
            </span>
          </button>
          <button className="px-[14px] py-1 bg-white rounded-full border border-[#EBEBEB] flex items-center">
            <span className="text-black text-xs py-1">Uçuşu Yaklaşanlar</span>
          </button>
        </div>

        {/* Search and filter */}
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-[6px] px-[14px] py-1 bg-white rounded-lg border border-[#EBEBEB]">
            <Search size={17} className="text-[#717171]" />
            <span className="text-[#717171] text-xs py-1">
              PNR veya yolcu ara...
            </span>
          </div>
          <button className="flex items-center gap-1 px-[14px] py-1 bg-white rounded-[10px] border border-[#EBEBEB]">
            <SlidersHorizontal size={14} className="text-black" />
            <span className="text-black text-xs py-1">Filter</span>
          </button>
        </div>

        {/* Table */}
        <div className="flex flex-col">
          <div className="flex flex-col">
            <TableHeader />
            {reservations.map((row, i) => (
              <div key={i}>
                <TableRow row={row} />
                {i < reservations.length - 1 && (
                  <div className="h-px bg-[#EBEBEB]" />
                )}
              </div>
            ))}
          </div>

          {/* Footer link */}
          <div className="flex justify-end pt-3">
            <span className="text-[#717171] text-xs underline cursor-pointer hover:text-[#555]">
              Tüm rezervasyonlar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
