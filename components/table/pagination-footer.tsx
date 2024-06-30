// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"
// import {useTableContext} from "@/context/table-context";
// import {useEffect, useState} from "react";
//
// export const PaginationFooter = () => {
//   const {initialDataState, setDataToRender} = useTableContext()
//
//   const [page, setPage] = useState<number>(1)
//   const [pageSize, setPageSize] = useState<number>(10)
//
//   const handlePaginate = () => {
//     const pageToRender = JSON.parse(JSON.stringify(initialDataState)).slice((page * pageSize), (page * pageSize) + pageSize)
//     console.log(pageToRender)
//     console.log(page)
//     // setDataToRender(pageToRender)
//   }
//
//   useEffect(() => {
//     handlePaginate()
//   }, [initialDataState])
//
//   return (
//     <div>
//       <div>
//         <p>{page} / {Math.ceil(initialDataState.length / pageSize)}</p>
//       </div>
//       <Pagination>
//         <PaginationContent>
//           <PaginationItem>
//             <PaginationPrevious onClick={() => {
//               if (page !== 1) {
//                 setPage(page - 1)
//                 handlePaginate()
//               }
//             }}/>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href="#">{page}</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationEllipsis/>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationNext onClick={() => {
//               if (page < initialDataState.length / pageSize) {
//                 setPage(page + 1)
//                 handlePaginate()
//               }
//             }
//             }/>
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     </div>
//   )
// }

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
  const {initialDataState, setDataToRender} = useTableContext()

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

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
        <PaginationItem>
          <PaginationLink href="#">{page - 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{page + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis/>
        </PaginationItem>
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
