import Vote, {VoteCreationAttributes} from '../models/Vote';
import VoteRepository from '../repositories/VoteRepository';

export default class VoteService {
  private voteRepository: VoteRepository;

  constructor(voteRepository: VoteRepository) {
    this.voteRepository = voteRepository;
  }

  async createNewVote(vote: VoteCreationAttributes) {
    return (await this.voteRepository.createOne(vote)) as Vote;
  }
}
