import { BaseRepository } from "./base_repository";
import { User } from "./UserModel";

export class UserRepository extends BaseRepository<User>{
    create(item: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    find(item: User): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
}