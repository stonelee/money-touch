Ext.define('Money.model.Batch', {
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
      type: 'rest',
      url: 'http://10.10.22.84:3000/batches'
    }
  }
});
