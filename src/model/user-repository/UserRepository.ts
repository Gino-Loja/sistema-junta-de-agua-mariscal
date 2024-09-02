import { User } from "../User";

export interface IUserRepository {
    getAllUser: () => Promise<User[]>;
}