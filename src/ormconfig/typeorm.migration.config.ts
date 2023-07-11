import { DataSource } from 'typeorm'
import * as dotenv from "dotenv"
dotenv.config()

export const DataBaseSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    password: String("1111"),
    database: String("softalim"),
    username: String("postgres"),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    logging: true,
    synchronize: false,
})