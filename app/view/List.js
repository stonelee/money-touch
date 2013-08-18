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
            '<p>总计:{number}</p>',
            '</h2>'
        ].join('')
      }, {
        xtype: 'list',
        variableHeights: true,

        store: 'Items',

        itemTpl: new Ext.XTemplate(
          '<div class="title">{[this.formatDate(values.datetime)]}</div>',
          '<span>{money}</span>', {
          formatDate: function(datetime) {
            var sDatetime = Ext.Date.format(datetime, 'Y-m-d H:i:s');
            var weeks = ['日', '一', '二', '三', '四', '五', '六'];
            sDatetime += ' 星期' + weeks[datetime.getDay()];
            return sDatetime;
          }
        })
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

          self.down('#total').setData({
            number: money
          });
        });
      }
    }
  }
});
