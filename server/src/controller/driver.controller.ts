import fs from 'fs';
import express from 'express';
import { Driver, DriverFromJSON } from '../interface/driver.interface';

const driverController = (app: express.Application) => {

  console.log('Init driver controller...');
  const formula1Path = './formula1';
  const formula1PathDriverJson = `${formula1Path}/drivers.json`;
  let drivers: Driver[];


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
          imageUrl: `${formula1Path}/${code}.png`,
          place: place,
        }
      });
      res.send({
        data: {
          drivers
        },
        success: true
      });
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
      console.log('driverId', driverId);
      const driver: Driver | undefined = drivers.find(driver => driver.id === driverId);
      if(!driver) {
        throw new Error('no driver');
      } 
      console.log('indexof', drivers.indexOf(driver));
      if(driver.place === 1) {
        res.send({
          data: {
            drivers,
          },
          success: true
        });
      } else {
        const fastDriverIndex = drivers.indexOf(driver);
        const slowDriverIndex = drivers.indexOf(driver) - 1;

        drivers[fastDriverIndex].place -= 1;
        drivers[slowDriverIndex].place += 1;

        [drivers[fastDriverIndex], drivers[slowDriverIndex]] = [drivers[slowDriverIndex], drivers[fastDriverIndex]];
        console.log(drivers);
        res.send({
          data: {
            drivers
          },
          success: true
        });
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