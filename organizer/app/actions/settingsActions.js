import { ajaxRequest } from "./ajaxActions";
const process = "?process=UpdateUser";

export const handleUpdate = (newName, newPassword, isHashed, emailUser,callback) => {

    let data= {
        email: emailUser,
        name: newName,
        password: newPassword,
        isHash: isHashed,
    }

    const responseArray = async (responseJSON) => {
        callback(responseJSON);
    };

    ajaxRequest(data, process, responseArray);

};

export const handleDelete = (data,callback) => {

    if(data.email ==="" ){
        return false;
    }
        let process = "?process=DeleteUser";
        const responseArray = async (responseJSON) => {
            callback(responseJSON);
        };

        ajaxRequest(data,process,responseArray);

};