import Login from "../components/Login"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/user-event"
import { describe, expect } from "vitest"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"
import userReducer from "../slices/userSlice"
import driverReducer from "../slices/driverSlice"
import adminReducer from "../slices/adminSlice"
import { LangProvider } from "../components/LangContext"


//Helper to wrap Login in the providers it needs (Redux, Router, Lang)
function renderLogin() {
    const store = configureStore({
        reducer: {
            user: userReducer,
            driver: driverReducer,
            admin: adminReducer
        }
    })

    return render(
        <Provider store={store}>
            <MemoryRouter>
                <LangProvider>
                    <Login />
                </LangProvider>
            </MemoryRouter>
        </Provider>
    )
}


describe("Login", () => {

    //Snapshot Testing
    it("Should match the Snapshot", () => {
        const { container } = renderLogin()
        expect(container).toMatchSnapshot()
    })


    it("To check if the email input is available", () => {
        renderLogin()
        const myEmail = screen.getByTestId("login-email")
        expect(myEmail).toBeInTheDocument()
    })


    it("To check if the password input is available", () => {
        renderLogin()
        const myPwd = screen.getByTestId("login-password")
        expect(myPwd).toBeInTheDocument()
    })


    it("To check if the submit button is available", () => {
        renderLogin()
        const myBtn = screen.getByTestId("login-submit")
        expect(myBtn).toBeInTheDocument()
    })


    it("Email input should accept a valid email", () => {
        renderLogin()
        const myEmail = screen.getByTestId("login-email")
        fireEvent.change(myEmail, { target: { value: "valid.email@example.om" } })
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        expect(emailRegex.test(myEmail.value)).toBe(true)
    })


    it("Email input should reject an invalid email", () => {
        renderLogin()
        const myEmail = screen.getByTestId("login-email")
        fireEvent.change(myEmail, { target: { value: "not-an-email" } })
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        expect(emailRegex.test(myEmail.value)).toBe(false)
    })


    it("Typing in the password field should update its value", () => {
        renderLogin()
        const myPwd = screen.getByTestId("login-password")
        fireEvent.change(myPwd, { target: { value: "mySecret123" } })
        expect(myPwd.value).toBe("mySecret123")
    })

})
