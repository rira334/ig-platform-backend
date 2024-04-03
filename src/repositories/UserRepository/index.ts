import BaseRepository from '../BaseRepository';
import { filteredObjects } from './helper';
import User from './model';

export default class UserRepository extends BaseRepository {
  constructor() {
    super(
      User,
      filteredObjects,
    );
  }
}
