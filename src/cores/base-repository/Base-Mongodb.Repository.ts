import { Model, PipelineStage, Types } from 'mongoose';
import { FilterQuery } from 'mongoose';
import { MongodbRepository } from './Base.Repository.interface';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';

export class GenericRepositoryMongodb<T> implements MongodbRepository {
  public model: Model<T>;

  constructor(readonly theModel: Model<T>) {
    this.model = theModel;
  }

  findAll(): Promise<DocumentMongodbType<T>[]> {
    return this.model.find();
  }

  findOne(filterQuery: FilterQuery<T>): Promise<DocumentMongodbType<T>> {
    return this.model.findOne(filterQuery);
  }

  async findById(id: Types.ObjectId): Promise<DocumentMongodbType<T>> {
    const result = (await this.model.findById(id)) as DocumentMongodbType<T>;
    return result;
  }

  findByAggregation<TAggregation>(
    pipeline: PipelineStage[],
  ): Promise<TAggregation[]> {
    return this.model.aggregate(pipeline);
  }

  find(filterQuery: FilterQuery<T>): Promise<DocumentMongodbType<T>[]> {
    return this.model.find(filterQuery);
  }

  update<ObjectId>(
    id: ObjectId,
    newData: Partial<T>,
  ): Promise<DocumentMongodbType<T>[]> {
    return this.model.findByIdAndUpdate(id, newData, { new: true });
  }

  create(data: Partial<T>): Promise<DocumentMongodbType<T>> {
    return this.model.create(data) as any as Promise<DocumentMongodbType<T>>;
  }

  countDocuments(filterQuery: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filterQuery);
  }

  async delete<ObjectId>(id: ObjectId): Promise<T> {
    const result = await this.model.findByIdAndDelete(id);
    return result.value;
  }
}
