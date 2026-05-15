import Home from "../components/Home"
import { render, screen } from "@testing-library/react"
import "@testing-library/user-event"
import { describe, expect } from "vitest"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"
import userReducer from "../slices/userSlice"
import driverReducer from "../slices/driverSlice"
import adminReducer from "../slices/adminSlice"
import { LangProvider } from "../components/LangContext"


function renderHome() {
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
                    <Home />
                </LangProvider>
            </MemoryRouter>
        </Provider>
    )
}


describe("Home", () => {

    //Snapshot Testing
    it("Should match the Snapshot", () => {
        const { container } = renderHome()
        expect(container).toMatchSnapshot()
    })


    it("To check if the Hero image is available", () => {
        renderHome()
        const myHero = screen.getByAltText("Hero")
        expect(myHero).toBeInTheDocument()
    })


    it("To check if the Low price image is available", () => {
        renderHome()
        const myImg = screen.getByAltText("Low price")
        expect(myImg).toBeInTheDocument()
    })


    it("To check if the Trust image is available", () => {
        renderHome()
        const myImg = screen.getByAltText("Trust")
        expect(myImg).toBeInTheDocument()
    })


    it("To check if the Easy image is available", () => {
        renderHome()
        const myImg = screen.getByAltText("Easy")
        expect(myImg).toBeInTheDocument()
    })

})
