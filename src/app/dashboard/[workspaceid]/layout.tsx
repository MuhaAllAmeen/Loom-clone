import { onAuthenticateUser } from '@/actions/user'
import { getAllUserVideos, getNotifications, getWorkspaceFolders, getWorkspaces, verifyAccessToWorkspace } from '@/actions/workspace'
import { redirect } from 'next/navigation'
import React from 'react'
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'
import Sidebar from '@/components/global/sidebar'
import GlobalHeader from '@/components/global/global-header'

type Props = {
    params: {
        workspaceid: string
    }
    children: React.ReactNode
}

const Layout = async ({ params, children}: Props) => {
    const { workspaceid } = await params; // Await params here
    const auth = await onAuthenticateUser()
    if (!auth.user?.workspace) redirect('/auth/sing-in')
    if (!auth.user.workspace.length) redirect('auth/sign-in')
    const hasAccess = await verifyAccessToWorkspace(workspaceid)
    if (hasAccess.status!==200){
        redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    }

    if(!hasAccess.data?.workspace) return null

    const query = new QueryClient()
    await query.prefetchQuery({
        queryKey:["workspace-folders"],
        queryFn: ()=> getWorkspaceFolders(workspaceid)
    })
    await query.prefetchQuery({
        queryKey:["user-videos"],
        queryFn: ()=> getAllUserVideos(workspaceid)
    })
    await query.prefetchQuery({
        queryKey:["user-workspaces"],
        queryFn: ()=> getWorkspaces()
    })
    await query.prefetchQuery({
        queryKey:["user-notifications"],
        queryFn: ()=> getNotifications()
    })
    return(
    <HydrationBoundary state={dehydrate(query)}>
        <div className='flex h-screen w-screen'>
            <Sidebar activeWorkspaceId = {workspaceid}/>
            <div className='w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden'>
                <GlobalHeader workspace={hasAccess.data.workspace} />
                <div className='mt-4'>
                    {children}
                </div>
            </div>
        </div>
    </HydrationBoundary>
    )
}

export default Layout