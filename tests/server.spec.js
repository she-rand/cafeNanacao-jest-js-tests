const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200 en ruta GET",async() => {
        const response = await request(server).get("/cafes").send();
        const status =response.statusCode;
        const cafeList=response._body;
        const size=cafeList.length
        console.log(response._body)
        console.log(size);
        expect(status).toBe(200);
        expect(cafeList).toBeInstanceOf(Array);
        expect(size).toBeGreaterThan(1);
        expect(cafeList[0]).toBeInstanceOf(Object);
    });

    it("Obteniendo un 404 en ruta delete", async () => {
        const jwt = "token";
        const idDeCafeAEliminar = 10
        const response = await request(server)
        .delete(`/cafes/${idDeCafeAEliminar}`)
        .set("Authorization", jwt)
        .send();
        expect(response.status).toBe(404);
    });

    it("Obteniendo un 201 en ruta post", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: "Nuevo cafe" };
        const { body: cafes,statusCode } = await request(server)
        .post("/cafes")
        .send(cafe);
        expect(cafes).toContainEqual(cafe);
        expect(statusCode).toBe(201);
    });

    it("Obteniendo un 201 en ruta post", async () => {
        
        const cafe = { id:2, nombre: "Americano" };
        const id=3;
        const { statusCode } = await request(server)
        .put(`/cafes/${id}`)
        .send(cafe);
        
        expect(statusCode).toBe(400);
    });
    

});
