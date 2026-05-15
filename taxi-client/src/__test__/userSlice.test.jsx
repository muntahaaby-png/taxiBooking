import { describe, expect } from "vitest"
import userReducer from "../slices/userSlice"


describe("userSlice", () => {

    it("Should return the initial state", () => {
        const myState = userReducer(undefined, { type: "@@INIT" })
        expect(myState).toHaveProperty("user")
        expect(myState).toHaveProperty("msg", "")
        expect(myState).toHaveProperty("loading", false)
        expect(myState).toHaveProperty("isLoggedIn")
    })


    it("Logout should clear the user and set isLoggedIn to false", () => {
        const myLoggedInState = {
            user: { _id: "u1", userEmail: "a@b.com" },
            msg: "",
            loading: false,
            isLoggedIn: true
        }
        const myNewState = userReducer(myLoggedInState, { type: "user/logout" })
        expect(myNewState.user).toBeNull()
        expect(myNewState.isLoggedIn).toBe(false)
    })

})
