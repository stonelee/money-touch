Ext.define('Money.view.Edit', {
  extend: 'Ext.Container',
  xtype: 'edit',

  config: {
    title: '记录',
    layout: 'fit',

    items: [{
        xtype: 'formpanel',
        items: [{
            id: 'datetime',
            tpl: [
                '<h2>',
                '<p>{datetime}</p>',
                '</h2>'
            ].join('')
          }, {
            xtype: 'fieldset',
            items: [{
                xtype: 'numberfield',
                name: 'money',
                minValue: 0,
                label: '金额'
              }, {
                xtype: 'radiofield',
                name: 'way',
                label: '帮付',
                value: 'out'
              }, {
                xtype: 'radiofield',
                name: 'way',
                label: '借帐',
                value: 'in'
              }
            ]
          }, {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                xtype: 'button',
                action: 'edit',
                text: '修改',
                handler: function() {
                  var record = this.up('formpanel').getValues();
                  if (record.way == 'in') {
                    record.money = -record.money;
                  }

                  var model = this.up('edit').record;
                  model.data.money = record.money;
                  model.save();
                }
              }, {
                xtype: 'button',
                action: 'delete',
                text: '删除',
                ui: 'confirm',
                handler: function() {
                  this.up('edit').record.erase();
                }
              }
            ]
          }
        ]
      }
    ]
  },

  setRecord: function(record) {
    this.record = record;

    var datetime = record.data.datetime;
    var data = {
      datetime: datetime
    };
    this.down('#datetime').setData(data);

    var money = record.data.money;
    this.down('formpanel [name=money]').setValue(Math.abs(money));

    var way = 'out';
    if (money < 0) {
      way = 'in';
    }
    this.down('formpanel [value=' + way + ']').check();
  }


});
