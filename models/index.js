// import fs from 'fs';
// import path from 'path';
// import { Sequelize, DataTypes } from 'sequelize';
// import process from 'process';
// import configJson from '../config/config.json' assert { type: 'json' };

// // Handle __dirname and __filename not being available in ES module scope
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = configJson[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// const modelFiles = await fs.promises.readdir(__dirname);
// modelFiles
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.endsWith('.js') &&
//       !file.endsWith('.test.js')
//     );
//   })
//   .forEach(async file => {
//     const { default: modelFactory } = await import(path.join(__dirname, file));
//     const model = modelFactory(sequelize, DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(async modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// // db.Sequelize = Sequelize;

// export default db;


import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import process from 'process';
import configJson from '../config/config.json' assert { type: 'json' };
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Corrected approach to read directory and dynamically import modules
async function loadModels(directory) {
  const files = await fs.promises.readdir(directory);
  for (const file of files) {
    const absolutePath = path.join(directory, file);
    if (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.endsWith('.js') &&
      !file.endsWith('.test.js')
    ) {
      const filePathForImport = new URL(file, `file://${directory}/`).href;
      const { default: modelFactory } = await import(filePathForImport);
      const model = modelFactory(sequelize, DataTypes);
      db[model.name] = model;
    }
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}

await loadModels(__dirname);

db.sequelize = sequelize;

export default db;
