import { TotalUser, UsersBySector, UsersInactivesActives } from "../types";
import { User } from "../User";

export interface IUserRepository {

    
    getAllUser: () => Promise<TotalUser[]>;
    getAllUserBySector: () => Promise<UsersBySector[]>;
    getUsersInactivesActives: () => Promise<UsersInactivesActives[]>;
    getListAllUser: () => Promise<User[]>;
}