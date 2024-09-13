import React from 'react'
import LoginAndSignupHeader from '../../components/Navbar/LoginAndSignupHeader'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import mainImg  from "../../../public/3048234.jpg"
const Main = () => {
  return (
    <>
    <LoginAndSignupHeader/>
    <div>
      <EmptyCard imgSrc={mainImg} message={"Hi! Welcome to Notes"} size='text-3xl'/>
    </div>
    </>
  )
}

export default Main
