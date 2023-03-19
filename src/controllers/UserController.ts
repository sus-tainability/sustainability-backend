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
      res.json({
        message: userFriendlyMessage.success.getOneUser,
        data: fullUser,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getOneUser});
      next(e);
    }
  }
}
