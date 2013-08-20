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
            padding: '0 30',
            ui: 'confirm',
            text: '修改'
          }, {
            xtype: 'button',
            action: 'delete',
            margin: '0 0 0 50',
            padding: '0 30',
            text: '删除',
            ui: 'decline'
          }, {
            xtype: 'spacer'
          }
        ]
      }
    ]
  },

  hideKeyboard: function() {
    var moneyField = this.down('[name=money]');
    moneyField.blur();
  },

  setRecord: function(record) {
    //页面对应的数据
    this.record = record;

    var datetime = record.data.datetime;
    var data = {
      datetime: App.formatDatetime(datetime)
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
