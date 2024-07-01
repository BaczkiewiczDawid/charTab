import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {useTableContext} from "@/context/table-context";
import {useEffect, useState} from "react";

export const PaginationFooter = () => {
  const {initialDataState, setDataToRender, page, setPage, pageSize} = useTableContext()

  const handlePaginate = () => {
    const pageToRender = JSON.parse(JSON.stringify(initialDataState)).slice((page - 1) * pageSize, page * pageSize)
    setDataToRender(pageToRender)
  }

  useEffect(() => {
    handlePaginate()
  }, [page, pageSize, initialDataState])

  return (

    <Pagination className={"flex justify-between mt-4"}>
      <div>
        <p>{page} / {Math.ceil(initialDataState.length / pageSize)}</p>
      </div>
      <PaginationContent>

        <PaginationItem className={"cursor-pointer"} onClick={() => {
          if (page > 1) {
            setPage(prev => prev - 1)
          }
        }}>
          <PaginationPrevious/>
        </PaginationItem>
        {page > 1 &&
            <PaginationItem>
                <PaginationLink onClick={() => setPage((prev) => prev - 1)}>{page - 1}</PaginationLink>
            </PaginationItem>
        }
        <PaginationItem>
          <PaginationLink href="#">{page}</PaginationLink>
        </PaginationItem>
        {page < Math.ceil(initialDataState.length / pageSize) &&
            <>
                <PaginationItem>
                    <PaginationLink onClick={() => setPage((prev) => prev + 1)}>{page + 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis/>
                </PaginationItem>
            </>
        }
        <PaginationItem className={"cursor-pointer"} onClick={() => {
          if (page < Math.ceil(initialDataState.length / pageSize)) {
            setPage(prev => prev + 1)
          }
        }}>
          <PaginationNext/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
