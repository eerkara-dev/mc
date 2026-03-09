"use client";

import Sidebar from "@/components/Sidebar";
import SearchResults from "@/components/SearchResults";

export default function ResultsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <SearchResults />
      </div>
    </div>
  );
}
