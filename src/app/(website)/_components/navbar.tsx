import { Menu, User } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {}

const LandingPgaeNavBar = (props: Props) => {
  return (
    <div className='flex w-full justify-between items-center'>
        <div className='text-3xl font-semibold - flex items-center gap-x-3'>
            <Menu className='w-6 h-8' />
            <Image alt='logo' src="/opal-logo.svg" width={40} height={40} />
            Opal
        </div>
        <div className='hidden gap-x-10 items-center lg:flex'>
            <Link href={"/"} className='bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7340DD]/80'>Home</Link>
            <Link href={"/"}>Pricing</Link>
            <Link href={"/"}>Contact</Link>

        </div>
        <Link href={"/auth/sign-in"}>
            <Button className="text-base flex gap-x-2"><User fill='#000' />
            LogIn

            </Button>
            
        </Link>
    </div>
  )
}

export default LandingPgaeNavBar