import { Sequelize } from "sequelize";
import {config} from "../config/config"
import models from "../models";

const env = process.env.NODE_ENV || 'dev';
const envConfig = config[env]

 const sql = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
	host: "localhost",
	dialect: envConfig.dialect,
	operatorsAliases: false,
	port: 3306,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

 const db ={
    models : models(sql),
    sql
}

export default db;


