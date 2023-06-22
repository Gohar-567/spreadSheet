import styled from "@emotion/styled"

import Spreadsheet from "../../components/Spreadsheet"

const HomeSection = styled.section`
  padding: 20px;
  background-color: #fafbff;
`

const Home = () => {
  return (
    <>
      <HomeSection>
        <Spreadsheet />
      </HomeSection>
    </>
  )
}
export default Home
