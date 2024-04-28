export const BaseRepositoryName = 'BaseRepository';

export interface BaseRepository {
  findById(id: unknown): Promise<unknown>;

  findOne(...args: any): Promise<unknown>;

  find(...args: any): Promise<unknown>;

  findAll(): Promise<unknown>;

  update(...args: any): Promise<unknown>;

  delete(id: unknown): Promise<unknown>;

  create(...args: any): Promise<unknown>;
}

export interface MongodbRepository extends BaseRepository {
  findByAggregation(...args: any): Promise<unknown>;
}

// Do later since the app is using mongodb for now!
// And Because I want to allow this app to switch to SQL if I want to in any point in time :)
export interface SQLRepository extends BaseRepository {}
