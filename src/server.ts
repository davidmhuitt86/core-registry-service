import Fastify from "fastify";
import { db } from "./database/index.js";

const app = Fastify({
    logger: true,
});

app.get("/", async () => {

    const result = await db.query(`
        SELECT COUNT(*) AS total
        FROM universal_objects
    `);

    return {
        service: "Engineering Knowledge Engine",
        component: "Core Registry Service",
        universalObjects: result.rows[0].total
    };

});

async function start() {

    try {

        await db.query("SELECT NOW();");

        console.log("Connected to PostgreSQL.");

        await app.listen({
            host: "127.0.0.1",
            port: 3000
        });

    } catch (err) {

        console.error(err);

        process.exit(1);

    }

}

start();