export const getCollaborator = (collaborators, type) => {
   const collaborator =  collaborators.filter((collaborator)=>{
        return collaborator.collaboratorType.type === type 
    })

    return collaborator[0].id
}