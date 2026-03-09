import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import FlightSearch from "@/components/FlightSearch";

const ReservationsTable = dynamic(
  () => import("@/components/ReservationsTable"),
  { loading: () => <div className="w-full max-w-[968px] h-[300px]" /> }
);

export default function Home() {
  return (
    <div className="flex min-h-screen pt-20">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center gap-8 px-5 py-10 overflow-x-hidden">
        <FlightSearch />
        <ReservationsTable />
      </main>
    </div>
  );
}
