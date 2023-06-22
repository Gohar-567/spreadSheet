import React, { useState } from "react"
import styled from "@emotion/styled"

import OffcanvasMenu from "../OffcanvasMenu"

const Main = styled.main`
  margin-left: ${(props) => (props.show ? "350px" : "0")};
  transition: margin-left 0.5s;
`
const Layout = ({ children }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  return (
    <>
      <OffcanvasMenu
        showOffcanvas={showOffcanvas}
        setShowOffcanvas={setShowOffcanvas}
      />
      <Main show={showOffcanvas}>{children}</Main>
    </>
  )
}
export default Layout
