/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import styled from "@emotion/styled"

export const TableContainer = styled.div`
  &::-webkit-scrollbar {
    height: 6px;
    width: 4px;
    background: #d3d3d3;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #818589;
    border-radius: 6px;
  }
`
export const MyTable = styled.table`
  border-radius: 12px;
  overflow: hidden;
`

export const TableHeading = styled.th`
  background-color: #f2f2f2 !important;
  font-size: 0.8rem !important;
`

export const TableInputGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: #e5e4e2;
`
export const TableInputs = styled.input`
  border: none !important;
  background: transparent !important;
  text-align: right;
  &:hover,
  &:focus {
    box-shadow: none !important;
    outline: none !important;
  }
`
export const color = css`
  color: #5555c1;
`
