import {
  Model,
  PipelineStage,
  Types,
  FilterQuery,
  UpdateQuery,
  ProjectionType,
  QueryOptions,
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

  public async bulkSave(
    documents: Parameters<typeof this.model.bulkSave>[0],
    options: Parameters<typeof this.model.bulkSave>[1],
  ): Promise<unknown> {
    return this.model.bulkSave(documents, options);
  }

  public async save(document: DocumentMongodbType<any>) {
    return this.model.updateOne({ _id: document._id }, document);
  }

  public async bulkWrite(
    writes: Parameters<typeof this.model.bulkWrite>[0],
    options: Parameters<typeof this.model.bulkWrite>[1],
  ): Promise<unknown> {
    return this.model.bulkWrite(writes, options);
  }

  public async findAll(): Promise<DocumentMongodbType<T>[]> {
    return this.model.find();
  }

  public async findOne(
    filterQuery: FilterQuery<T>,
  ): Promise<DocumentMongodbType<T>> {
    return this.model.findOne(filterQuery);
  }

  public async findById(id: Types.ObjectId): Promise<DocumentMongodbType<T>> {
    const result = (await this.model.findById(id)) as DocumentMongodbType<T>;
    return result;
  }

  public async findByAggregation<TAggregation>(
    pipeline: PipelineStage[],
  ): Promise<TAggregation[]> {
    return this.model.aggregate(pipeline);
  }

  public async find(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<DocumentMongodbType<T>[]> {
    return this.model.find(filter, projection || emptyObj, options || {});
  }

  public async update<ObjectId>(
    id: ObjectId,
    newData: Partial<T> | UpdateQuery<T>,
  ): Promise<DocumentMongodbType<T>> {
    return this.model.findByIdAndUpdate(id, newData, { new: true });
  }

  public async updateOne(
    filterQuery: FilterQuery<T>,
    newData: UpdateQuery<T>,
  ): Promise<DocumentMongodbType<T>> {
    return this.model.findOneAndUpdate(filterQuery, newData, { new: true });
  }

  public async create(data: Partial<T>): Promise<DocumentMongodbType<T>> {
    return this.model.create(data) as any as Promise<DocumentMongodbType<T>>;
  }

  public async createMany(data: Partial<T>[]): Promise<any> {
    return this.model.insertMany(data) as any as Promise<
      DocumentMongodbType<T>
    >;
  }

  public async countDocuments(filterQuery: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filterQuery);
  }

  public async delete(filter: FilterQuery<T>): Promise<DocumentMongodbType<T>>;
  public async delete(id: Types.ObjectId): Promise<DocumentMongodbType<T>>;
  public async delete<ObjectId>(
    args: ObjectId | FilterQuery<T>,
  ): Promise<DocumentMongodbType<T>> {
    if (isMongodbId(args)) {
      const result = await this.model.findById(args);
      result && (await result.deleteOne());
      return result as any;
    } else {
      const result = await this.model.findOne(args);
      result && (await result.deleteOne());
      return result as any;
    }
  }
}
