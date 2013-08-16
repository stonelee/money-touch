Ext.define('Money.view.List', {
  extend: 'Ext.List',
  xtype: 'list',

  config: {
    title: '明细',

    store: 'Items',
    itemTpl: [
        '<div class="title">{datetime}</div>',
        '<span>{money}</span>'
    ].join(''),

    listeners: {
      show: function() {
        this.getStore().load();
      }
    }
  }
});
