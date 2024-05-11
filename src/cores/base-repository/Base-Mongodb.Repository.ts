import {
  Model,
  PipelineStage,
  Types,
  FilterQuery,
  UpdateQuery,
  ProjectionType,
  QueryOptions,
  ObjectId,
} from 'mongoose';
import { MongodbRepository } from './Base.Repository.interface';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { emptyObj, isMongodbId } from 'src/common/utils';
export class GenericRepositoryMongodb<T> extends MongodbRepository {
  public model: Model<T>;

  constructor(readonly theModel: Model<T>) {
    super();
    this.model = theModel;
  }

  public findAll(): Promise<DocumentMongodbType<T>[]> {
    return this.model.find();
  }

  public findOne(filterQuery: FilterQuery<T>): Promise<DocumentMongodbType<T>> {
    return this.model.findOne(filterQuery);
  }

  public async findById(id: Types.ObjectId): Promise<DocumentMongodbType<T>> {
    const result = (await this.model.findById(id)) as DocumentMongodbType<T>;
    return result;
  }

  public findByAggregation<TAggregation>(
    pipeline: PipelineStage[],
  ): Promise<TAggregation[]> {
    return this.model.aggregate(pipeline);
  }

  public find(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<DocumentMongodbType<T>[]> {
    return this.model.find(filter, projection || emptyObj, options || {});
  }

  public update<ObjectId>(
    id: ObjectId,
    newData: Partial<T> | UpdateQuery<T>,
  ): Promise<DocumentMongodbType<T>> {
    return this.model.findByIdAndUpdate(id, newData, { new: true });
  }

  public updateOne(
    filterQuery: FilterQuery<T>,
    newData: UpdateQuery<T>,
  ): Promise<DocumentMongodbType<T>> {
    return this.model.findOneAndUpdate(filterQuery, newData, { new: true });
  }

  public create(data: Partial<T>): Promise<DocumentMongodbType<T>> {
    return this.model.create(data) as any as Promise<DocumentMongodbType<T>>;
  }

  public createMany(data: Partial<T>[]): Promise<any> {
    return this.model.insertMany(data) as any as Promise<
      DocumentMongodbType<T>
    >;
  }

  public countDocuments(filterQuery: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filterQuery);
  }

  public async delete(filter: FilterQuery<T>): Promise<DocumentMongodbType<T>>;
  public async delete(id: Types.ObjectId): Promise<DocumentMongodbType<T>>;
  public async delete<ObjectId>(
    args: ObjectId | FilterQuery<T>,
  ): Promise<DocumentMongodbType<T>> {
    if (isMongodbId(args)) {
      const result = await this.model.findById(args);
      await result.deleteOne();
      return result as any;
    } else {
      const result = await this.model.findOne(args);
      await result.deleteOne();
      return result as any;
    }
  }
}
