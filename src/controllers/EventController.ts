import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import EventService from '../services/EventService';

export default class UserController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  async getEventWithAttempt(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params;
      const {user} = req;
      const event = await this.eventService.getEventWithAttempt(
        parseInt(id),
        user.id
      );

      if (!event) {
        res.status(200);
        res.json({
          message: userFriendlyMessage.failure.eventNotFound,
          data: [],
        });
        return;
      }

      const assets = event.attempts[0].assets.map(a => {
        console.log(a);
        return {
          id: a.id,
          attemptId: a.attemptId,
          imgUrl: a.images.imageUrl,
          status:
            a.images.validated.length + a.images.rejected.length <
            a.images.requiredTotal
              ? 'pending'
              : a.images.validated.length / a.images.requiredTotal >= 0.5
              ? 'validated'
              : 'rejected',
        };
      });

      const numOfValidatedImages = assets.reduce(
        (acc, asset) => (asset.status === 'validated' ? acc + 1 : acc),
        0
      );

      const attempt = {
        attemptId: event.attempts[0].attemptId,
        eventId: event.attempts[0].eventId,
        userId: event.attempts[0].userId,
        startDate: event.attempts[0].startDate,
        assets,
        carbonSave: event.carbonSave * numOfValidatedImages,
        createdAt: event.attempts[0].createdAt,
        updatedAt: event.attempts[0].updatedAt,
      };

      const outputData = {
        id: event.id,
        name: event.name,
        description: event.description,
        eventDuration: event.eventDuration,
        reward: event.reward,
        requiredAssets: event.requiredAssets,
        imageUrl: event.imageUrl,
        carbonSavePerAsset: event.carbonSave,
        attempt,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
      };

      res.json({
        message: userFriendlyMessage.success.getOneEvent,
        data: outputData,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getOneEvent});
      next(e);
    }
  }
}
