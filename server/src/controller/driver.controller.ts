import fs from 'fs';
import express from 'express';
import { Driver, DriverFromJSON } from '../interface/driver.interface';

const driverController = (app: express.Application) => {

  console.log('Init driver controller...');
  const formula1Path = './static';
  const formula1PathDriverJson = `${formula1Path}/drivers.json`;
  let drivers: Driver[];



  app.get('/', async (req: express.Request, res: express.Response) => {
    res.send('server is ready');
  })


  /**
   * Get drivers
   */
  app.get(`/drivers`, async (req: express.Request, res: express.Response) => {
    try {
      const formula1DriversJsonResponse = fs.readFileSync(formula1PathDriverJson, 'utf-8');
      const formula1DriversResponse: DriverFromJSON[] = JSON.parse(formula1DriversJsonResponse);

      drivers = formula1DriversResponse
      .map((driver: DriverFromJSON) => ({driver, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({driver}, index: number) => {
        const code = driver.code;
        const place = index + 1;
        return {
          id: driver.id,
          code: code,
          firstname: driver.firstname,
          lastname: driver.lastname,
          country: driver.country,
          team: driver.team,
          imageUrl: `/static/${code}.png`,
          place: place,
        }
      });
      res.send(drivers);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        data: 'Unexpected error',
        success: false
      });
    }
  });

  app.post('/drivers/:id/overtake', async (req: express.Request, res: express.Response) => {
    try {
      const driverId = Number(req.params.id);

      const driver: Driver | undefined = drivers.find(driver => driver.id === driverId);
      if(!driver) {
        throw new Error('no driver');
      } 

      if(driver.place === 1) {
        res.send(drivers);
      } else {
        const fastDriverIndex = drivers.indexOf(driver);
        const slowDriverIndex = drivers.indexOf(driver) - 1;

        drivers[fastDriverIndex].place -= 1;
        drivers[slowDriverIndex].place += 1;

        [drivers[fastDriverIndex], drivers[slowDriverIndex]] = [drivers[slowDriverIndex], drivers[fastDriverIndex]];
        res.send(drivers);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        data: 'Unexpected error',
        success: false
      });
    }
  })


};

export default driverController;