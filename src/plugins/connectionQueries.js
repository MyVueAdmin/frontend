export default {
  get (what) {
    var q = null
    if (typeof what === 'object') {
      q = this.repo[what[0]][what[1]]
    } else {
      q = this.repo[what]
    }
    if (q && typeof q !== 'object') {
      q = {template: q, return: 'none'}
    }
    return q
  },
  repo: {
    raw: {template: '$query$', return: 'auto'},
    // basic: select
    databases: {template: 'SHOW DATABASES', return: 'list'},
    tables: {template: 'SHOW TABLES', return: 'list'},
    fields: {template: 'SHOW FULL COLUMNS FROM `$database$`.`$table$`', return: 'array'},
    all: {template: 'SELECT * FROM `$database$`.`$table$`', return: 'array'},
    entry: {template: 'SELECT * FROM `$database$`.`$table$` WHERE `$field$`=\'$value$\'', return: 'row'},
    // basic: mutate
    update: {template: 'UPDATE `$database$`.`$table$` SET $data$ WHERE `$field$`=\'$value$\'', return: 'affected', confirm: true},
    del: {template: 'DELETE FROM `$database$`.`$table$` WHERE `$field$`=\'$value$\'', return: 'affected', confirm: true},
    insert: {template: 'INSERT INTO `$database$`.`$table$` SET $data$', return: 'id'},
    // mutate table
    alter: {template: 'ALTER TABLE `$database$`.`$table$` $data$ ', return: 'status'},
    renameTable: {template: 'RENAME TABLE `$database$`.`$table$` TO `$name$`', return: 'status'},
    copyTable: { template: 'INSERT `$name$` SELECT * FROM `$table$`', return: 'status'},
    copyTableStruct: { template: 'CREATE TABLE `$name$` LIKE `$table$`', return: 'status'},

    delTable: { template: 'DROP TABLE `$table$`', return: 'status'},
    truncateTable: { template: 'TRUNCATE TABLE `$table$`', return: 'status'},
    // mutate column
    delColumn: { template: 'ALTER TABLE `$table$` DROP COLUMN `$nameOld$`', return: 'status' },
    changeColumn: { template: 'ALTER TABLE `$table$` CHANGE `$nameOld$` `$nameNew$` $type$ $isnull$ $defval$ $extra$ COMMENT $comment$ $position$', return: 'none' },
    addColumn: { template: 'ALTER TABLE `$table$` ADD $nameNew$ $type$ $isnull$ $defval$ $extra$ COMMENT $comment$ $position$', return: 'none' },
    // get schema
    databasesSchema: {template: 'SELECT table_schema,COUNT(table_schema) as tables_count,SUM(data_length) as data_size,SUM(index_length) as index_size FROM `information_schema`.`tables` GROUP BY `table_schema` ORDER BY `table_schema`', return: 'array' },
    tablesSchema: { template: 'SELECT table_name,data_length,index_length,table_comment FROM `information_schema`.`tables` WHERE `table_schema`=\'$database$\' ', return: 'array' },
    tableSchema: { template: 'SELECT * FROM `information_schema`.`tables` WHERE `table_schema`=\'$database$\' AND `table_name`=\'$table$\' ', return: 'row' },
    // schema constants
    collations: { template: 'SHOW COLLATION', return: 'array'},
    engines: { template: 'SHOW ENGINES', return: 'array' }
  }
}