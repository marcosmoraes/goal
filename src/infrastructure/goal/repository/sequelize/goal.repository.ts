import { Goal } from "../../../../domain/goal/entities/goal";
import GoalRepositoryInterface from "../../../../domain/goal/repository/goal-repository.interface";
import GoalModel from "../../../../infrastructure/goal/repository/sequelize/goal.model";

export default class GoalRepository implements GoalRepositoryInterface {

    async create(entity: Goal): Promise<void> {

        await GoalModel.create({
            id: entity.id,
            userId: entity.userId,
            description: entity.description,
            goalLevel: entity.goalLevel,
            createdAt: entity.createdAt,
            finishedAt: null,
            status: entity.status
        })
    }

    async update(entity: Goal): Promise<void> {
        await GoalModel.update(
            {
                description: entity.description
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }

    async find(id: string): Promise<Goal> {
        try {
            const goalModel = await GoalModel.findOne({ where: { id }, rejectOnEmpty: true })
            return new Goal(goalModel?.userId as any, goalModel?.description as any, "1")
        } catch (error) {
            throw new Error("Goal not found")
        }
    }

}