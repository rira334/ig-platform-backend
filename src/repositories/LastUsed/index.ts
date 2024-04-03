import LastUsed from './model';
import { filteredObjects } from './helper';
import BaseRepository from '../BaseRepository';

export default class LastUsedRepository extends BaseRepository {
  constructor() {
    super(
      LastUsed,
      filteredObjects,
    );
  }
}
