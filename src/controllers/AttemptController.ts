import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import AttemptService from '../services/AttemptService';
import {AttemptCreationAttributes} from '../models/Attempt';

export default class AttemptController {
  private attemptService: AttemptService;

  constructor(attemptService: AttemptService) {
    this.attemptService = attemptService;
  }

  async createNewAttempt(req: Request, res: Response, next: NextFunction) {
    try {
      const {user} = req;
      const {eventId} = req.body;

      const newAttemptData: AttemptCreationAttributes = {
        userId: user.id,
        eventId,
        startDate: new Date().toISOString(),
      };

      const newAttempt = await this.attemptService.createOneAttempt(
        newAttemptData
      );

      res.status(200);
      res.json({
        message: userFriendlyMessage.success.createOneAttempt,
        data: newAttempt,
      });
    } catch (err) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.createOneAttempt});
      next(err);
    }
  }
}
