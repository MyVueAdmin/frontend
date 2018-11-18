export default {
  namespaced: true,
  state: {
    mysql: {
      keywords: ['accessible', 'account', 'action', 'add', 'admin', 'after', 'against', 'aggregate', 'algorithm', 'all', 'alter', 'always', 'analyse', 'analyze', 'and', 'any', 'as', 'asc', 'ascii', 'asensitive', 'at', 'autoextend_size', 'auto_increment', 'avg', 'avg_row_length', 'backup', 'before', 'begin', 'between', 'bigint', 'binary', 'binlog', 'bit', 'blob', 'block', 'bool', 'boolean', 'both', 'btree', 'buckets', 'by', 'byte', 'cache', 'call', 'cascade', 'cascaded', 'case', 'catalog_name', 'chain', 'change', 'changed', 'channel', 'char', 'character', 'charset', 'check', 'checksum', 'cipher', 'class_origin', 'client', 'clone', 'close', 'coalesce', 'code', 'collate', 'collation', 'column', 'columns', 'column_format', 'column_name', 'comment', 'commit', 'committed', 'compact', 'completion', 'component', 'compressed', 'compression', 'concurrent', 'condition', 'connection', 'consistent', 'constraint', 'constraint_catalog', 'constraint_name', 'constraint_schema', 'contains', 'context', 'continue', 'convert', 'cpu', 'create', 'cross', 'cube', 'cume_dist', 'current', 'current_date', 'current_time', 'current_timestamp', 'current_user', 'cursor', 'cursor_name', 'data', 'database', 'databases', 'datafile', 'date', 'datetime', 'day', 'day_hour', 'day_microsecond', 'day_minute', 'day_second', 'deallocate', 'dec', 'decimal', 'declare', 'default', 'default_auth', 'definer', 'definition', 'delayed', 'delay_key_write', 'delete', 'dense_rank', 'desc', 'describe', 'description', 'des_key_file', 'deterministic', 'diagnostics', 'directory', 'disable', 'discard', 'disk', 'distinct', 'distinctrow', /* 'div', */ 'do', 'double', 'drop', 'dual', 'dumpfile', 'duplicate', 'dynamic', 'each', 'else', 'elseif', 'empty', 'enable', 'enclosed', 'encryption', 'end', 'ends', 'engine', 'engines', 'enum', 'error', 'errors', 'escape', 'escaped', 'event', 'events', 'every', 'except', 'exchange', 'exclude', 'execute', 'exists', 'exit', 'expansion', 'expire', 'explain', 'export', 'extended', 'extent_size', 'false', 'fast', 'faults', 'fetch', 'fields', 'file', 'file_block_size', 'filter', 'first', 'first_value', 'fixed', 'float', 'float4', 'float8', 'flush', 'following', 'follows', 'for', 'force', 'foreign', 'format', 'found', 'from', 'full', 'fulltext', 'function', 'general', 'generated', 'geomcollection', 'geometry', 'geometrycollection', 'get', 'get_format', 'get_master_public_key', 'global', 'grant', 'grants', 'group', 'grouping', 'groups', 'group_replication', 'handler', 'hash', 'having', 'help', 'high_priority', 'histogram', 'history', 'host', 'hosts', 'hour', 'hour_microsecond', 'hour_minute', 'hour_second', 'identified', 'if', 'ignore', 'ignore_server_ids', 'import', 'in', 'index', 'indexes', 'infile', 'initial_size', 'inner', 'inout', 'insensitive', 'insert', 'insert_method', 'install', 'instance', 'int', 'int1', 'int2', 'int3', 'int4', 'int8', 'integer', 'interval', 'into', 'invisible', 'invoker', 'io', 'io_after_gtids', 'io_before_gtids', 'io_thread', 'ipc', 'is', 'isolation', 'issuer', 'iterate', 'join', 'json', 'json_table', 'key', 'keys', 'key_block_size', 'kill', 'lag', 'language', 'last', 'last_value', 'lead', 'leading', 'leave', 'leaves', 'left', 'less', 'level', 'like', 'limit', 'linear', 'lines', 'linestring', 'list', 'load', 'local', 'localtime', 'localtimestamp', 'lock', 'locked', 'locks', 'logfile', 'logs', 'long', 'longblob', 'longtext', 'loop', 'low_priority', 'master', 'master_auto_position', 'master_bind', 'master_connect_retry', 'master_delay', 'master_heartbeat_period', 'master_host', 'master_log_file', 'master_log_pos', 'master_password', 'master_port', 'master_public_key_path', 'master_retry_count', 'master_server_id', 'master_ssl', 'master_ssl_ca', 'master_ssl_capath', 'master_ssl_cert', 'master_ssl_cipher', 'master_ssl_crl', 'master_ssl_crlpath', 'master_ssl_key', 'master_ssl_verify_server_cert', 'master_tls_version', 'master_user', 'match', 'maxvalue', 'max_connections_per_hour', 'max_queries_per_hour', 'max_rows', 'max_size', 'max_updates_per_hour', 'max_user_connections', 'medium', 'mediumblob', 'mediumint', 'mediumtext', 'memory', 'merge', 'message_text', 'microsecond', 'middleint', 'migrate', 'minute', 'minute_microsecond', 'minute_second', 'min_rows', 'mod', 'mode', 'modifies', 'modify', 'month', 'multilinestring', 'multipoint', 'multipolygon', 'mutex', 'mysql_errno', 'name', 'names', 'national', 'natural', 'nchar', 'ndb', 'ndbcluster', 'nested', 'never', 'new', 'next', 'no', 'nodegroup', 'none', 'not', 'nowait', 'no_wait', 'no_write_to_binlog', 'nth_value', 'ntile', 'null', 'nulls', 'number', 'numeric', 'nvarchar', 'of', 'offset', 'on', 'one', 'only', 'open', 'optimize', 'optimizer_costs', 'option', 'optional', 'optionally', 'options', 'or', 'order', 'ordinality', 'organization', 'others', 'out', 'outer', 'outfile', 'over', 'owner', 'pack_keys', 'page', 'parser', 'partial', 'partition', 'partitioning', 'partitions', 'password', 'path', 'percent_rank', 'persist', 'persist_only', 'phase', 'plugin', 'plugins', 'plugin_dir', 'point', 'polygon', 'port', 'precedes', 'preceding', 'precision', 'prepare', 'preserve', 'prev', 'primary', 'privileges', 'procedure', 'process', 'processlist', 'profile', 'profiles', 'proxy', 'purge', 'quarter', 'query', 'quick', 'range', 'rank', 'read', 'reads', 'read_only', 'read_write', 'real', 'rebuild', 'recover', 'recursive', 'redofile', 'redo_buffer_size', 'redundant', 'reference', 'references', 'regexp', 'relay', 'relaylog', 'relay_log_file', 'relay_log_pos', 'relay_thread', 'release', 'reload', 'remote', 'remove', 'rename', 'reorganize', 'repair', 'repeat', 'repeatable', 'replace', 'replicate_do_db', 'replicate_do_table', 'replicate_ignore_db', 'replicate_ignore_table', 'replicate_rewrite_db', 'replicate_wild_do_table', 'replicate_wild_ignore_table', 'replication', 'require', 'reset', 'resignal', 'resource', 'respect', 'restart', 'restore', 'restrict', 'resume', 'return', 'returned_sqlstate', 'returns', 'reuse', 'reverse', 'revoke', 'right', 'rlike', 'role', 'rollback', 'rollup', 'rotate', 'routine', 'row', 'rows', 'row_count', 'row_format', 'row_number', 'rtree', 'savepoint', 'schedule', 'schema', 'schemas', 'schema_name', 'second', 'secondary_engine', 'secondary_load', 'secondary_unload', 'second_microsecond', 'security', 'select', 'sensitive', 'separator', 'serial', 'serializable', 'server', 'session', 'set', 'share', 'show', 'shutdown', 'signal', 'signed', 'simple', 'skip', 'slave', 'slow', 'smallint', 'snapshot', 'socket', 'some', 'soname', 'sounds', 'source', 'spatial', 'specific', 'sql', 'sqlexception', 'sqlstate', 'sqlwarning', 'sql_after_gtids', 'sql_after_mts_gaps', 'sql_before_gtids', 'sql_big_result', 'sql_buffer_result', 'sql_cache', 'sql_calc_found_rows', 'sql_no_cache', 'sql_small_result', 'sql_thread', 'sql_tsi_day', 'sql_tsi_hour', 'sql_tsi_minute', 'sql_tsi_month', 'sql_tsi_quarter', 'sql_tsi_second', 'sql_tsi_week', 'sql_tsi_year', 'srid', 'ssl', 'stacked', 'start', 'starting', 'starts', 'stats_auto_recalc', 'stats_persistent', 'stats_sample_pages', 'status', 'stop', 'storage', 'stored', 'straight_join', 'string', 'subclass_origin', 'subject', 'subpartition', 'subpartitions', 'super', 'suspend', 'swaps', 'switches', 'system', 'table', 'tables', 'tablespace', 'table_checksum', 'table_name', 'temporary', 'temptable', 'terminated', 'text', 'than', 'then', 'thread_priority', 'ties', 'time', 'timestamp', 'timestampadd', 'timestampdiff', 'tinyblob', 'tinyint', 'tinytext', 'to', 'trailing', 'transaction', 'trigger', 'triggers', 'true', 'truncate', 'type', 'types', 'unbounded', 'uncommitted', 'undefined', 'undo', 'undofile', 'undo_buffer_size', 'unicode', 'uninstall', 'union', 'unique', 'unknown', 'unlock', 'unsigned', 'until', 'update', 'upgrade', 'usage', 'use', 'user', 'user_resources', 'use_frm', 'using', 'utc_date', 'utc_time', 'utc_timestamp', 'validation', 'value', 'values', 'varbinary', 'varchar', 'varcharacter', 'variables', 'varying', 'vcpu', 'view', 'virtual', 'visible', 'wait', 'warnings', 'week', 'weight_string', 'when', 'where', 'while', 'window', 'with', 'without', 'work', 'wrapper', 'write', 'x', 'x509', 'xa', 'xid', 'xml', 'xor', 'year', 'year_month', 'zerofill', 'admin', 'buckets', 'clone', 'component', 'cume_dist', 'definition', 'dense_rank', 'description', 'empty', 'except', 'exclude', 'first_value', 'following', 'geomcollection', 'get_master_public_key', 'grouping', 'groups', 'histogram', 'history', 'invisible', 'json_table', 'lag', 'last_value', 'lead', 'locked', 'master_public_key_path', 'nested', 'nowait', 'nth_value', 'ntile', 'nulls', 'of', 'optional', 'ordinality', 'organization', 'others', 'over', 'path', 'percent_rank', 'persist', 'persist_only', 'preceding', 'process', 'rank', 'recursive', 'reference', 'remote', 'resource', 'respect', 'restart', 'reuse', 'role', 'row_number', 'secondary_engine', 'secondary_load', 'secondary_unload', 'skip', 'srid', 'system', 'thread_priority', 'ties', 'unbounded', 'vcpu', 'visible', 'window'],
      queries: {
        select: ['select', 'from', 'join', 'where', 'group by', 'having', 'order by', 'limit', 'procedure', 'for', 'lock'],
        insert: ['insert', 'into', 'values', 'select', 'set'],
        update: ['update', 'set', 'where', 'limit'],
        delete: ['delete', 'from', 'using', 'where', 'order', 'limit'],
        create: ['create', ['database', 'table', 'index']],
        drop: ['drop', ['database', 'table', 'index']],
        alter: ['alter', 'table'],
        rename: ['rename', 'table'],
        truncate: ['truncate'],
        replace: ['insert', 'into', 'values', 'select', 'set'],
        describe: ['describe'],
        explain: ['explain'],
        handler: ['handler'],
        do: ['do']
      },
      tableParams: [
        {label: 'table_name'},
        {label: 'collate', type: 'enum', options: null, function: true},
        {label: 'comment', },
        {label: 'engine', type: 'enum', options: null, function: true},
        {label: 'pack_keys', type: 'enum', options: ['DEFAULT', '0', '1'], engine: 'MyISAM', function: true},
        {label: 'checksum', type: 'enum', options: ['0', '1'], engine: 'MyISAM', function: true},
        {label: 'delay_key_write', type: 'enum', options: ['0', '1'], engine: 'MyISAM', function: true},
        {label: 'auto_increment', function: true},
        {label: 'row_format', type: 'enum', function: true}
      ],
      fields: [
        {label: 'Position', type: 'enum', options: null},
        {label: 'Field'},
        {label: 'Type', type: 'typeMysql'},
        {label: 'Collation', type: 'enum', options: null},
        {label: 'Null', type: 'enum', options: ['YES', 'NO']},
        {label: 'Key', disabled: true},
        {label: 'Default'},
        {label: 'Extra', type: 'enum', options: ['', 'auto_increment', 'on update CURRENT_TIMESTAMP']},
        {label: 'Privileges', disabled: true},
        {label: 'Comment'}
      ],
      types: [
        { value: 'tinyint', block: 'numeric' },
        { value: 'smallint', block: 'numeric' },
        { value: 'mediumint', block: 'numeric' },
        { value: 'int', block: 'numeric' },
        { value: 'bigint', block: 'numeric' },

        { value: 'decimal', block: 'decimal' },
        { value: 'float', block: 'decimal' },
        { value: 'double', block: 'decimal' },
        { value: 'real', block: 'decimal' },

        { value: 'datetime', block: 'date and time' },
        { value: 'date', block: 'date and time' },
        { value: 'timestamp', block: 'date and time' },
        { value: 'time', block: 'date and time' },
        { value: 'year', block: 'date and time' },

        { value: 'char', block: 'char' },
        { value: 'varchar', block: 'char' },

        { value: 'tinytext', block: 'text' },
        { value: 'text', block: 'text' },
        { value: 'mediumtext', block: 'text' },
        { value: 'longtext', block: 'text' },
        { value: 'binary', block: 'text' },
        { value: 'varbinary', block: 'text' },

        { value: 'tinyblob', block: 'blob' },
        { value: 'mediumblob', block: 'blob' },
        { value: 'blob', block: 'blob' },
        { value: 'longblob', block: 'blob' },

        { value: 'enum', block: 'sets' },
        { value: 'set', block: 'sets' },

        { value: 'bit', block: 'special' },
        { value: 'boolean', block: 'special' },
        { value: 'serial', block: 'special' },

        { value: 'geometry', block: 'geometry' },
        { value: 'point', block: 'geometry' },
        { value: 'linestring', block: 'geometry' },
        { value: 'polygon', block: 'geometry' },
        { value: 'multipoint', block: 'geometry' },
        { value: 'multilinestring', block: 'geometry' },
        { value: 'multipolygon', block: 'geometry' },
        { value: 'geometrycollection', block: 'geometry' }
      ],
      rowFormat: [
        { value: 'FIXED', block: 'MyISAM' },
        { value: 'DYNAMIC', block: 'MyISAM' },
        { value: 'COMPACT', block: 'InnoDB' },
        { value: 'REDUDANT', block: 'InnoDB' },
        { value: 'COMPRESSED', block: 'ARCHIVE' },
      ]
    }
  }
}
