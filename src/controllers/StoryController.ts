import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import StoryService from '../services/StoryService';

export default class StoryController {
  private storyService: StoryService;

  constructor(storyService: StoryService) {
    this.storyService = storyService;
  }

  async getStoryandEvents(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO - get storyId from req.params
      const story = await this.storyService.getStoryAndEvents(1);
      if (!story) {
        res.status(200);
        res.json({
          message: userFriendlyMessage.success.getOneStory,
          data: null,
        });
        return;
      }
      res.status(200);
      res.json({
        message: userFriendlyMessage.success.getOneStory,
        data: story,
      });
    } catch (err) {
      res.status(400);
      res.json({
        message: userFriendlyMessage.failure.getOneStory,
      });
      next(err);
    }
  }
}
