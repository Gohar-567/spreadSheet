import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table'
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { AiFillPlusCircle } from "react-icons/ai"

import { makeData, SpreadSheet } from './makeData'

import {
  MyTable,
  TableContainer,
  TableInputs,
  TableHeading,
} from "./style"

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

function useSkipper() {
  const shouldSkipRef =useRef(true)
  const shouldSkip = shouldSkipRef.current

  const skip =useCallback(() => {
    shouldSkipRef.current = false
  }, [])

 useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}

function Tablesheet() {
  const defaultColumn: Partial<ColumnDef<SpreadSheet>> = {
    cell: ({ getValue, row: { index, getAllCells, subRows }, column: { id }, table }) => {
      const initialValue = getValue()
      const [value, setValue] = useState(initialValue)

      const onChange = (e) => {
        debugger
        setValue(e.target.value)
        table.options.meta?.updateData(index, id, Number(e.target.value))
      }

      const onBlur = () => {
        debugger
        table.options.meta?.updateData(index, id, Number(value))
        setData(table.options.data)
      }

     useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

      return (
        <TableInputs
          value={value as string}
          onChange={onChange}
          onBlur={onBlur}
          className={`form-control  ${
            id === "title" ? "text-start" : "text-end"
          }`}
        />
      )
    },
  }

  const columns =useMemo(
    () => [
      {
        accessorKey: 'company',
        header: () => '',
        footer: props => props.column.id,
        columns: [
          {
            accessorKey: 'title',
            header: () => <div className='d-flex flex-row h6'><p >Financial Model <span className='ms-1 text-sm text-primary'>(Entire organization)</span></p>  </div>,
            cell: ({ row, getValue }) => {
              const [title, setTitle] = useState(getValue());
              console.log(row.id, 'level');
              console.log(row.id.split(".").length - 1, 'length')
              return (
                <div className='px-2'>
                  <div className='flex justify-between w-60'>
                    <div>
                    {getValue() != 'Total' ? (
                        <TableInputs
                          value={title as string}
                          onChange={e => setTitle(e.target.value)}
                          className='text-start'
                        />
                      ):(<p>{title} Revenue</p>)}
                      <button className='mx-2' onClick={increment2ndLevel}>{(row.id.split(".").length - 1) == 0 ? <AiFillPlusCircle size={20} color='#5555c1'/>: ''}</button>
                    </div>
                    {row.getCanExpand() ? (
                      <button
                        {...{
                          onClick: row.getToggleExpandedHandler(),
                          style: { cursor: 'pointer' },
                        }}
                      >
                        {row.getIsExpanded() ? <BsChevronUp size={20}/> : <BsChevronDown/>}
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              )
            },
            footer: props => props.column.id,
          },
          {
            accessorKey: 'jan',
            header: () =>  <h5>Jan 2023</h5> ,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'feb',
            header: () =>  <h5>Feb 2023</h5> ,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'mar',
            header: () =>  <h5>Mar 2023</h5> ,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'apr',
            header: () =>  <h5>Apr 2023</h5> ,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'may',
            header: () =>  <h5>May 2023</h5> ,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'jun',
            header: () =>  <h5>Jun 2023</h5> ,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'jul',
            header: () =>  <h5>Jul 2023</h5> ,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'aug',
            header: () =>  <h5>Aug 2023</h5> ,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'sep',
            header: () =>  <h5>Sep 2023</h5> ,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'oct',
            header: () =>  <h5>Oct 2023</h5> ,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'nov',
            header: () =>  <h5>Nov 2023</h5> ,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'dec',
            header: () =>  <h5>Dec 2023</h5>,
            footer: props => props.column.id,
          },
        ],
      },
    ],
    []
  )

  var var1stLevel = 0;
  var var2ndLevel = 0;
  var var3rdLevel = 0;

  const [data, setData] = useState(() => makeData(var1stLevel, var2ndLevel, var3rdLevel))

  const increment1stLevel = () => {
    var1stLevel = var1stLevel + 1
    setData(() => makeData(var1stLevel, var2ndLevel, var3rdLevel))
  }
  const increment2ndLevel = () => {
    var2ndLevel = var2ndLevel + 1
    setData(() => makeData(var1stLevel, var2ndLevel, var3rdLevel))
  }

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
  const [expanded, setExpanded] =useState ({})
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    autoResetPageIndex,
    // Provide updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
    debugTable: true,
  })

  return (
    <TableContainer className="table-responsive">
      <MyTable className="table table-bordered overflow-hidden">
        <thead className="w-50 text-center">
          {table.getHeaderGroups().map(headerGroup => (
             <tr className="w-50 text-center" key={headerGroup.id}>
             {headerGroup.headers.map((header, index) => {
               if (index === 0) {
                 return (
                   <TableHeading
                     className="w-25"
                     key={header.id}
                     colSpan={header.colSpan}
                   >
                     {header.isPlaceholder
                       ? null
                       : flexRender(
                           header.column.columnDef.header,
                           header.getContext()
                         )}
                   </TableHeading>
                 )
               }
               return (
                 <TableHeading key={header.id} colSpan={header.colSpan}>
                   {header.isPlaceholder
                     ? null
                     : flexRender(
                         header.column.columnDef.header,
                         header.getContext()
                       )}
                 </TableHeading>
               )
             })}
           </tr>
          ))}
        </thead>
        <tbody>
          <tr>
            <td>
              <div className='flex py-2'>
                <p className=''>Income Statement</p>
                {var1stLevel == 0 && <button className='mx-2' onClick={increment1stLevel}><AiFillPlusCircle size={20} color='#5555c1'/></button>}
              </div>
            </td>
          </tr>
          {table.getRowModel().rows.map(row => {
            return (
              <>
                <tr key={row.id} className="border">
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td className='border' key={cell.id}>
                        {(row.id != '0' || (row.id == '0' && cell.id == '0_title')) && flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              </>
            )
          })}
        </tbody>
      </MyTable>
      </TableContainer>
 
  )
}
export default Tablesheet

 
