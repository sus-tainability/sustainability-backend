import StoryRepository from '../repositories/StoryRepository';

export default class StoryService {
  private storyRepository: StoryRepository;

  constructor(storyRepository: StoryRepository) {
    this.storyRepository = storyRepository;
  }

  async getStoryAndEvents(storyId: number) {
    const story = await this.storyRepository.getStoryAndEvents(storyId);
    return story ? story : null;
  }
}
