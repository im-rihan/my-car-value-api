var dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
        migrationsDir: 'migrations',
    },
};

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'mysql',
            username: 'root',
            port: 3306,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ['**/*.entity.js'],
            migrationsRun: true,
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'mysql',
            username: 'root',
            port: 3306,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ['**/*.entity.ts'],
            migrationsRun: true,
        });
        break;
    case 'production':
        Object.assign(dbConfig, {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            migrationsRun: true,
            entities: ['**/*.entity.js'],
            ssl: {
                rejectUnauthorized: false,
            },
        })
        break;
    default:
        throw new Error('unknown environment');
}

module.exports = dbConfig;
