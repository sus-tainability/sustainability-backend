import {Model} from 'sequelize';
// import {EventAttributes, EventCreationAttributes} from '../models/Event';
import EventRepository, {FullEvent} from '../repositories/EventRepository';

export default class EventService {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  public async getEventById(
    eventId: number,
    userId: number
  ): Promise<FullEvent> {
    const fullEvent = (await this.eventRepository.getEvent(
      eventId,
      userId
    )) as Model<FullEvent>[];

    console.log(fullEvent);

    return fullEvent[0].get({plain: true});
  }
}
