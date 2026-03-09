"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

/* ─── Airport data ─── */
const favoriteAirports = [
  { code: "IST", name: "Istanbul", full: "Istanbul Havalimanı" },
  { code: "MUC", name: "München", full: "Franz Josef Strauß" },
  { code: "FRA", name: "Frankfurt", full: "Frankfurt am Main" },
];

const airports = [
  ...favoriteAirports,
  { code: "SAW", name: "Sabiha Gökçen", full: "Sabiha Gökçen Havalimanı" },
  { code: "AYT", name: "Antalya", full: "Antalya Havalimanı" },
  { code: "ESB", name: "Ankara", full: "Esenboğa Havalimanı" },
  { code: "ADB", name: "İzmir", full: "Adnan Menderes Havalimanı" },
  { code: "BER", name: "Berlin", full: "Berlin Brandenburg" },
  { code: "LON", name: "London", full: "London Heathrow" },
  { code: "PAR", name: "Paris", full: "Charles de Gaulle" },
];

/* ─── Airport dropdown (typeable, with favorites) ─── */
function AirportDropdown({
  label,
  value,
  onChange,
  openByDefault,
  onSelected,
}: {
  label: string;
  value: string;
  onChange: (code: string) => void;
  openByDefault?: boolean;
  onSelected?: () => void;
}) {
  const [open, setOpen] = useState(openByDefault || false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (open) {
          setOpen(false);
          setSearch("");
        }
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Respond to openByDefault changes
  useEffect(() => {
    if (openByDefault) {
      setOpen(true);
      setSearch("");
    }
  }, [openByDefault]);

  const selected = airports.find((a) => a.code === value);
  const displayName = selected?.name ?? "";

  const filtered = search
    ? airports.filter(
        (a) =>
          a.code.toLowerCase().includes(search.toLowerCase()) ||
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.full.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleSelect = (code: string) => {
    onChange(code);
    setOpen(false);
    setSearch("");
    onSelected?.();
  };

  return (
    <div ref={ref} className="relative">
      <div
        className="w-[260px] h-20 px-6 py-4 flex items-center gap-[2px] cursor-pointer"
        onClick={() => {
          setOpen(true);
          setSearch("");
        }}
      >
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-[#5E5E5E] text-xs">{label}</span>
          {open ? (
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={displayName || "Şehir veya havalimanı yazın..."}
              className="text-black text-base font-medium outline-none bg-transparent placeholder:text-[#BCBCBC] w-full"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="text-black text-base font-medium">
              {displayName || <span className="text-[#BCBCBC]">Şehir seçin</span>}
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-[#222222] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-xl shadow-lg border border-[#EBEBEB] w-[320px]">
          {/* Show favorites when no search, or filtered results when searching */}
          {!search ? (
            <div className="py-2">
              <div className="px-4 py-1">
                <span className="text-[10px] uppercase text-[#999] font-medium tracking-wide">
                  Favoriler
                </span>
              </div>
              {favoriteAirports.map((a) => (
                <button
                  key={a.code}
                  onClick={() => handleSelect(a.code)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-[#F7F7F7] transition-colors"
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
              <div className="h-px bg-[#EBEBEB] mx-3 my-1" />
              <div className="px-4 py-1">
                <span className="text-[10px] uppercase text-[#999] font-medium tracking-wide">
                  Tüm Havalimanları
                </span>
              </div>
              <div className="max-h-[200px] overflow-y-auto">
                {airports.map((a) => (
                  <button
                    key={a.code}
                    onClick={() => handleSelect(a.code)}
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
              </div>
            </div>
          ) : (
            <div className="py-2 max-h-[300px] overflow-y-auto">
              {filtered.map((a) => (
                <button
                  key={a.code}
                  onClick={() => handleSelect(a.code)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-[#F7F7F7] transition-colors"
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
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Date helpers ─── */
function parseDateStr(str: string): Date {
  const [d, m, y] = str.split(".");
  return new Date(Number(y), Number(m) - 1, Number(d));
}

function formatDateStr(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

/* Mock price data for ±3 days */
function getDayPrice(date: Date): number {
  // Deterministic pseudo-random price based on date
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return 89 + ((seed * 7 + 13) % 200);
}

/* ─── Date dropdown (±3 days with prices) ─── */
function DateDropdown({
  label,
  value,
  onChange,
  openByDefault,
  onSelected,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  openByDefault?: boolean;
  onSelected?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (openByDefault) setOpen(true);
  }, [openByDefault]);

  const baseDate = parseDateStr(value);
  const days = [-3, -2, -1, 0, 1, 2, 3].map((offset) => {
    const d = addDays(baseDate, offset);
    return { date: d, offset, price: getDayPrice(d) };
  });

  const minPrice = Math.min(...days.map((d) => d.price));

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parts = e.target.value.split("-");
    if (parts.length === 3) {
      onChange(`${parts[2]}.${parts[1]}.${parts[0]}`);
    }
  };

  const selectDay = (d: Date) => {
    onChange(formatDateStr(d));
    setOpen(false);
    onSelected?.();
  };

  return (
    <div ref={ref} className="relative">
      <div
        className="w-[160px] h-20 p-4 flex items-center gap-[1px] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-[#5E5E5E] text-xs">{label}</span>
          <span className="text-black text-base font-medium">{value}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-[#222222] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-xl shadow-lg border border-[#EBEBEB] w-[380px] p-4">
          {/* Date input */}
          <div className="flex items-center gap-2 mb-3">
            <label className="text-xs text-[#717171]">{label}:</label>
            <input
              type="date"
              value={value.split(".").reverse().join("-")}
              onChange={handleDateInput}
              className="flex-1 px-3 py-1.5 border border-[#EBEBEB] rounded-lg text-sm outline-none focus:border-[#0A82DF] transition-colors"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* ±3 days header */}
          <div className="mb-2">
            <span className="text-[11px] text-[#999] uppercase font-medium tracking-wide">
              ± 3 Gün Fiyat Karşılaştırma
            </span>
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((d) => {
              const isSelected = d.offset === 0;
              const isCheapest = d.price === minPrice;
              return (
                <button
                  key={d.offset}
                  onClick={() => selectDay(d.date)}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                    isSelected
                      ? "bg-[#0A82DF] text-white"
                      : isCheapest
                      ? "bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#222]"
                      : "hover:bg-[#F5F5F5] text-[#222]"
                  }`}
                >
                  <span className={`text-[10px] ${isSelected ? "text-white/80" : "text-[#999]"}`}>
                    {dayNames[d.date.getDay()]}
                  </span>
                  <span className={`text-sm font-medium ${isSelected ? "" : ""}`}>
                    {d.date.getDate()}
                  </span>
                  <span
                    className={`text-[10px] font-medium mt-0.5 ${
                      isSelected
                        ? "text-white/90"
                        : isCheapest
                        ? "text-[#2E7D32]"
                        : "text-[#999]"
                    }`}
                  >
                    {d.price}€
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cheapest hint */}
          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-[#F0F0F0]">
            <div className="w-2 h-2 rounded-full bg-[#4CAF50]" />
            <span className="text-[10px] text-[#717171]">
              En uygun fiyat: {minPrice}€
            </span>
          </div>
        </div>
      )}
    </div>
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
  // Auto-advance flow: origin → destination → departDate → returnDate
  const [autoOpenDest, setAutoOpenDest] = useState(false);
  const [autoOpenDepart, setAutoOpenDepart] = useState(false);
  const [autoOpenReturn, setAutoOpenReturn] = useState(false);

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
        <AirportDropdown
          label="Nereden"
          value={origin}
          onChange={setOrigin}
          onSelected={() => {
            setAutoOpenDest(true);
            setTimeout(() => setAutoOpenDest(false), 50);
          }}
        />

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
          openByDefault={autoOpenDest}
          onSelected={() => {
            setAutoOpenDepart(true);
            setTimeout(() => setAutoOpenDepart(false), 50);
          }}
        />

        <DateDropdown
          label="Gidiş Tarihi"
          value={departDate}
          onChange={setDepartDate}
          openByDefault={autoOpenDepart}
          onSelected={() => {
            setAutoOpenReturn(true);
            setTimeout(() => setAutoOpenReturn(false), 50);
          }}
        />

        <DateDropdown
          label="Dönüş Tarihi"
          value={returnDate}
          onChange={setReturnDate}
          openByDefault={autoOpenReturn}
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
