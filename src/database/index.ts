import { createConnection } from "typeorm";

createConnection().catch((err) => console.error("Error: ", err));
