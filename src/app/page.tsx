import Sidebar from "@/components/Sidebar";
import FlightSearch from "@/components/FlightSearch";
import ReservationsTable from "@/components/ReservationsTable";

export default function Home() {
  return (
    <div className="flex min-h-screen pt-20">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center gap-8 px-5 py-10">
        <FlightSearch />
        <ReservationsTable />
      </main>
    </div>
  );
}
