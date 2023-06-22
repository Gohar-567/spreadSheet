/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { GiHamburgerMenu } from "react-icons/gi"

const OffcanvasContainer = styled.div`
  height: 100%;
  width: ${(props) => (props.show ? "350px" : "0")};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #ffffff;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 30px;
  border-right: 1px solid #d5d5d5;
`

const OffcanvasButton = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  background: none;
  border: none;
`

const HeaderSection = styled.div`
  padding: 20px 30px;
  box-shadow: 0px 3px #d5d5d5;
  border-bottom: 1px solid #d5d5d5;
  width: 100%;
`

const OffcanvasMenu = ({ showOffcanvas, setShowOffcanvas }) => {
  return (
    <>
      <OffcanvasContainer show={showOffcanvas}>
        <div className="d-flex align-items-center justify-content-between px-3">
          <div className="d-flex align-items-center">
            <img src="./mainlogo.png" alt="logo" />
            <p
              css={css`
                letter-spacing: 3px;
              `}
              className="h3 ms-2 mt-2"
            >
              Kordis
            </p>
          </div>
          <button
            className="d-block"
            onClick={() => setShowOffcanvas(!showOffcanvas)}
          >
            <GiHamburgerMenu color="C0C0C0" size={30} />
          </button>
        </div>
        <h2 className="d-flex align-items-center px-3 mt-3">
          <img
            css={css`
              width: 30px;
              object-fit: contain;
            `}
            src="./documents-outline.png"
            alt="logo"
          />
          <p className="h6 ms-2 text-danger mt-2">Spreadsheet</p>
        </h2>
      </OffcanvasContainer>

      <HeaderSection>
        <OffcanvasButton onClick={() => setShowOffcanvas(!showOffcanvas)}>
          <GiHamburgerMenu color="C0C0C0" size={30} />
        </OffcanvasButton>
      </HeaderSection>
    </>
  )
}
export default OffcanvasMenu
