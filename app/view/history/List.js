Ext.define('Money.view.history.List', {
  extend: 'Ext.Container',
  xtype: 'history-list',

  config: {
    title: '历史',
    layout: 'fit',

    items: [{
        xtype: 'list',
        variableHeights: true,

        store: 'Batches',

        itemTpl: new Ext.XTemplate(
          '<span style="color:#999;margin-right:30px;">{[App.formatDatetime(values.datetime)]}</span>',
          '<span>¥{money}</span>')
      }
    ],
    listeners: {
      show: function() {
        this.down('list').getStore().load();
      }
    }
  }

});
