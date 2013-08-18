Ext.define('Money.controller.Application', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      mainView: 'main',
      editView: 'edit',
      listButton: '#listButton'
    },

    control: {
      mainView: {
        push: 'onMainPush',
        pop: 'onMainPop'
      },
      listButton: {
        tap: 'onList'
      },
      'records list': {
        itemtap: 'onListSelect'
      },
      'edit button[action=edit]': {
        tap: 'onEdit'
      },
      'edit button[action=delete]': {
        tap: 'onDelete'
      }
    }
  },

  onMainPush: function(view, item) {
    if (item.xtype != 'record') {
      this.getListButton().hide();
    }
  },

  onMainPop: function(view, item, index) {
    if (index == 2) {
      this.getListButton().show();
    }
  },

  onList: function() {
    if (!this.listView) {
      this.listView = Ext.create('Money.view.List');
    }

    this.getMainView().push(this.listView);
  },

  onListSelect: function(list, index, node, record) {
    if (!this.edit) {
      this.edit = Ext.create('Money.view.Edit');
    }

    this.edit.setRecord(record);
    this.getMainView().push(this.edit);
  },


  onEdit: function() {
    var self = this;
    Ext.Msg.confirm('确认', '真的想修改吗?', function(buttonId) {
      if (buttonId == 'yes') {
        var record = self.getEditView().down('formpanel').getValues();
        if (record.way == 'in') {
          record.money = -record.money;
        }

        var model = self.getEditView().record;
        model.data.money = record.money;
        model.save(function() {
          self.getMainView().pop();
        });
      }
    });
  },

  onDelete: function() {
    var self = this;
    Ext.Msg.confirm('确认', '真的想删除吗?', function(buttonId) {
      if (buttonId == 'yes') {
        self.getEditView().record.erase(function() {
          self.getMainView().pop();
        });
      }
    });
  }

});
