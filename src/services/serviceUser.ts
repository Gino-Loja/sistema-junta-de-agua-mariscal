import { getAllUser, getAllUserBySector, getUsersInactivesActives, getListAllUser } from "@/lib/userAction";
import { IUserRepository } from "@/model/user-repository/UserRepository";

export function createApiUserRepository(): IUserRepository {
    return {

        getListAllUser,
        getAllUser,
        getAllUserBySector,
        getUsersInactivesActives
    };
}
