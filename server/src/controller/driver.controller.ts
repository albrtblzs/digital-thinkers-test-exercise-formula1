import fs from 'fs';
import express from 'express';
import { Driver } from '../interface/driver.interface';

const driverController = (app: express.Application) => {

  console.log('Init driver controller...');
  const formula1Path = './formula1';
  const formula1PathDriverJson = `${formula1Path}/drivers.json`;


  /**
   * Get drivers
   */
  app.get(`/drivers`, async (req: express.Request, res: express.Response) => {
    try {
      const formula1DriversJsonResponse = fs.readFileSync(formula1PathDriverJson, 'utf-8');
      const formula1DriversResponse: Driver[] = JSON.parse(formula1DriversJsonResponse);

      const drivers: Driver[] = formula1DriversResponse
      .map((driver: Driver) => ({driver, sort: Math.random()}))
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
      console.log(drivers);
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


};

export default driverController;