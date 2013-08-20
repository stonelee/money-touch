Ext.define('Money.store.Batches', {
  extend: 'Ext.data.Store',
  config: {
    model: 'Money.model.Batch',
    sorters: [{
        property: 'datetime',
        direction: 'DESC'
      }
    ]
  }
});
