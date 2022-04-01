import { Goal } from "./goal"
import { GoalStatus } from "../enum/status.enum"

describe('goal unit tests', () => {

    // test("should throw error when description is empty", () => {
    //     expect(() => {
    //         let goal = new Goal('userId1', '')
    //     }).toThrowError("Description is required")
    // })

    test('should finish goal if finished_at is not null and status must be FINALIZED', () => {
        let goal = new Goal('f6ee3c46-4424-4799-a4bb-a5391b57d472', 'some description')
        goal.finishGoal()

        expect(goal.finishedAt).not.toBeNull()
        expect(goal.status).toEqual(GoalStatus.FINISHED)
    })
})

describe('Test levels of goal', () => {

    const goal = new Goal('f6ee3c46-4424-4799-a4bb-a5391b57d472', 'some description')

    test('is BEGINNER if Level is less or equal than 7', () => {
        expect(goal.isBeginner(3)).toBe(true)
        expect(goal.isBeginner(8)).toBe(false)
    })

    test('is PRACTITIONER if Level is greater than 7 and less than or equal 21', () => {
        expect(goal.isPractitioner(11)).toBe(true)
        expect(goal.isPractitioner(22)).toBe(false)
    })

    test('is ADVANCED if Level is greater than 21 and less than or equal 40', () => {
        expect(goal.isAdvanced(31)).toBe(true)
        expect(goal.isAdvanced(42)).toBe(false)
    })

    test('is MASTER if Level is greater than 40 and less than or equal 100', () => {
        expect(goal.isMaster(51)).toBe(true)
        expect(goal.isMaster(142)).toBe(false)
    })

    test('is SIDARTA GAUTAMA if Level is greater than 100', () => {
        expect(goal.isSidartaGautama(123)).toBe(true)
    })

})


