/**
 * Created by abaddon on 20.11.2017.
 */
Meeting.window.Notify = function (config) {
    config = config || {};
    this.ident = config.ident || 'subscriber' + Ext.id();

    Ext.applyIf(config, {
        title: _('meeting_notification_title'),
        id: this.ident,
        autoHeight: true,
        width: 650,
        url: Meeting.config.connector_url,
        action: 'mgr/party/notify',
        fields: [
            {
                xtype: 'hidden',
                name: 'meetingId',
                id: 'meeting-' + this.ident + '-id',
                anchor: '99%'
            },
            {
                xtype: 'textarea',
                editable: true,
                fieldLabel: _('meeting_item_notifications_body'),
                name: 'notification',
                id: 'meeting-' + this.ident + '-notification',
                anchor: '100%'
            }
        ]
    });

    Meeting.window.Notify.superclass.constructor.call(this, config);
};

Ext.extend(Meeting.window.Notify, MODx.Window);
Ext.reg('meeting-window-notify', Meeting.window.Notify);