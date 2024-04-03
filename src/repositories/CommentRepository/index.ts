import BaseRepository from '../BaseRepository';
import { filteredObjects } from './helper';
import Comment from './model';

export default class CommentRepository extends BaseRepository {
  constructor() {
    super(
      Comment,
      filteredObjects,
    );
  }
}
