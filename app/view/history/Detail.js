Ext.define('Money.view.history.Detail', {
  extend: 'Ext.Container',
  xtype: 'history-detail',

  config: {
    title: '历史明细',
    layout: 'fit',

    items: [{
        id: 'history-total',
        docked: 'top',
        tpl: [
            '<h2>',
            '<span class="label">{datetime}</span>',
            '<strong>',
            '<em class="rmb">¥</em>',
            '<em class="number">{money}</em>',
            '</strong>',
            '</h2>'
        ].join('')
      }, {
        xtype: 'list',
        variableHeights: true,

        store: 'Batches',

        itemTpl: new Ext.XTemplate(
          '<div class="title">{[App.formatDatetime(values.datetime)]}</div>',
          '<p>[{[this.way(values.money)]}]',
          '<span style="margin-left:10px;">¥{[Math.abs(values.money)]}</span>',
          '</p>', {
          way: function(money) {
            if (money < 0) {
              return '<span style="color:red;">借帐</span>';
            } else {
              return '<span style="color:green;">帮付</span>';
            }
          }
        })
      }
    ]
  },

  setRecord: function(record) {
    var data = record.data;
    this.down('#history-total').setData({
      datetime: App.formatDatetime(data.datetime),
      money: data.money
    });

    var self = this;
    Ext.Ajax.request({
      url: 'http://10.10.22.84:3000/batches/' + data.id,
      useDefaultXhrHeader: false,
      callback: function(options, success, response) {
        var data = JSON.parse(response.responseText);
        self.down('list').getStore().setData(data);
      }
    });

  }
});
