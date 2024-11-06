'use server'

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const verifyAccessToWorkspace = async ( workspaceid: string) =>{
    try{
        const user = await currentUser()
        if (!user) return {status: 403}

        const isUserInWorkspace = await client.workSpace.findUnique({
            where: {
                id: workspaceid,
                OR: [{
                    User: {
                        clerkid: user.id
                    }
                },
                {
                    members: {
                        every: {
                            User: {
                                clerkid: user.id
                            }
                        }
                    }
                }]
            }
        })
        return {status: 200, data: {workspace: isUserInWorkspace}}
    }catch(error){
        return {status: 403, data: {workspace: null}}
    }
}

export const getWorkspaceFolders = async (workspaceid:string) =>{
    try{
        const isFolders = await client.folder.findMany({
            where: {
                workspaceid
            },
            include: {
                _count: {
                    select: {
                        videos:true
                    }
                }
            }
        })
        if (isFolders && isFolders.length > 0){
            return {status: 200, data: isFolders}
        }
        return {status: 404, data: []}
    }catch(error){
        return {status:403, data: []}
    }
}

export const getAllUserVideos = async(workspaceid: string) =>{
    try{
        const user = await currentUser()
        if (!user) return {status: 404}
        const videos = await client.video.findMany({
            where: {
                OR:[{workspaceid},{folderId: workspaceid}]
            },
            select:{
                id: true,
                title: true,
                createdAt: true,
                source: true,
                processing: true,
                Folder: {
                    select: {
                        id: true,
                        name: true
                    },
                },
                User: {
                    select:{
                        firstname: true,
                        lastname: true,
                        image: true
                    },
                },
            },
            orderBy:{
                createdAt: "asc"
            },
        })
        if (videos && videos.length > 0){
            return {status: 200, data: videos}
        }
        return {status: 404}
    }catch(error){
        return {status: 400}
    }
}

export const getWorkspaces = async ()=>{
    try{
        const user = await currentUser()
        if (!user) return {status:404}
        const workspaces = await client.user.findUnique({
            where:{
                clerkid: user.id
            },
            select:{
                subscription: {
                    select:{
                        plan: true,
                    },
                },
                workspace: {
                    select:{
                        id: true,
                        name: true,
                        type: true,
                    },
                },
                members:{
                    select:{
                        WorkSpace:{
                            select:{
                                id: true,
                                name: true,
                                type: true
                            }
                        }
                    }
                }
            }
        })
        if (workspaces){
            return {status: 200, data: workspaces}
        }
        return {status: 404}
    }catch(error){
        console.error(error)
        return {status: 400}
    }
}

export const getNotifications = async() => {
    try{
        const user = await currentUser()
        if (!user) return {status: 404}
        const notification = await client.user.findUnique({
            where:{
                clerkid: user.id
            },
            select: {
                notifications: true,
                _count:{
                    select:{
                        notification: true
                    }
                }
            }
        })
        if (notification && notification.notification.length > 0){
            return {status: 200, data: notification}
        }
        return {status: 404, data: []}
    }catch(error){
        return {status: 400, data: []}
    }
}

export const createWorkspace = async(name: string) => {
    try{
        const user = await currentUser()
        if (!user) return {status: 404}
        const authorized = await client.user.findUnique({
            where: {
                clerkid: user.id
            },
            select:{
                subscription: {
                    select:{
                        plan: true
                    }
                }
            }
        })

        if (authorized?.subscription?.plan === "PRO"){
            const workspace = await client.user.update({
                where: {
                    clerkid: user.id
                },
                data: {
                    workspace: {
                        create: {
                            name,
                            type: "PUBLIC"
                        }
                    }
                }
            })
            if (workspace) {
                return {status: 201, data: "Workspace Created"}
            }
        }
        return {status:401, data:"You are not authorized to create a workspace"}
        
    }catch(error){
        return {status:400}
    }
}

export const renameFolders = async (folderid: string, name: string) => {
    try{
        const folder = await client.folder.update({
            where: {
                id: folderid
            },
            data: {
                name
            }
        })
        if (folder){
            return {status: 200, data: 'Folder Rename'}
        }
        return {status: 400, data: 'Folder does not exist'}
    }catch(error){
        return {status:500, data: 'Something went wrong'}
    }
}