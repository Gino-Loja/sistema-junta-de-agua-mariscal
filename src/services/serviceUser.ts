import { getAllUser } from "@/lib/userAction";
import { IUserRepository } from "@/model/user-repository/UserRepository";

export function createApiUserRepository(): IUserRepository {
    return {
        getAllUser,
    };
}
