import User from './user';

describe("User unit tests", () => {

    test("should throw error when name is empty", () => {
        expect(() => {
            let user = new User("", "email@someemail.com", "1");
        }).toThrowError("Name is required")
    })

    test("should throw error when email is empty", () => {
        expect(() => {
            let user = new User("Marcos", "", "1");
        }).toThrowError("Email is required")
    })

})