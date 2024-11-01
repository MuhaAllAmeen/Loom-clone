'use client'
import { getWorkspaces } from '@/actions/workspace'
import WorkspaceForm from '@/components/form/workspace-form'
import FolderPlusDuotine from '@/components/icons/folder-plus-duotone'
import Modal from '@/components/modal'
import { Button } from '@/components/ui/button'
import { useUserQueryData } from '@/hooks/userQueryData'
import React from 'react'

type Props = {}

const CreateWorkspace = (props: Props) => {
    const {data} = useUserQueryData(["user-workspaces"],getWorkspaces)
    const {data: plan} = data as {
        status: number
        data: {
            subscription: {
                plan: "PRO" | "FREE"
            } | null
        }
    }
    if (plan.subscription?.plan === "FREE"){
        return (<></>)
    }
    if (plan.subscription?.plan === "PRO"){
        return (
            <Modal title='Create a Workspace'
                description='Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself'
                trigger={
                    <Button className='bg-[#1d1d1d] text-[#707070] flex items-center gap-2 py-6 rounded-2xl'>
                         <FolderPlusDuotine />
                         Create a Workspace
                    </Button>
                }
            >
                <WorkspaceForm />

            </Modal>
          )
    }
    
}

export default CreateWorkspace