import CreateFolders from '@/components/global/create-folders'
import CreateWorkspace from '@/components/global/create-workspace'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

type Props = {
    params: {workspaceid: string}
}

const Page = ({params}: Props) => {
  return (
    <div>
        <Tabs defaultValue='Videos' className='mt-6'>
            <div className='flex w-full justify-between items-center'>
                <TabsList className='bg-transparent gap-2 pl-0'>
                    <TabsTrigger className='p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]' value='Videos'>Videos</TabsTrigger>
                    <TabsTrigger className='p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]' value='Archive'>Archive</TabsTrigger>
                </TabsList>
                <div className='flex gap-x-3'>
                    <CreateWorkspace />
                    <CreateFolders workspaceid={params.workspaceid} />
                </div>
            </div>
            <section className='py-9'>
                <TabsContent value='Videos'>
                    <Folders workspaceid={params.workspaceid}/>
                </TabsContent>

            </section>
        </Tabs>
    </div>
  )
}

export default Page