Ext.define('Money.controller.Application', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      main: 'main',
      listButton: '#listButton'
    },

    control: {
      main: {
        push: 'onMainPush',
        pop: 'onMainPop'
      },
      listButton: {
        tap: 'onList'
      },
      'record button': {
        tap: 'onSaveRecord'
      },
      'list': {
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

  onList: function() {
    if (!this.list) {
      this.list = Ext.create('Money.view.List');
    }

    this.getMain().push(this.list);
  },

  onMainPush: function(view, item) {
    if (item.xtype != "record") {
      this.getListButton().hide();
    }
  },

  onMainPop: function(view, item, index) {
    if (index == 2) {
      this.getListButton().show();
    }
  },

  onListSelect: function(list, index, node, record) {
    if (!this.edit) {
      this.edit = Ext.create('Money.view.Edit');
    }

    this.edit.setRecord(record);
    this.getMain().push(this.edit);
  },


  onEdit: function() {
    this.getMain().pop();
  },
  onDelete: function() {
    this.getMain().pop();
  },

  onSaveRecord: function() {}

});
