// import {EventAttributes, EventCreationAttributes} from '../models/Event';
import EventRepository, {FullEvent} from '../repositories/EventRepository';
import Event from '../models/Event';
import PartOfRepository from '../repositories/PartOfRepository';

export default class EventService {
  private eventRepository: EventRepository;
  private partOfRepository: PartOfRepository;

  constructor(
    eventRepository: EventRepository,
    partOfRepository: PartOfRepository
  ) {
    this.eventRepository = eventRepository;
    this.partOfRepository = partOfRepository;
  }

  public async getEventWithAttempt(eventId: number): Promise<FullEvent> {
    const fullEvent = await this.eventRepository.getEventWithAttempt(eventId);

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

  public async getEventsPartOfStory(storyId: number) {
    const events = await this.partOfRepository.getAllEventByPartOf(storyId);
    return events;
  }
}
