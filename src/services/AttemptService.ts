import {AttemptCreationAttributes} from '../models/Attempt';
import AttemptRepository from '../repositories/AttemptRepository';
import Attempt from '../models/Attempt';

export default class AttemptService {
  private attemptRepository: AttemptRepository;

  constructor(attemptRepository: AttemptRepository) {
    this.attemptRepository = attemptRepository;
  }

  async createOneAttempt(attempt: AttemptCreationAttributes) {
    return (await this.attemptRepository.createOne(attempt)) as Attempt;
  }
}
