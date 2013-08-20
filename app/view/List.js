Ext.define('Money.view.List', {
  extend: 'Ext.Container',
  xtype: 'records',

  config: {
    title: '明细',
    layout: 'fit',

    items: [{
        id: 'total',
        docked: 'top',
        tpl: [
            '<h2>',
            '<span class="label">总计:</span>',
            '<strong>',
            '<em class="rmb">¥</em>',
            '<em class="number">{number}</em>',
            '</strong>',
            '</h2>'
        ].join('')
      }, {
        xtype: 'list',
        variableHeights: true,

        store: 'Items',

        itemTpl: new Ext.XTemplate(
          '<div>{[App.formatDatetime(values.datetime)]}</div>',
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
      }, {
        xtype: 'toolbar',
        docked: 'bottom',
        items: [{
            xtype: 'button',
            action: 'batch',
            padding: '0 30',
            ui: 'confirm',
            text: '归档',
            handler: function() {
              var self = this;
              Ext.Msg.confirm('确认', '真的想归档吗?', function(buttonId) {
                if (buttonId == 'yes') {
                  var view = self.up('records');
                  view.batch();
                  view.clearList();
                }
              });
            }
          }, {
            xtype: 'spacer'
          }, {
            xtype: 'button',
            action: 'history',
            padding: '0 30',
            text: '查看历史'
          }
        ]
      }
    ],
    listeners: {
      show: function() {
        var self = this;

        var money = 0;
        this.down('list').getStore().load(function(records) {
          Ext.each(records, function(record) {
            money += record.data.money;
          });

          //保留两位小数
          money = Math.round(money * 100) / 100;
          self.down('#total').setData({
            number: money
          });

          //金额总计
          self.totalMoney = money;
        });
      }
    }
  },

  batch: function() {
    var data = {};
    data.total = this.totalMoney;

    this.down('list').getStore().load(function(records) {
      data.records = [];
      Ext.each(records, function(record) {
        //Ext.Ajax实现貌似有问题,会将object转化为[object Object]
        data.records.push(JSON.stringify(record.data));
      });

      Ext.Ajax.request({
        url: 'http://10.10.22.84:3000/batch',
        //CORS
        useDefaultXhrHeader: false,
        params: data,
        callback: function(options, success, response) {
          console.log(response.responseText);
        }
      });
    });
  },

  clearList: function() {
    var store = this.down('list').getStore();
    store.removeAll();
    store.sync();

    this.down('#total').setData({
      number: 0
    });
  }

});
