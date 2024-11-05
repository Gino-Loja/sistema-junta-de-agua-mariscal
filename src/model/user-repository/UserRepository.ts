import { Dto } from "../Dto";
import { QueryResultError, Sector, TotalUser, UsersBySector, UsersInactivesActives } from "../types";
import { User, UserDto } from "../User";

export interface IUserRepository {
    getAllUser: () => Promise<QueryResultError<TotalUser[]>>;
    getAllUserBySector: () => Promise<QueryResultError<UsersBySector[]>>;
    getUsersInactivesActives: () => Promise<QueryResultError<UsersInactivesActives[]>>;
    getListAllUser: () => Promise<QueryResultError<User[]>>;
    getAllSector: () => Promise<QueryResultError<Sector[]>>;
    createUser: ( user: UserDto) => Promise<QueryResultError<User>>;
    updateUser: ( user: UserDto, id:number) => Promise<QueryResultError<User>>;
    getUserPagination: (currentPage: number, itemsPerPage: number, query: string) => Promise<QueryResultError<User[]>>;
}

