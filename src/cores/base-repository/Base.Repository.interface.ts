export const BaseRepositoryName = 'BaseRepository';

export abstract class BaseRepository {
  public abstract findById(id: unknown): Promise<unknown>;

  public abstract findOne(...args: any): Promise<unknown>;

  public abstract find(...args: any): Promise<unknown>;

  public abstract findAll(): Promise<unknown>;

  public abstract update(...args: any): Promise<unknown>;

  public abstract delete(id: unknown): Promise<unknown>;

  public abstract create(...args: any): Promise<unknown>;
}

export abstract class MongodbRepository extends BaseRepository {
  public abstract findByAggregation(...args: any): Promise<unknown>;
  public abstract bulkWrite(...args: any): Promise<unknown>;
  public abstract bulkSave(...args: any): Promise<unknown>;
}

// Do later since the app is using mongodb for now!
// And Because I want to allow this app to switch to SQL if I want to in any point in time :)
export interface SQLRepository extends BaseRepository {}
