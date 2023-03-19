import {UserAttributes, UserCreationAttributes} from '../models/User';
import UserRepository from '../repositories/UserRepository';
import User from '../models/User';

// {
//   "id": 1,
//   "email": "user1@example.com",
//   "createdAt": "2023-03-19T18:54:43.935Z",
//   "updatedAt": "2023-03-19T18:54:43.935Z",
//   "attempts": [
//       {
//           "attemptId": 1,
//           "eventId": 1,
//           "userId": 1,
//           "startDate": "2021-03-18T16:05:41.000Z",
//           "createdAt": "2023-03-19T18:54:44.008Z",
//           "updatedAt": "2023-03-19T18:54:44.008Z",
//           "events": {
//               "id": 1,
//               "name": "Event 1",
//               "description": "Event 1 description",
//               "validationText": "Event 1 validation text",
//               "carbonSave": 100,
//               "eventDuration": 5,
//               "reward": 100,
//               "requiredAssets": 5,
//               "imageUrl": "https://www.svgrepo.com/download/20675/open-cardboard-box.svg",
//               "createdAt": "2023-03-19T18:54:43.996Z",
//               "updatedAt": "2023-03-19T18:54:43.996Z"
//           },
//           "assets": [
//               {
//                   "id": 1,
//                   "attemptId": 1,
//                   "createdAt": "2023-03-19T18:54:44.012Z",
//                   "updatedAt": "2023-03-19T18:54:44.012Z",
//                   "images": {
//                       "id": 1,
//                       "requiredTotal": 1,
//                       "imageUrl": "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/roast_chicken_for_one_41998_16x9.jpg",
//                       "createdAt": "2023-03-19T18:54:44.014Z",
//                       "updatedAt": "2023-03-19T18:54:44.014Z",
//                       "validated": [],
//                       "rejected": [
//                           {
//                               "id": 1,
//                               "imageId": 1,
//                               "userId": 1,
//                               "createdAt": "2023-03-19T18:54:44.020Z",
//                               "updatedAt": "2023-03-19T18:54:44.020Z"
//                           }
//                       ]
//                   }
//               },
//               {
//                   "id": 4,
//                   "attemptId": 1,
//                   "createdAt": "2023-03-19T19:29:02.070Z",
//                   "updatedAt": "2023-03-19T19:29:02.070Z",
//                   "images": {
//                       "id": 4,
//                       "requiredTotal": 1,
//                       "imageUrl": "https://storage.googleapis.com/image-assets-sus-tainability/Screenshot 2023-03-17 at 11.21.30 PM.png",
//                       "createdAt": "2023-03-19T19:29:02.075Z",
//                       "updatedAt": "2023-03-19T19:29:02.075Z",
//                       "validated": [],
//                       "rejected": [
//                           {
//                               "id": 2,
//                               "imageId": 4,
//                               "userId": 1,
//                               "createdAt": "2023-03-19T19:59:52.689Z",
//                               "updatedAt": "2023-03-19T19:59:52.689Z"
//                           }
//                       ]
//                   }
//               },
//               {
//                   "id": 2,
//                   "attemptId": 1,
//                   "createdAt": "2023-03-19T18:54:44.012Z",
//                   "updatedAt": "2023-03-19T18:54:44.012Z",
//                   "images": {
//                       "id": 2,
//                       "requiredTotal": 1,
//                       "imageUrl": "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipes%2F2020-10-twv-crispy-fall-tofu-bowl%2FTheKitchnFallTofuBowl_Option2",
//                       "createdAt": "2023-03-19T18:54:44.014Z",
//                       "updatedAt": "2023-03-19T18:54:44.014Z",
//                       "validated": [
//                           {
//                               "id": 1,
//                               "imageId": 2,
//                               "userId": 1,
//                               "createdAt": "2023-03-19T18:54:44.022Z",
//                               "updatedAt": "2023-03-19T18:54:44.022Z"
//                           }
//                       ],
//                       "rejected": []
//                   }
//               },
//               {
//                   "id": 3,
//                   "attemptId": 1,
//                   "createdAt": "2023-03-19T19:28:50.683Z",
//                   "updatedAt": "2023-03-19T19:28:50.683Z",
//                   "images": {
//                       "id": 3,
//                       "requiredTotal": 1,
//                       "imageUrl": "https://storage.googleapis.com/image-assets-sus-tainability/Screenshot 2023-03-17 at 11.21.30 PM.png",
//                       "createdAt": "2023-03-19T19:28:50.693Z",
//                       "updatedAt": "2023-03-19T19:28:50.693Z",
//                       "validated": [
//                           {
//                               "id": 2,
//                               "imageId": 3,
//                               "userId": 1,
//                               "createdAt": "2023-03-19T20:00:00.723Z",
//                               "updatedAt": "2023-03-19T20:00:00.723Z"
//                           }
//                       ],
//                       "rejected": []
//                   }
//               }
//           ]
//       }
//   ]
// }

type FullUserData = {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  attempts: {
    attemptId: number;
    eventId: number;
    userId: number;
    startDate: string;
    createdAt: string;
    updatedAt: string;
    events: {
      id: number;
      name: string;
      description: string;
      validationText: string;
      carbonSave: number;
      eventDuration: number;
      reward: number;
      requiredAssets: number;
      imageUrl: string;
      createdAt: string;
      updatedAt: string;
    };
    assets: {
      id: number;
      attemptId: number;
      createdAt: string;
      updatedAt: string;
      images: {
        id: number;
        requiredTotal: number;
        imageUrl: string;
        createdAt: string;
        updatedAt: string;
        validated: {
          id: number;
          imageId: number;
          userId: number;
          createdAt: string;
          updatedAt: string;
        }[];
        rejected: {
          id: number;
          imageId: number;
          userId: number;
          createdAt: string;
          updatedAt: string;
        }[];
      };
    }[];
  }[];
};

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return this.userRepository.getAll() as unknown as User[];
  }

  async getOneUserById(id: number, showPassword = false) {
    return (
      await (showPassword
        ? this.userRepository.getScopeWithFilters({id}, 'withPassword')
        : this.userRepository.getWithFilters({id}))
    )[0] as User;
  }

  async getOneUserByEmail(email: string, showPassword = false) {
    return (
      await (showPassword
        ? this.userRepository.getScopeWithFilters({email}, 'withPassword')
        : this.userRepository.getWithFilters({email}))
    )[0] as User;
  }

  async bulkGetUserByEmails(emails: string[], showPassword = false) {
    return (await (showPassword
      ? this.userRepository.getScopeWithFilters({email: emails}, 'withPassword')
      : this.userRepository.getWithFilters({
          email: emails,
        }))) as User[];
  }

  async createOneUser(user: UserCreationAttributes) {
    return (await this.userRepository.createOne(user)) as User;
  }

  async updateOneUserById(id: number, attrs: UserAttributes) {
    return this.userRepository.updateOne(attrs, {id});
  }

  async deleteOneUserById(id: number) {
    return this.userRepository.deleteOne({id});
  }

  async getFullUserDetails(id: number) {
    return (await this.userRepository.getFullUserDetails(id))[0].get({
      plain: true,
    }) as FullUserData;
  }
}
