import {NextFunction, Request, Response} from 'express';
import {Payload} from '../models/User';
import JwtUtils from '../utils/jwtUtils';
import UserService from '../services/UserService';
import userFriendlyMessages from '../consts/userFriendlyMessages';

export default class AuthenticationMiddleware {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async authentication(
    req: Request,
    res: Response,
    next: NextFunction,
    changePassword = false,
    showPassword = false
  ) {
    const bearerToken = req.headers['authorization'] as string;
    const authToken = bearerToken?.split(' ')[1];
    try {
      if (!authToken) {
        return res
          .status(401)
          .send({message: userFriendlyMessages.failure.noAuthToken});
      }
      if (!JwtUtils.getPayload(authToken)) {
        return res
          .status(400)
          .send({message: userFriendlyMessages.failure.malformedToken});
      }

      const payload = JwtUtils.getPayload(authToken) as Payload;
      let user = await this.userService.getOneUserById(
        payload.id,
        showPassword
      );
      if (!user) {
        return res
          .status(400)
          .send({message: userFriendlyMessages.failure.userNotExist});
      }

      const secret = changePassword ? user.password : undefined;
      JwtUtils.verifyAccessToken(authToken, secret);
      user = await this.userService.getOneUserById(user.id);
      req.user = user;
      return next();
    } catch (e: unknown) {
      const {message} = e as Error;
      return res.status(400).json({message: message});
    }
  }
}
