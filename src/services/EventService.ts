// import {EventAttributes, EventCreationAttributes} from '../models/Event';
import EventRepository, {FullEvent} from '../repositories/EventRepository';

export default class EventService {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  public async getEventWithAttempt(
    eventId: number,
    userId: number
  ): Promise<FullEvent> {
    const fullEvent = await this.eventRepository.getEventWithAttempt(
      eventId,
      userId
    );

    if (!fullEvent) {
      return undefined;
    }

    if (fullEvent.length === 0) {
      return undefined;
    }

    return fullEvent[0].get({plain: true});
  }
}
