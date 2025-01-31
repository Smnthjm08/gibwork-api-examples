"use client";

import TaskCard from "@/components/task-card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ExploreData } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ExploreSkeleton from "@/components/explore-skeleton";

const sortByOptions = [
  { value: "isFeatured", label: "Featured" },
  { value: "createdAt", label: "Latest" },
  { value: "-createdAt", label: "Oldest" },
];

const ITEMS_PER_PAGE = 15;

export default function ExplorePage() {
  const [data, setData] = useState<{
    results: ExploreData[];
    total: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("isFeatured");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  const fetchData = async (page = currentPage) => {
    try {
      const params = new URLSearchParams();

      if (search) {
        params.append("search", search);
      }

      if (sortBy) {
        params.append("orderBy", sortBy);
      }

      params.append("page", page.toString());
      params.append("limit", ITEMS_PER_PAGE.toString());

      const apiEndpoint = `${
        process.env.NEXT_PUBLIC_VITE_URL
      }/explore?${params.toString()}`;

      setIsLoading(true);
      const response = await axios.get(apiEndpoint, {
        headers: { "x-api-key": process.env.GIBWORK_API_KEY },
      });
      setData(response.data);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch explore data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [sortBy]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchData(page);
    }
  };

  const handleSearch = () => {
    fetchData(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  if (isLoading) return (
    <div>
      <ExploreSkeleton />
    </div>
  )

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <main className="w-full">
      <h1 className="scroll-m-20 text-2xl flex px-8 pt-4 justify-start font-bold tracking-tight lg:text-4xl">
        Explore Tasks
      </h1>
      <div className="max-w-full px-4 sm:px-8 pt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Search task..."
            value={search}
            onKeyDown={handleKeyDown} // Handle Enter key
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
          <Button
            type="submit"
            onClick={handleSearch}
            className="w-full sm:w-auto"
          >
            Search
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Sort By:{" "}
              {sortByOptions.find((option) => option.value === sortBy)?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={sortBy}
              onValueChange={handleSortChange}
            >
              {sortByOptions.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TaskCard exploreData={data?.results ?? []} />

      <div className="flex justify-center my-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage <= 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={pageNumber === currentPage}
                      onClick={() => handlePageChange(pageNumber)}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
