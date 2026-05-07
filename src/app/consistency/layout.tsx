import { Suspense } from "react";
import { FilterBar } from "@/components/filter-bar";

export default function ConsistencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>
      {children}
    </div>
  );
}
