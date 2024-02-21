import { PipelineStage } from 'mongoose';

export function PopulateSkipAndLimit({
  limit,
  skip,
}: {
  skip: number;
  limit: number;
}): PipelineStage[] {
  return [
    {
      $skip: skip,
    },
    { $limit: limit },
  ];
}
