import { Goal } from "../../../../domain/goal/entities/goal"
import { Sequelize } from "sequelize-typescript"
import GoalModel from "./goal.model"
import GoalRepository from "./goal.repository"
import UserModel from "../../../user/repository/sequelize/user.model"

describe("Goal repository test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([GoalModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    test("should create a goal", async () => {
        const goalRepository = new GoalRepository()
        const goal = new Goal("1", "some description", "1")

        await goalRepository.create(goal)

        const goalModel = await GoalModel.findOne({ where: { id: "1" } })

        expect(goalModel?.toJSON()).toStrictEqual({
            id: '1',
            userId: '1',
            description: 'some description',
            goalLevel: 'BEGINNER',
            createdAt: goal.createdAt,
            finishedAt: null,
            status: 'In Progress'
        })
    })

    test("should update a goal", async () => {

        const goalRepository = new GoalRepository()
        const goal = new Goal("1", "some description", "1")

        await goalRepository.create(goal)

        goal.changeDescription("some description updated")

        await goalRepository.update(goal)

        const goalModelUpdated = await GoalModel.findOne({ where: { id: "1" } })

        expect(goalModelUpdated?.toJSON()).toStrictEqual({
            id: '1',
            userId: '1',
            description: 'some description updated',
            goalLevel: 'BEGINNER',
            createdAt: goal.createdAt,
            finishedAt: null,
            status: 'In Progress'
        })

    })

    test("should find a goal", async () => {
        const goalRepository = new GoalRepository()
        const goal = new Goal("1", "some description", "1")

        await goalRepository.create(goal)

        const goalModel = await GoalModel.findOne({ where: { id: "1" } })
        const foundGoal = await goalRepository.find("1")

        expect(goalModel?.toJSON()).toStrictEqual({
            id: foundGoal.id,
            userId: foundGoal.userId,
            description: foundGoal.description,
            goalLevel: foundGoal.goalLevel,
            createdAt: goalModel?.createdAt,
            finishedAt: foundGoal.finishedAt,
            status: foundGoal.status
        })
    })

    test("should throw an error when goal is not found", async () => {
        const goalRepository = new GoalRepository()

        expect(async () => {
            await goalRepository.find("1Ae")
        }).rejects.toThrow("Goal not found")
    })

})