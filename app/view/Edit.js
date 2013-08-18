Ext.define('Money.view.Edit', {
  extend: 'Ext.Container',
  xtype: 'edit',

  config: {
    title: '记录',
    layout: 'fit',

    items: [{
        id: 'datetime',
        docked: 'top',
        tpl: [
            '<h2>',
            '<p>{datetime}</p>',
            '</h2>'
        ].join('')
      }, {
        xtype: 'formpanel',
        items: [{
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
          }
        ]
      }, {
        xtype: 'toolbar',
        docked: 'bottom',
        items: [{
            xtype: 'spacer'
          }, {
            xtype: 'button',
            action: 'edit',
            text: '修改'
          }, {
            xtype: 'button',
            action: 'delete',
            text: '删除',
            ui: 'confirm'
          }, {
            xtype: 'spacer'
          }
        ]
      }
    ]
  },

  setRecord: function(record) {
    this.record = record;

    var datetime = record.data.datetime;
    var sDatetime = Ext.Date.format(datetime, 'Y-m-d H:i:s');

    var weeks = ['日', '一', '二', '三', '四', '五', '六'];
    sDatetime += ' 星期' + weeks[datetime.getDay()];

    var data = {
      datetime: sDatetime
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
