Ext.define('Money.model.Item', {
  extend: 'Ext.data.Model',
  config: {
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
