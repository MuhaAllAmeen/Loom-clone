'use client'
import { getNotifications, getWorkspaces } from '@/actions/workspace'
import Modal from '@/components/modal'
import Search from '@/components/search'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { MENU_ITEMS } from '@/constants'
import { useUserQueryData } from '@/hooks/userQueryData'
import { NotificationProps, WorkspaceProps } from '@/types/index.type'
import { Menu, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import SidebarItem from './sidebar-item'
import WorkspacePlaceHolder from './workspace-placeholder'
import GlobalCard from '../global-card'
import { Button } from '@/components/ui/button'
import Loader from '../loader'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import InfoBar from '../info-bar'

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({activeWorkspaceId}: Props) => {
    const router = useRouter()
    const {data, isFetched} = useUserQueryData(["user-workspaces"],getWorkspaces)
    console.log(data)
    const {data: workspace} = data as WorkspaceProps
    const onChangeActiveWorkspace = (value: string) =>{
        router.push(`/dashboard/${value}`)
    }
    const menuItems = MENU_ITEMS(activeWorkspaceId)

    const currentWorkspace = workspace.workspace.find((s)=>s.id==activeWorkspaceId)
    const panthName = usePathname()
    const {data:notifications} = useUserQueryData(["user-notifications"],getNotifications)
    const {data:count} = notifications as NotificationProps

    const SidebarSection = (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden'>
        <div className='bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0'>
            <Image src={"/opal-logo.svg"} alt='logo' height={40} width={40} />
            <p className='text-2xl'>Opal</p>
        </div>
        <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}>
            <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
                <SelectValue placeholder="Select a workspace"></SelectValue>
            </SelectTrigger>
            <SelectContent className='bg-[#111111] backdrop-blur-xl'>
                <SelectGroup>
                    <SelectLabel>Workspaces</SelectLabel>
                    <Separator/>
                    {workspace.workspace.map((workspace)=>(
                        <SelectItem key={workspace.id} value={workspace.id}>
                            {workspace.name}
                        </SelectItem>
                    ))}
                    {workspace.members.length > 0 && workspace.members.map((workspace)=> 
                        workspace.Workspace && (
                            <SelectItem value={workspace.Workspace.id} key={workspace.Workspace.id}>{workspace.Workspace.name}</SelectItem>
                        )
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
        {currentWorkspace?.type === "PUBLIC" && workspace.subscription?.plan === "PRO" && <Modal title='Invite To Workspace' trigger={<span className='text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2'>
                <PlusCircle size={15} className='text-neutral-800/90 fill-neutral-500' />
                <span className='text-neutral-400 font-semibold text-xs'>Invite to Workspace</span>
            </span>
        } description='Invite other users to your workspace'>
            <Search workspaceid={activeWorkspaceId} />
        </Modal>}
        <p className='w-full text-[#9d9d9d] font-bold mt-4'>Menu</p>
        <nav className='w-full'>
            <ul>
                {menuItems.map((item)=>(
                    <SidebarItem
                        key={item.title}
                        href={item.href} 
                        icon={item.icon} 
                        selected={panthName === item.href} 
                        title={item.title} 
                        notifications={
                            (item.title === 'Notifications' && 
                                count._count && count._count.notification
                            ) || 0
                        } />
                ))}
            </ul>
        </nav>
        <Separator className='w-4/5' />
        <p className='w-full text-[#9d9d9d] font-bold mt-4'>Workspaces</p>
        {
            workspace.workspace.length ===1 && workspace.members.length === 0 &&
            (<div className='w-full mt-[-10px]'>
                <p className='text-[#3c3c3c] font-medium text-sm'>{workspace.subscription?.plan === "FREE" ? "Upgrade to create Workspaces": "No Workspaces"}</p>
            </div>)
        }
        <nav className='w-full'>
            <ul className='h-[150px] overflow-auto overflow-x-hidden fade-layer '>
                {workspace.workspace.length > 0 && 
                    workspace.workspace.map((item)=> 
                        item.type!=="PERSONAL" && 
                        (<SidebarItem title={item.name} href={`/dashboard/${item.id}`} selected={panthName === `/dashboard/${item.id}` } notifications={0} key={item.name} icon = {<WorkspacePlaceHolder>{item.name.charAt(0)}</WorkspacePlaceHolder>} />))}
                        {
                            workspace.members.length > 0 && workspace.members.map((item)=> (<SidebarItem title={item.Workspace.name} href={`/dashboard/${item.Workspace.id}`} selected={panthName === `/dashboard/${item.Workspace.id}` } notifications={0} key={item.Workspace.name} icon = {<WorkspacePlaceHolder>{item.Workspace.name.charAt(0)}</WorkspacePlaceHolder>} />))
                        }
                       
            </ul>
        </nav>
        <Separator className='w-4/5' />
        {workspace.subscription?.plan === "FREE" && (<GlobalCard title='Upgrade to PRO' description='Unlock AI features like transcription, AI Summary and more'>
            <Button className='text-sm w-full mt-2'>
                <Loader color='#000' state={false}>Upgrade</Loader>
            </Button>
            </GlobalCard>)}
    </div>

  )
  return <div className='full'>
    <InfoBar />
    <div className='md:hidden fixed my-4'>
        <Sheet>
            <SheetTrigger asChild className='ml-2'>
                <Button variant={"ghost"} className='mt-[2px]'>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side={'left'} className='p-0 w-fit h-full'>
                {SidebarSection}
            </SheetContent>
        </Sheet>
    </div>
    <div className='md:block hidden h-full'>{SidebarSection}</div>
  </div>
}

export default Sidebar