/**
 * Created by abaddon on 20.11.2017.
 */
Meeting.window.Add = function (config) {
    config = config || {};
    this.ident = config.ident || 'subscriber' + Ext.id();

    Ext.applyIf(config, {
        title: _('meeting_subscribe_create'),
        id: this.ident,
        autoHeight: true,
        width: 650,
        url: Meeting.config.connector_url,
        action: 'mgr/party/create',
        fields: [
            {
                xtype: 'hidden',
                name: 'meetingId',
                id: 'meeting-' + this.ident + '-id',
                anchor: '99%'
            },
            {
                xtype: 'textfield',
                fieldLabel: _('meeting_subscriber_fullname'),
                name: 'fullName',
                id: 'meeting-' + this.ident + '-fullName',
                anchor: '99%'
            },
            {
                xtype: 'textfield',
                fieldLabel: _('meeting_subscriber_age'),
                name: 'age',
                id: 'meeting-' + this.ident + '-age',
                anchor: '99%'
            },
            {
                xtype: 'textfield',
                fieldLabel: _('meeting_subscriber_phone'),
                name: 'phone',
                id: 'meeting-' + this.ident + '-phone',
                anchor: '99%'
            },
            {
                xtype: 'textfield',
                fieldLabel: _('meeting_subscriber_email'),
                name: 'email',
                id: 'meeting-' + this.ident + '-email',
                anchor: '99%'
            }
        ]
    });

    Meeting.window.Add.superclass.constructor.call(this, config);
};

Ext.extend(Meeting.window.Add, MODx.Window);
Ext.reg('meeting-window-add', Meeting.window.Add);