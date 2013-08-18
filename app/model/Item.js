Ext.define('Money.model.Item', {
  extend: 'Ext.data.Model',
  config: {
    identifier: {
      type: 'uuid'
    },
    fields: [{
        name: 'money',
        type: 'float'
      }, {
        name: 'datetime',
        type: 'date'
      }
    ],
    proxy: {
      type: 'localstorage',
      id: 'money-items'
    }
  }
});
