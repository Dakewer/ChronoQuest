import avatar from "../../models/avatar"

export class AvatarManager {
    getAvatar = async => {
    try {
        return await avatarManager.find();
    }
    catch (error) {
        return error;
    }
}
    
}