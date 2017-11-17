<?php
$xpdo_meta_map['MeetingItem']= array (
  'package' => 'meeting',
  'version' => '1.1',
  'table' => 'meeting_items',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'fullName' => '',
    'age' => 0,
    'phone' => '',
    'email' => '',
    'meetingId' => 0,
  ),
  'fieldMeta' => 
  array (
    'fullName' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'age' => 
    array (
      'dbtype' => 'int',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0,
    ),
    'phone' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'email' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'meetingId' => 
    array (
      'dbtype' => 'int',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
  ),
  'indexes' => 
  array (
    'fullName' => 
    array (
      'alias' => 'fullName',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'fullName' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
    'meetingId' => 
    array (
      'alias' => 'meetingId',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'meetingId' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
);
