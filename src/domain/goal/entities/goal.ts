import { GoalLevel } from '../enum/level.enum'
import { ChallengeDays } from '../enum/challenge-days.enum'
import { GoalStatus } from '../enum/status.enum'
import { v4 as uuidv4 } from 'uuid'


export class Goal {

    private _id: string
    private _userId: string
    private _description: string
    private _goalLevel: string
    private _createdAt: Date
    private _finishedAt: Date | null
    private _status: string


    constructor(userId: string, description: string, id?: string) {
        this._id = id || uuidv4()
        this._userId = userId
        this._description = description
        this._goalLevel = GoalLevel.BEGINNER
        this._createdAt = new Date()
        this._status = GoalStatus.IN_PROGRESS
        this._finishedAt = null
        this.validate()
    }

    get id() {
        return this._id
    }

    get userId() {
        return this._userId
    }

    get description() {
        return this._description
    }

    get createdAt() {
        return this._createdAt
    }

    get goalLevel() {
        return this._goalLevel
    }

    get finishedAt() {
        return (this._finishedAt !== null) ? this._finishedAt : null
    }

    get status() {
        return this._status
    }

    changeDescription(description: string) {
        this._description = description
    }

    changeLevel(goalLevel: string) {
        this._goalLevel == goalLevel
    }

    changeStatus(status: string) {
        this._status = status
    }

    changeFinishedAt(finishedAt: Date) {
        this._finishedAt = finishedAt
    }

    isBeginner(days: number) {
        return (days <= ChallengeDays.Beginner) ? true : false
    }

    isPractitioner(days: number) {
        return (days > ChallengeDays.Beginner && days <= ChallengeDays.Practitioner) ? true : false
    }

    isAdvanced(days: number) {
        return (days > ChallengeDays.Practitioner && days <= ChallengeDays.Advanced) ? true : false
    }

    isMaster(days: number) {
        return (days > ChallengeDays.Practitioner && days < ChallengeDays.SidartaGautama) ? true : false
    }

    isSidartaGautama(days: number) {
        return (days >= ChallengeDays.SidartaGautama) ? true : false
    }

    validate() {
        if (this._description.length === 0) {
            throw new Error("Description is required")
        }
    }

    finishGoal() {
        this.changeFinishedAt(new Date())
        this.changeStatus(GoalStatus.FINISHED)
    }

}