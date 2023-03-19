import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import VoteService from '../services/VoteService';
import {VoteCreationAttributes} from '../models/Vote';

export default class VoteController {
  private voteService: VoteService;

  constructor(voteService: VoteService) {
    this.voteService = voteService;
  }

  async createNewVote(req: Request, res: Response, next: NextFunction) {
    try {
      const {user} = req;
      const {eventId} = req.body;

      const newVoteData: VoteCreationAttributes = {
        userId: user.id,
        eventId,
      };

      const newVote = await this.voteService.createNewVote(newVoteData);

      res.status(200);
      res.json({
        message: userFriendlyMessage.success.createOneVote,
        data: newVote,
      });
    } catch (err) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.createOneVote});
      next(err);
    }
  }
}
