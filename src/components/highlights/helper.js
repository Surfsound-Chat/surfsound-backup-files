export const searchUser=(usersList,searchText)=>{
    let updatedList=[...usersList];
    if(searchText){
        return updatedList.filter((user)=>user.userName.toLowerCase().includes(searchText.toLowerCase()))
    }
    return updatedList;
 
 }