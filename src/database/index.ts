import { DataSource, DataSourceOptions } from "typeorm"
import entities from './entities';
import { config } from '../utility';

const { isProduction, database_config } = config;

export default new DataSource({
  ...(database_config as DataSourceOptions),
  entities,
  subscribers: [],
  migrations: [],
});
