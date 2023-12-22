import { Router } from "express";
import { logger } from "../winston.js";

const router = Router()

router.get('/', (req, res) => {
    res.send("testing winston")
    logger.debug("testing debug")
    logger.http("testing http")
    logger.info("testing info")
    logger.warn("testing warn")
    logger.error("testing error")
})

export default router