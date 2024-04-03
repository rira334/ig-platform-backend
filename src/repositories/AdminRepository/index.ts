import BaseRepository from '../BaseRepository';
import { filteredObjects } from './helper';
import Admin from './model';

export default class AdminRepository extends BaseRepository {
  constructor() {
    super(
      Admin,
      filteredObjects,
    );
  }
}
