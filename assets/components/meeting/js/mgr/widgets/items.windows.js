Meeting.window.CreateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'meeting-item-window-create';
    }
    Ext.applyIf(config, {
        title: _('meeting_item_create'),
        width: 550,
        autoHeight: true,
        url: Meeting.config.connector_url,
        action: 'mgr/item/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    Meeting.window.CreateItem.superclass.constructor.call(this, config);
};
Ext.extend(Meeting.window.CreateItem, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('meeting_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: _('meeting_item_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%'
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('meeting_item_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('meeting-item-window-create', Meeting.window.CreateItem);


Meeting.window.UpdateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'meeting-item-window-update';
    }
    Ext.applyIf(config, {
        title: _('meeting_item_update'),
        width: 550,
        autoHeight: true,
        url: Meeting.config.connector_url,
        action: 'mgr/item/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    Meeting.window.UpdateItem.superclass.constructor.call(this, config);
};
Ext.extend(Meeting.window.UpdateItem, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('meeting_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: _('meeting_item_description'),
            name: 'description',
            id: config.id + '-description',
            anchor: '99%',
            height: 150,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('meeting_item_active'),
            name: 'active',
            id: config.id + '-active',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('meeting-item-window-update', Meeting.window.UpdateItem);