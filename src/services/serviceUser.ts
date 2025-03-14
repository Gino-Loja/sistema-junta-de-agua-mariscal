import { getAllUser, getAllUserBySector, getUsersInactivesActives, getListAllUser, getAllSector, createUser, updateUser, getUserPagination, getUserLogin, getAllPagination } from "@/lib/userAction";
import { IUserRepository } from "@/model/user-repository/UserRepository";

export function createApiUserRepository(): IUserRepository {
    return {
        getListAllUser,
        getAllUser,
        getAllUserBySector,
        getUsersInactivesActives,
        getAllSector,
        createUser,
        updateUser,
        getUserPagination,
        getAllPagination

    };
}
