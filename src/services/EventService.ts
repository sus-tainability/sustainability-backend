// import {EventAttributes, EventCreationAttributes} from '../models/Event';
import EventRepository, {FullEvent} from '../repositories/EventRepository';
import Event from '../models/Event';

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

  public async getEventById(eventId: number): Promise<Event> {
    const event = await this.eventRepository.getWithFilters({id: eventId});
    return event[0] as Event;
  }
}
