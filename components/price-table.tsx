"use client"

import * as React from "react"
import { BigMacRecord } from "../app/models"
import { Input } from "@/components/ui/input"
import { useScroll } from "react-use"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type RowData = {
  name: string
  priceInUSD: string
  priceInLocal: string
}

export const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: "name",
    header: ({ table }) => (
      <Input
        type="text"
        onChange={(e) => {
          console.log(e.target.value)
          table.getColumn("name")?.setFilterValue(e.target.value)
        }}
        placeholder="Search name..."
        className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    ),
    cell: ({ row }) => <div className="text-base">{row.original.name}</div>,
  },
  {
    accessorKey: "priceInUSD",
    header: () => (
      <div className="text-center text-foreground font-bold">Price in USD</div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-base">{row.getValue("priceInUSD")}</div>
    ),
  },
  {
    accessorKey: "priceInLocal",
    header: () => (
      <div className="text-center text-foreground font-bold">
        Price in Local
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center text-base">
          {row.getValue("priceInLocal")}
        </div>
      )
    },
  },
]

export function PriceTable({
  data,
  amount,
}: {
  data: BigMacRecord[]
  amount: string
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { y } = useScroll(scrollRef as React.RefObject<HTMLElement>)
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(true)

  // Update scroll indicator based on scroll position
  React.useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    if (container.scrollHeight == container.clientHeight) {
      return
    }

    console.log(
      `container.scrollHeight: ${container.scrollHeight} container.clientHeight: ${container.clientHeight} y: ${y}`
    )
    const hasMoreContent =
      container.scrollHeight > container.clientHeight + y + 10
    setShowScrollIndicator(hasMoreContent)
  }, [y])

  const baseRecord = data.find((r) => r.iso_a3 === "USA")
  const baseAmount = parseFloat(amount) || 0
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const rows = React.useMemo(() => {
    const convertedAmounts = data.map((record) => ({
      record,
      amountInUSD: record.convertFromBase(baseRecord!, baseAmount),
    }))

    const sortedData = convertedAmounts.sort(
      (a, b) => b.amountInUSD - a.amountInUSD
    )

    return sortedData.map(({ record, amountInUSD }) => {
      const amountInLocal = amountInUSD * record.dollar_ex
      return {
        name: `${record.flagEmoji} ${record.name}`,
        priceInUSD: `$${amountInUSD.toFixed(2)}`,
        priceInLocal: `${record.currency_code} ${amountInLocal.toFixed(2)}`,
      }
    })
  }, [data, baseRecord, baseAmount])

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div className="w-full h-full relative">
      <div
        ref={scrollRef}
        className="w-full h-full rounded-md overflow-scroll relative"
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="sticky top-0 bg-background w-[100px]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="w-[100px]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showScrollIndicator && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      )}
    </div>
  )
}
