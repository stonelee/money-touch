Ext.define('Money.view.Main', {
  extend: 'Ext.navigation.View',
  xtype: 'main',
  requires: [
      'Money.view.Record'
  ],
  config: {
    autoDestroy: false,

    navigationBar: {
      ui: 'sencha',
      items: [{
          xtype: 'button',
          id: 'listButton',
          text: '明细',
          align: 'right'
        }
      ]
    },

    items: [{
        xtype: 'record'
      }
    ]
  }
});
