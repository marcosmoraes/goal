import { v4 as uuidv4 } from 'uuid'

export default class User {
    private _id: string
    private _name: string
    private _email: string
    private _createdAt!: Date

    constructor(name: string, email: string, id: string) {
        this._id = id || uuidv4()
        this._name = name
        this._email = email
        this._createdAt = new Date()
        this.validate()
    }

    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get email() {
        return this._email
    }

    get createdAt() {
        return this._createdAt
    }

    changeName(name: string) {
        this._name = name
    }

    changeEmail(email: string) {
        this._email = email
    }

    changeCreatedAt(createdAt: Date) {
        this._createdAt = createdAt
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required")
        }
        if (this._email.length === 0) {
            throw new Error("Email is required")
        }
    }

}