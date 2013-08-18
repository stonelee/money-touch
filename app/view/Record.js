Ext.define('Money.view.Record', {
  extend: 'Ext.Container',
  xtype: 'record',

  config: {
    title: '记录',
    layout: 'fit',

    items: [{
        xtype: 'formpanel',
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
          }
        ]
      }, {
        xtype: 'toolbar',
        docked: 'bottom',
        items: [{
            xtype: 'spacer'
          }, {
            xtype: 'button',
            text: '保存',
            handler: function() {
              var form = this.up('record').down('formpanel');

              var moneyField = form.down('[name=money]');
              var money = moneyField.getValue();
              if (money <= 0) {
                Ext.Msg.alert('提示', '金额应该为正数', function() {
                  moneyField.setValue(Math.abs(money));
                });
                return;
              }

              var record = form.getValues();
              if (record.way == 'in') {
                record.money = -record.money;
              }
              record.datetime = new Date();

              var model = Ext.create('Money.model.Item', record);
              var way = record.way == 'in' ? '借帐' : '帮付';
              model.save(function() {
                Ext.Msg.alert('提示', '[' + way + money + '元]保存成功', function() {
                  form.reset();
                });
              });
            }
          }, {
            xtype: 'spacer'
          }
        ]
      }
    ]
  }

});
