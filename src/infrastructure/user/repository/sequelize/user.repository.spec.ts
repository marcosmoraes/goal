import exp from "constants"
import { Sequelize } from "sequelize-typescript"
import User from "../../../../domain/user/entities/user"
import UserModel from "./user.model"
import UserRepository from "./user.repository"

describe("user repository tests", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([UserModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    test("should create an user", async () => {
        const userRepository = new UserRepository()
        const user = new User("Marcos", "marcospsmoraes@gmail.com", "1")
        userRepository.create(user)

        const userModel = await UserModel.findOne({ where: { id: "1" } })

        expect(userModel?.toJSON()).toStrictEqual({
            id: '1',
            name: 'Marcos',
            email: 'marcospsmoraes@gmail.com',
            createdAt: user.createdAt
        })
    })

    test("should update an user", async () => {
        const userRepository = new UserRepository()
        const user = new User("Marcos", "marcospsmoraes@gmail.com", "1")
        await userRepository.create(user)

        user.changeName("Paulinho")
        userRepository.update(user)
        const userModel = await UserModel.findOne({ where: { id: "1" } })

        expect(userModel?.toJSON()).toStrictEqual({
            id: '1',
            name: 'Paulinho',
            email: 'marcospsmoraes@gmail.com',
            createdAt: user.createdAt
        })
    })

    test("should find an user", async () => {
        const userRepository = new UserRepository()
        const user = new User("Marcos", "marcospsmoraes@gmail.com", "1")
        await userRepository.create(user)

        const foundUser = await userRepository.find(user.id)
        foundUser.changeCreatedAt(user.createdAt)
        expect(user).toStrictEqual(foundUser)
    })

    test("should throw an error when user not found", async () => {
        const userRepository = new UserRepository()
        const user = new User("Marcos", "marcospsmoraes@gmail.com", "1")
        userRepository.create(user)

        expect(userRepository.find("2")).rejects.toThrow("User not found.")
    })
})