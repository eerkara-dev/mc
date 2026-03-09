"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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

const dayHeaders = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* Mock price for a given day */
function getDayPrice(date: Date): number {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return 50 + ((seed * 7 + 13) % 150);
}

/* Build calendar grid for a month */
function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startDow = firstDay.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isBetween(d: Date, start: Date, end: Date) {
  return d > start && d < end;
}

/* ─── Flex day chip ─── */
function FlexChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-xs transition-colors ${
        active
          ? "border-[#222] bg-[#222] text-white"
          : "border-[#DCDCDC] text-[#555] hover:border-[#999]"
      }`}
    >
      {label}
    </button>
  );
}

/* ─── Dual calendar date picker ─── */
function DualDatePicker({
  departDate,
  returnDate,
  onChangeDepartDate,
  onChangeReturnDate,
  open,
  onClose,
  openByDefault,
}: {
  departDate: string;
  returnDate: string;
  onChangeDepartDate: (v: string) => void;
  onChangeReturnDate: (v: string) => void;
  open: boolean;
  onClose: () => void;
  openByDefault?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [selecting, setSelecting] = useState<"depart" | "return">("depart");
  const [departFlex, setDepartFlex] = useState(0);
  const [returnFlex, setReturnFlex] = useState(0);

  const depart = parseDateStr(departDate);
  const ret = parseDateStr(returnDate);

  // Left calendar shows depart month, right shows next month
  const [viewYear, setViewYear] = useState(depart.getFullYear());
  const [viewMonth, setViewMonth] = useState(depart.getMonth());

  useEffect(() => {
    if (open || openByDefault) {
      setSelecting("depart");
      const d = parseDateStr(departDate);
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  }, [open, openByDefault, departDate]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const leftGrid = getMonthGrid(viewYear, viewMonth);
  const rightMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const rightYear = viewMonth === 11 ? viewYear + 1 : viewYear;
  const rightGrid = getMonthGrid(rightYear, rightMonth);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDayClick = (d: Date) => {
    if (d < today) return;

    if (selecting === "depart") {
      onChangeDepartDate(formatDateStr(d));
      // If new depart is after return, move return too
      if (d >= ret) {
        const newRet = new Date(d);
        newRet.setDate(newRet.getDate() + 1);
        onChangeReturnDate(formatDateStr(newRet));
      }
      setSelecting("return");
    } else {
      if (d <= depart) {
        // If clicked before depart, treat as new depart
        onChangeDepartDate(formatDateStr(d));
        setSelecting("return");
      } else {
        onChangeReturnDate(formatDateStr(d));
        onClose();
      }
    }
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  function renderCalendar(grid: (Date | null)[], year: number, month: number) {
    return (
      <div className="flex-1">
        <div className="text-center font-medium text-sm mb-2">
          {monthNames[month]} {year}
        </div>
        <div className="grid grid-cols-7 gap-0">
          {dayHeaders.map((dh, i) => (
            <div
              key={dh + i}
              className={`text-center text-[11px] font-medium pb-1 ${
                i === 0 ? "text-[#D32F2F]" : "text-[#555]"
              }`}
            >
              {dh}
            </div>
          ))}
          {grid.map((cell, i) => {
            if (!cell) {
              return <div key={"e" + i} className="h-[52px]" />;
            }
            const isPast = cell < today;
            const isDepart = sameDay(cell, depart);
            const isReturn = sameDay(cell, ret);
            const inRange = !sameDay(depart, ret) && isBetween(cell, depart, ret);
            const isSunday = cell.getDay() === 0;
            const price = getDayPrice(cell);

            return (
              <button
                key={i}
                disabled={isPast}
                onClick={() => handleDayClick(cell)}
                className={`h-[52px] flex flex-col items-center justify-center text-xs transition-colors relative ${
                  isPast
                    ? "text-[#ddd] cursor-default"
                    : isDepart
                    ? "bg-[#222] text-white rounded-lg"
                    : isReturn
                    ? "bg-[#222] text-white rounded-lg"
                    : inRange
                    ? "bg-[#F0F0F0]"
                    : "hover:bg-[#F5F5F5]"
                } ${!isPast && !isDepart && !isReturn && isSunday ? "text-[#D32F2F]" : ""}`}
              >
                <span className="font-medium leading-tight">{cell.getDate()}</span>
                {!isPast && (
                  <span
                    className={`text-[9px] leading-tight ${
                      isDepart || isReturn ? "text-white/80" : "text-[#999]"
                    }`}
                  >
                    {price} €
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-1 z-50 bg-white rounded-2xl shadow-xl border border-[#EBEBEB] p-5"
      style={{ width: 680 }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="font-semibold text-sm mb-2">Gidiş Tarihi</div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((n) => (
              <FlexChip
                key={n}
                label={`± ${n} Tag${n > 1 ? "e" : ""}`}
                active={departFlex === n}
                onClick={() => setDepartFlex(departFlex === n ? 0 : n)}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 text-right">
          <div className="font-semibold text-sm mb-2">Dönüş Tarihi</div>
          <div className="flex gap-1.5 justify-end">
            {[1, 2, 3].map((n) => (
              <FlexChip
                key={n}
                label={`± ${n} Tag${n > 1 ? "e" : ""}`}
                active={returnFlex === n}
                onClick={() => setReturnFlex(returnFlex === n ? 0 : n)}
              />
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-3 mt-0.5 w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F5F5F5] transition-colors text-[#999]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* Month navigation + calendars */}
      <div className="flex items-start gap-6">
        <button onClick={prevMonth} className="mt-1 p-1 hover:bg-[#F5F5F5] rounded transition-colors text-[#999]">
          <ChevronDown size={16} className="rotate-90" />
        </button>
        {renderCalendar(leftGrid, viewYear, viewMonth)}
        {renderCalendar(rightGrid, rightYear, rightMonth)}
        <button onClick={nextMonth} className="mt-1 p-1 hover:bg-[#F5F5F5] rounded transition-colors text-[#999]">
          <ChevronDown size={16} className="-rotate-90" />
        </button>
      </div>

      {/* Selection hint */}
      <div className="mt-3 pt-3 border-t border-[#F0F0F0] flex items-center justify-between text-xs text-[#717171]">
        <span>
          {selecting === "depart"
            ? "Gidiş tarihini seçin"
            : "Dönüş tarihini seçin"}
        </span>
        <span>
          {departDate} → {returnDate}
        </span>
      </div>
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
  // Auto-advance flow: origin → destination → date picker
  const router = useRouter();
  const [autoOpenDest, setAutoOpenDest] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const closeDatePicker = useCallback(() => setDatePickerOpen(false), []);

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
          onSelected={() => setDatePickerOpen(true)}
        />

        {/* Date fields — both open the same dual calendar */}
        <div className="relative">
          <div className="flex items-center">
            <div
              className="w-[160px] h-20 p-4 flex items-center gap-[1px] cursor-pointer"
              onClick={() => setDatePickerOpen(true)}
            >
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[#5E5E5E] text-xs">Gidiş Tarihi</span>
                <span className="text-black text-base font-medium">{departDate}</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-[#222222] transition-transform ${datePickerOpen ? "rotate-180" : ""}`}
              />
            </div>

            <div
              className="w-[160px] h-20 p-4 flex items-center gap-[1px] cursor-pointer"
              onClick={() => setDatePickerOpen(true)}
            >
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[#5E5E5E] text-xs">Dönüş Tarihi</span>
                <span className="text-black text-base font-medium">{returnDate}</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-[#222222] transition-transform ${datePickerOpen ? "rotate-180" : ""}`}
              />
            </div>
          </div>

          <DualDatePicker
            departDate={departDate}
            returnDate={returnDate}
            onChangeDepartDate={setDepartDate}
            onChangeReturnDate={setReturnDate}
            open={datePickerOpen}
            onClose={closeDatePicker}
          />
        </div>

        {/* Search button */}
        <div className="h-20 p-[10px] flex items-center">
          <button
            onClick={() => router.push("/results")}
            className="w-[68px] h-[68px] bg-[#0A82DF] rounded-2xl flex items-center justify-center hover:bg-[#0971c4] transition-colors"
          >
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
