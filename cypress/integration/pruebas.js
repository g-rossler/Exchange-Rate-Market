/// <reference types="Cypress" />

const PAGINA = "http://192.168.1.4:8080"

context("Exchange Rate Market", () => {

    before(() => {
        cy.visit(PAGINA)
    })

    describe("Prueba la logica de la pagina", () => {

        it("Se asegura que se pueda ingresar un valor permitido", () => {
            cy.get("#importe").type("5")
            cy.get("#boton-cotizar").click()
            cy.get("#cuadro-resultado-cotizacion").wait(750).should("to.exist")
        })

        it("Se asegura que no se pueda ingresar un numero negativo", () => {
            cy.get("#importe").clear()
            cy.get("#importe").type("0")
            cy.get("#boton-cotizar").click()
            cy.get("#cuadro-resultado-cotizacion").should("not.to.exist")
        })

    })


})