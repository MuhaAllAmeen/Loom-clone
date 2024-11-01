import React from 'react'
import LandingPgaeNavBar from './_components/navbar'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex flex-col py-10 px-10 xl:px-0 container'>
        <LandingPgaeNavBar />
        {children}
    </div>
  )
}

export default Layout