Ext.define('Money.store.Items', {
  extend: 'Ext.data.Store',
  config: {
    model: 'Money.model.Item',
    sorters: 'datetime'
  }
});
