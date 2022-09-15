import fs from 'fs';
import express from 'express';

const driverController = (app: express.Application) => {

  console.log('Init driver controller...');


  /**
   * Get drivers
   */
  app.get(`/drivers`, async (req: express.Request, res: express.Response) => {
    try {
      const formula1Path = './formula1/drivers.json';
      const formula1DriversResponse = fs.readFileSync(formula1Path, 'utf-8');
      console.log(JSON.parse(formula1DriversResponse));
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