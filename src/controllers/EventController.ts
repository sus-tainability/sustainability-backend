import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import EventService from '../services/EventService';

export default class UserController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  async getNextEvents(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: change magic number to storyId from user
      const events = await this.eventService.getEventsPartOfStory(1);
      const {user} = req;

      // get closest two future events based on start date
      // returns null if no future events
      const now = new Date();
      const nextEvents = events
        .map(e => {
          const startDate = new Date(e.startDate);
          const isFuture = startDate > now;
          return {
            ...e,
            isFuture,
            eventOne: {
              ...e.eventOne,
              votes: e.eventOne.votes.length,
              isYourVote: e.eventOne.votes.some(
                vote => vote.userId === user.id
              ),
            },
            eventTwo: {
              ...e.eventTwo,
              votes: e.eventTwo.votes.length,
              isYourVote: e.eventOne.votes.some(
                vote => vote.userId === user.id
              ),
            },
          };
        })
        .sort((a, b) => {
          const aDate = new Date(a.startDate);
          const bDate = new Date(b.startDate);
          return aDate.getTime() - bDate.getTime();
        })
        .find(e => e.isFuture);

      if (!nextEvents) {
        res.status(200);
        res.json({
          message: userFriendlyMessage.success.noFutureEvents,
          data: null,
        });
        return;
      }

      res.status(200);
      res.json({
        message: userFriendlyMessage.success.getAllEvents,
        data: nextEvents,
      });
    } catch (err) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllEvents});
      next(err);
    }
  }

  async getCurrentEvent(req: Request, res: Response, next: NextFunction) {
    // get current event based on startdate, votes and event duration
    // returns null if no current event
    try {
      // TODO: change magic number to storyId from user
      const events = await this.eventService.getEventsPartOfStory(1);

      const addDays = (date: Date, days: number) => {
        date.setDate(date.getDate() + days);
        return date;
      };

      const now = new Date();
      const currentEvent = events
        .map(e => {
          const startDate = new Date(e.startDate);
          const endDateOne = addDays(
            new Date(e.startDate),
            e.eventOne.eventDuration
          );
          const endDateTwo = addDays(
            new Date(e.startDate),
            e.eventTwo.eventDuration
          );
          const isOnGoingOne = startDate < now && now < endDateOne;
          const isOnGoingTwo = startDate < now && now < endDateTwo;
          return {
            ...e,
            isCurrent: isOnGoingOne || isOnGoingTwo,
            eventOne: {
              ...e.eventOne,
              votes: e.eventOne.votes.length,
              isOngoing: isOnGoingOne,
            },
            eventTwo: {
              ...e.eventTwo,
              votes: e.eventTwo.votes.length,
              isOngoing: isOnGoingTwo,
            },
          };
        })
        .find(e => e.isCurrent);

      if (!currentEvent) {
        res.status(200);
        res.json({
          message: userFriendlyMessage.success.noCurrentEvents,
          data: null,
        });
        return;
      }
      const winningEvent =
        currentEvent.eventOne.votes > currentEvent.eventTwo.votes
          ? currentEvent.eventOne
          : currentEvent.eventTwo;
      req.params.id = winningEvent.id.toString();
      return this.getEventWithAttempt(req, res, next);
    } catch (err) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllEvents});
      next(err);
    }
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
        const eventWithoutAttempt = (
          await this.eventService.getEventById(parseInt(id))
        ).get({plain: true});

        res.status(200);
        res.json({
          message: userFriendlyMessage.success.getOneEvent,
          data: {
            ...eventWithoutAttempt,
            carbonSavePerAsset: eventWithoutAttempt.carbonSave,
            attempt: null,
          },
        });
        return;
      }

      const assets = event.attempts[0].assets.map(a => {
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
        carbonSave: event.carbonSave * numOfValidatedImages,
        assets,
        createdAt: event.attempts[0].createdAt,
        updatedAt: event.attempts[0].updatedAt,
      };

      const outputData = {
        id: event.id,
        name: event.name,
        description: event.description,
        validationText: event.validationText,
        carbonSavePerAsset: event.carbonSave,
        eventDuration: event.eventDuration,
        reward: event.reward,
        requiredAssets: event.requiredAssets,
        imageUrl: event.imageUrl,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        attempt,
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
