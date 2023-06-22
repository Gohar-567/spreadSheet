/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import styled from "@emotion/styled"

import Tablesheet from "../Tablesheet"

const base = css`
  margin-bottom: 12px;
`

const TableSection = styled.section`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
`

const Spreadsheet = () => {
  return (
    <>
      <p className="h5 px-1" css={base}>
        Spreadsheet
      </p>
      <TableSection>
        <Tablesheet />
      </TableSection>
    </>
  )
}
export default Spreadsheet
