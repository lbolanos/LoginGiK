import app, { AppDataSource } from './index';
import { seedDatabase } from './seed';

const port = 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected');
    await seedDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
