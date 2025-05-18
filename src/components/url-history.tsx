import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { UrlListItem } from "./url-item";
import type { PaginatedUrls } from "@/types/url";

interface UrlHistoryProps {
  data?: PaginatedUrls;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export const UrlHistory = ({
  data,
  currentPage,
  itemsPerPage,
  isLoading,
  onPageChange,
}: UrlHistoryProps) => {
  const totalPages = Math.ceil((data?.count || 0) / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full" />
          ))
        ) : data?.rows?.length ? (
          data.rows.map((item) => <UrlListItem key={item.id} data={item} />)
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No shortened URLs yet
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="cursor-pointer"
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => onPageChange(i + 1)}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="cursor-pointer"
            />
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
