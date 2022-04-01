import { v4 as uuidv4, validate as validateUUID } from 'uuid'
import InvalidUuidError from '../errors/invalid-uuid.error'

//value object
export default class UniqueEntityId {

    constructor(public readonly id?: string) {
        this.id = id || uuidv4()
        this.validate()
    }

    private validate(){
        const isValid = validateUUID(this.id as any)
        if(!isValid){
            throw new InvalidUuidError()
        }
    }
}