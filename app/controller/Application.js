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

  onMainPop: function(view, item) {
    if (view.xtype == "main") {
      this.getListButton().show();
    }
  },

  onListSelect: function(list, index, node, record) {
    //if (!this.showContact) {
    //this.showContact = Ext.create('AddressBook.view.contact.Show');
    //}

    //// Bind the record onto the show contact view
    //this.showContact.setRecord(record);

    //// Push the show contact view into the navigation view
    //this.getMain().push(this.showContact);
  },


  onSaveRecord: function() {}

});
