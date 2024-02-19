import { ObjectType, DataSource } from 'typeorm';

export const excludeColumns = <Entity>(
  dataSource: DataSource,
  entity: ObjectType<Entity>,
  columnsToExclude: (keyof Entity)[],
) => {
  return dataSource
    .getRepository(entity)
    .metadata.columns.map((column) => column.databaseName)
    .filter(
      (columnName) => !columnsToExclude.includes(columnName as keyof Entity),
    ) as (keyof Entity)[];
};
