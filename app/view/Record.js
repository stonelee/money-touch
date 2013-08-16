Ext.define('Money.view.Record', {
  extend: 'Ext.Container',
  xtype: 'record',

  config: {
    title: '记录',
    layout: 'fit',

    items: [{
        xtype: 'formpanel',
        scrollable: false,
        items: [{
            xtype: 'fieldset',
            items: [{
                xtype: 'numberfield',
                name: 'money',
                label: '金额'
              }, {
                xtype: 'radiofield',
                name: 'way',
                label: '帮付',
                value: 'out',
                checked: true
              }, {
                xtype: 'radiofield',
                name: 'way',
                label: '借帐',
                value: 'in'
              }
            ]
          }, {
            xtype: 'button',
            text: '保存',
            handler: function() {
              //TODO: 验证,money只能输入正数
              var record = this.up('formpanel').getValues();
              if (record.way == 'in') {
                record.money = -record.money;
              }
              record.datetime = new Date();

              //var model = Ext.create('Money.model.Item', record);
              //model.save();

              var store = Ext.create('Money.store.Items');
              store.add(record);
              store.sync();
            }
          }
        ]
      }
    ]
  }

});
