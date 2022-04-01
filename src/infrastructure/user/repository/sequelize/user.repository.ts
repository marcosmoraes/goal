import User from "../../../../domain/user/entities/user";
import UserRepositoryInterface from "../../../../domain/user/repository/user-repository.interface";
import UserModel from "./user.model";

export default class UserRepository implements UserRepositoryInterface {

    async create(entity: User): Promise<void> {
        await UserModel.create({
            id: entity.id,
            name: entity.name,
            email: entity.email,
            createdAt: entity.createdAt
        })
    }

    async update(entity: User): Promise<void> {
        try {
            await UserModel.update(
                {
                    name: entity.name
                },
                {
                    where: {
                        id: entity.id
                    }
                }
            )
        } catch (error) {
            throw new Error("User was not updated.")
        }
    }

    async find(id: string): Promise<User> {
        try {
            const userModel = await UserModel.findOne({ where: { id }, rejectOnEmpty: true })
            return new User((userModel)?.name as any, (userModel)?.email as any, (userModel)?.id as any)
        } catch {
            throw new Error("User not found.")
        }
    }

}