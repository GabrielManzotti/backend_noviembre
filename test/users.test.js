import { usersManager } from "../src/dao/managers/usersManager.js";
import { expect } from "chai";
import './db.js'

describe("get users", function () {
    it("should return an array", async function () {
        const result = await usersManager.getAdminsUsers()
        expect(result).to.be.an("array")
    })
})