import FolderDuotone from '@/components/icons/folder-duotone'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import React from 'react'

type Props = {
    workspaceid: string
}

const Folders = ({workspaceid}: Props) => {
    
    return (
    <div className='flex flex-col gap-4 '>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <FolderDuotone />
                <h2 className='text-[#bdbdbd] text-xl'>Folders</h2>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-[#bdbdbd]'>See all</p>
                <ArrowRight color='#707070' />
            </div>
        </div>
        <section className={cn("flex items-center gap-4 overflow-x-auto w-full")}>
            <Folder />
        </section>
    </div>
  )
}

export default Folders