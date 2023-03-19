import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import UserService from '../services/UserService';

export default class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getSelf(req: Request, res: Response, next: NextFunction) {
    try {
      const {user} = req;
      const fullUser = await this.userService.getFullUserDetails(user.id);

      type OutputData = {
        id: number;
        email: string;
        totalCarbonSaved: number;
        totalPoints: number;
      };

      const totalCarbonSaved = fullUser.attempts
        .map(attempt => {
          const totalValidatedAssets = attempt.assets
            .map(asset => asset.images.validated.length)
            .reduce((a, b) => a + b, 0);
          return totalValidatedAssets * attempt.events.carbonSave;
        })
        .reduce((a, b) => a + b, 0);

      const totalPoints = fullUser.attempts
        .map(attempt => {
          const totalValidatedAssets = attempt.assets
            .map(asset => asset.images.validated.length)
            .reduce((a, b) => a + b, 0);
          const isComplete =
            totalValidatedAssets === attempt.events.requiredAssets;
          return isComplete ? attempt.events.reward : 0;
        })
        .reduce((a, b) => a + b, 0);

      const outputData: OutputData = {
        id: fullUser.id,
        email: fullUser.email,
        totalCarbonSaved,
        totalPoints,
      };

      res.json({
        message: userFriendlyMessage.success.getOneUser,
        data: outputData,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getOneUser});
      next(e);
    }
  }
}
