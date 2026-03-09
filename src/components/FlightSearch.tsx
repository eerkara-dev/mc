"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plane,
  ArrowLeftRight,
  Search,
  ChevronDown,
  RefreshCw,
  Check,
  Minus,
  Plus,
} from "./Icons";

/* ─── Dropdown wrapper ─── */
function Dropdown({
  children,
  overlay,
  open,
  onToggle,
}: {
  children: React.ReactNode;
  overlay: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (open) onToggle();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onToggle]);

  return (
    <div ref={ref} className="relative">
      <div onClick={onToggle} className="cursor-pointer">
        {children}
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-xl shadow-lg border border-[#EBEBEB] min-w-[220px]">
          {overlay}
        </div>
      )}
    </div>
  );
}

/* ─── Airline dropdown ─── */
const airlines = [
  { code: "all", name: "Tümü" },
  { code: "TK", name: "Turkish Airlines" },
  { code: "PC", name: "Pegasus" },
  { code: "XQ", name: "SunExpress" },
  { code: "LH", name: "Lufthansa" },
  { code: "LX", name: "Swiss" },
  { code: "OS", name: "Austrian" },
];

function AirlineDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const label =
    value === "all"
      ? "Havayolu Seç"
      : airlines.find((a) => a.code === value)?.name ?? value;

  return (
    <Dropdown
      open={open}
      onToggle={() => setOpen(!open)}
      overlay={
        <div className="py-1">
          {airlines.map((a) => (
            <button
              key={a.code}
              onClick={() => {
                onChange(a.code);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-[#F7F7F7] transition-colors"
            >
              <span className="flex items-center gap-2">
                {a.code !== "all" && (
                  <span className="text-[10px] text-[#717171] w-5">{a.code}</span>
                )}
                <span className={value === a.code ? "font-medium" : ""}>
                  {a.name}
                </span>
              </span>
              {value === a.code && <Check size={14} className="text-[#0A82DF]" />}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex items-center gap-[6px] px-2 py-4 rounded-[10px] shadow-[0_2px_4px_rgba(77,145,225,0.1)] min-w-[110px] max-w-[110px] justify-center">
        <span className="text-[#5E5E5E] text-xs text-center truncate">
          {label}
        </span>
        <ChevronDown
          size={12}
          className={`text-[#5E5E5E] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>
    </Dropdown>
  );
}

/* ─── PAX dropdown ─── */
function PaxDropdown({
  adults,
  children: childCount,
  infants,
  onChangeAdults,
  onChangeChildren,
  onChangeInfants,
}: {
  adults: number;
  children: number;
  infants: number;
  onChangeAdults: (n: number) => void;
  onChangeChildren: (n: number) => void;
  onChangeInfants: (n: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const total = adults + childCount + infants;

  function Counter({
    label,
    sub,
    value,
    onChange,
    min = 0,
  }: {
    label: string;
    sub: string;
    value: number;
    onChange: (n: number) => void;
    min?: number;
  }) {
    return (
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-sm text-[#222222]">{label}</p>
          <p className="text-[11px] text-[#717171]">{sub}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onChange(Math.max(min, value - 1))}
            disabled={value <= min}
            className="w-7 h-7 rounded-full border border-[#EBEBEB] flex items-center justify-center disabled:opacity-30 hover:bg-[#F7F7F7] transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm font-medium w-4 text-center">{value}</span>
          <button
            onClick={() => onChange(Math.min(9, value + 1))}
            className="w-7 h-7 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:bg-[#F7F7F7] transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <Dropdown
      open={open}
      onToggle={() => setOpen(!open)}
      overlay={
        <div className="py-1 w-[260px]">
          <Counter
            label="Yetişkin"
            sub="12+ yaş"
            value={adults}
            onChange={onChangeAdults}
            min={1}
          />
          <div className="h-px bg-[#EBEBEB] mx-4" />
          <Counter
            label="Çocuk"
            sub="2–12 yaş"
            value={childCount}
            onChange={onChangeChildren}
          />
          <div className="h-px bg-[#EBEBEB] mx-4" />
          <Counter
            label="Bebek"
            sub="0–2 yaş"
            value={infants}
            onChange={onChangeInfants}
          />
          <div className="px-4 py-2">
            <button
              onClick={() => setOpen(false)}
              className="w-full py-2 bg-[#0A82DF] text-white text-sm font-medium rounded-lg hover:bg-[#0971c4] transition-colors"
            >
              Uygula
            </button>
          </div>
        </div>
      }
    >
      <div className="flex items-center gap-[6px] px-2 py-4 rounded-[10px] min-w-[110px] max-w-[110px] justify-center">
        <span className="text-[#5E5E5E] text-xs text-center">
          {total} Yolcu
        </span>
        <ChevronDown
          size={12}
          className={`text-[#5E5E5E] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>
    </Dropdown>
  );
}

/* ─── Airport dropdown ─── */
const airports = [
  { code: "IST", name: "Istanbul", full: "Istanbul Havalimanı" },
  { code: "SAW", name: "Sabiha Gökçen", full: "Sabiha Gökçen Havalimanı" },
  { code: "AYT", name: "Antalya", full: "Antalya Havalimanı" },
  { code: "ESB", name: "Ankara", full: "Esenboğa Havalimanı" },
  { code: "ADB", name: "İzmir", full: "Adnan Menderes Havalimanı" },
  { code: "MUC", name: "München", full: "Franz Josef Strauß" },
  { code: "FRA", name: "Frankfurt", full: "Frankfurt am Main" },
  { code: "BER", name: "Berlin", full: "Berlin Brandenburg" },
  { code: "LON", name: "London", full: "London Heathrow" },
  { code: "PAR", name: "Paris", full: "Charles de Gaulle" },
];

function AirportDropdown({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = airports.filter(
    (a) =>
      a.code.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.full.toLowerCase().includes(search.toLowerCase())
  );

  const display = value
    ? airports.find((a) => a.code === value)?.name ?? value
    : "Origin";

  return (
    <Dropdown
      open={open}
      onToggle={() => {
        setOpen(!open);
        setSearch("");
      }}
      overlay={
        <div className="py-2 w-[280px]">
          <div className="px-3 pb-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#F7F7F7] rounded-lg">
              <Search size={14} className="text-[#717171]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Havalimanı ara..."
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-[#717171]"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="max-h-[240px] overflow-y-auto">
            {filtered.map((a) => (
              <button
                key={a.code}
                onClick={() => {
                  onChange(a.code);
                  setOpen(false);
                  setSearch("");
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-[#F7F7F7] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs text-[#0A82DF] font-medium w-8">
                    {a.code}
                  </span>
                  <span className="flex flex-col items-start">
                    <span className={value === a.code ? "font-medium" : ""}>
                      {a.name}
                    </span>
                    <span className="text-[11px] text-[#717171]">{a.full}</span>
                  </span>
                </span>
                {value === a.code && (
                  <Check size={14} className="text-[#0A82DF]" />
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-4 py-3 text-sm text-[#717171]">
                Sonuç bulunamadı
              </p>
            )}
          </div>
        </div>
      }
    >
      <div className="w-[260px] h-20 px-6 py-4 flex items-center gap-[2px]">
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-[#5E5E5E] text-xs">{label}</span>
          <span className="text-black text-base font-medium">{display}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-[#222222] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>
    </Dropdown>
  );
}

/* ─── Date dropdown ─── */
function DateDropdown({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      open={open}
      onToggle={() => setOpen(!open)}
      overlay={
        <div className="p-4 w-[250px]">
          <label className="block text-xs text-[#717171] mb-2">{label}</label>
          <input
            type="date"
            value={value.split(".").reverse().join("-")}
            onChange={(e) => {
              const parts = e.target.value.split("-");
              onChange(`${parts[2]}.${parts[1]}.${parts[0]}`);
              setOpen(false);
            }}
            className="w-full px-3 py-2 border border-[#EBEBEB] rounded-lg text-sm outline-none focus:border-[#0A82DF] transition-colors"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      }
    >
      <div className="w-[160px] h-20 p-4 flex items-center gap-[1px]">
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-[#5E5E5E] text-xs">{label}</span>
          <span className="text-black text-base font-medium">{value}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-[#222222] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>
    </Dropdown>
  );
}

/* ─── Toggle ─── */
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-8 h-5 rounded-full relative transition-colors ${
        checked ? "bg-[#0A82DF]" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full absolute top-[2px] shadow-[0_3px_1px_rgba(0,0,0,0.06),0_3px_8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)] transition-all ${
          checked ? "left-[14px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

/* ─── Trip type selector ─── */
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
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          className="text-[#717171]"
        >
          <path
            d="M3 5h14M3 10h14M3 15h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="7" cy="5" r="2" fill="currentColor" />
          <circle cx="13" cy="10" r="2" fill="currentColor" />
          <circle cx="7" cy="15" r="2" fill="currentColor" />
        </svg>
        <span className="text-[13px] font-normal leading-[22px]">
          Çoklu Uçuş
        </span>
      </button>
    </div>
  );
}

/* ─── Search form ─── */
function SearchForm({
  airline,
  setAirline,
  adults,
  setAdults,
  childrenCount,
  setChildrenCount,
  infants,
  setInfants,
  baggage,
  setBaggage,
  directOnly,
  setDirectOnly,
  origin,
  setOrigin,
  destination,
  setDestination,
  departDate,
  setDepartDate,
  returnDate,
  setReturnDate,
}: {
  airline: string;
  setAirline: (v: string) => void;
  adults: number;
  setAdults: (n: number) => void;
  childrenCount: number;
  setChildrenCount: (n: number) => void;
  infants: number;
  setInfants: (n: number) => void;
  baggage: boolean;
  setBaggage: (v: boolean) => void;
  directOnly: boolean;
  setDirectOnly: (v: boolean) => void;
  origin: string;
  setOrigin: (v: string) => void;
  destination: string;
  setDestination: (v: string) => void;
  departDate: string;
  setDepartDate: (v: string) => void;
  returnDate: string;
  setReturnDate: (v: string) => void;
}) {
  const swapCities = () => {
    const tmp = origin;
    setOrigin(destination);
    setDestination(tmp);
  };

  return (
    <div className="bg-white shadow-[0_2px_8px_rgba(17,24,39,0.06)] rounded-xl border border-[#EBEBEB] flex flex-col w-[968px]">
      {/* Top options row */}
      <div className="flex items-center gap-3 px-3 h-12">
        <AirlineDropdown value={airline} onChange={setAirline} />
        <PaxDropdown
          adults={adults}
          children={childrenCount}
          infants={infants}
          onChangeAdults={setAdults}
          onChangeChildren={setChildrenCount}
          onChangeInfants={setInfants}
        />
        <div className="flex items-center gap-2 h-12">
          <span className="text-[#5E5E5E] text-xs">Bagaj Dahil</span>
          <Toggle checked={baggage} onChange={setBaggage} />
        </div>
        <div className="flex items-center gap-2 h-12">
          <span className="text-[#5E5E5E] text-xs">Direkt Uçuşlar</span>
          <Toggle checked={directOnly} onChange={setDirectOnly} />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E5E7EB]" />

      {/* Search fields row */}
      <div className="flex items-center">
        <AirportDropdown label="Nereden" value={origin} onChange={setOrigin} />

        {/* Swap button */}
        <button
          onClick={swapCities}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] transition-colors"
        >
          <ArrowLeftRight size={18} className="text-[#0A82DF]" />
        </button>

        <AirportDropdown
          label="Nereye"
          value={destination}
          onChange={setDestination}
        />

        <DateDropdown
          label="Gidiş Tarihi"
          value={departDate}
          onChange={setDepartDate}
        />

        <DateDropdown
          label="Dönüş Tarihi"
          value={returnDate}
          onChange={setReturnDate}
        />

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

/* ─── Recent searches ─── */
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
    <div className="grid grid-cols-4 gap-3 w-[968px]">
      {recentSearches.map((search, i) => (
        <div
          key={i}
          className="p-3 bg-white rounded-2xl border border-[#EBEBEB] flex flex-col cursor-pointer hover:border-[#ccc] transition-colors"
        >
          <div className="flex items-start justify-between">
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
                <span className="text-[#717171] text-xs">
                  {search.passengers}
                </span>
                <span className="text-[#717171] text-xs">{search.dates}</span>
              </div>
            </div>
            <div className="opacity-80 flex items-center pt-1">
              <RefreshCw size={16} className="text-[#0A82DF]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main export ─── */
export default function FlightSearch() {
  const [airline, setAirline] = useState("all");
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [baggage, setBaggage] = useState(true);
  const [directOnly, setDirectOnly] = useState(true);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("01.01.2026");
  const [returnDate, setReturnDate] = useState("01.01.2026");

  return (
    <div className="flex flex-col items-center gap-6">
      <TripTypeSelector />
      <SearchForm
        airline={airline}
        setAirline={setAirline}
        adults={adults}
        setAdults={setAdults}
        childrenCount={childrenCount}
        setChildrenCount={setChildrenCount}
        infants={infants}
        setInfants={setInfants}
        baggage={baggage}
        setBaggage={setBaggage}
        directOnly={directOnly}
        setDirectOnly={setDirectOnly}
        origin={origin}
        setOrigin={setOrigin}
        destination={destination}
        setDestination={setDestination}
        departDate={departDate}
        setDepartDate={setDepartDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
      />
      <RecentSearches />
    </div>
  );
}
