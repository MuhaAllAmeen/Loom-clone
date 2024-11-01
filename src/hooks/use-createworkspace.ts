import { workpsaceSchema } from "@/components/form/workspace-form/schema"
import useZodForm from "./use-zodform"
import { useMutationData } from "./useMutationData"
import { createWorkspace } from "@/actions/workspace"

export const useCreateWorkspace = ()=>{
    const {mutate, isPending} = useMutationData(
        ['create-workspace'],(data: {name: string}) => createWorkspace(data.name), 'user-workspaces'
    )

    const {errors, onFormSubmit, register} = useZodForm(workpsaceSchema,mutate)
    return {errors, onFormSubmit, register, isPending}
}