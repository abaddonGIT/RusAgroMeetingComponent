/**
 * Created by abaddon on 19.11.2017.
 */
Meeting.window.Party = function (config) {
    config = config || {};
    this.ident = config.ident || 'party' + Ext.id();
    console.log(config);
    Ext.applyIf(config, {
        title: _('meeting_party_list')
        , id: this.ident
        , autoHeight: true
        , width: 850
        , url: Meeting.config.connector_url
        , action: 'mgr/item/update'
        , fields: {
            xtype: 'modx-tabs'
            , stateful: true
            , stateId: 'meeting-window-party'
            , stateEvents: ['tabchange']
            , getState: function () {
                return {activeTab: this.items.indexOf(this.getActiveTab())};
            }
            , deferredRender: false
            , border: true
            , items: [
                {
                    title: _('meeting_item_label')
                    , hideMode: 'offsets'
                    , layout: 'form'
                    , border: true
                    , cls: MODx.modx23 ? '' : 'main-wrapper'
                    , items: [
                    {
                        xtype: 'hidden',
                        name: 'id',
                        id: 'meeting-' + this.ident + '-id'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: _('meeting_item_name'),
                        name: 'pagetitle',
                        id: 'meeting-' + this.ident + '-pagetitle',
                        anchor: '100%'
                    },
                    {
                        layout: 'column',
                        border: false,
                        anchor: '100%',
                        items: [{
                            columnWidth: .5,
                            layout: 'form',
                            defaults: {msgTarget: 'under'},
                            border: false,
                            items: [
                                {
                                    xtype: 'modx-combo-template',
                                    editable: true,
                                    fieldLabel: _('meeting_item_template'),
                                    name: 'template',
                                    id: 'meeting-' + this.ident + '-template',
                                    anchor: '100%'
                                }
                            ]
                        }, {
                            columnWidth: .5,
                            layout: 'form',
                            defaults: {msgTarget: 'under'},
                            border: false,
                            items: [
                                {
                                    xtype: 'combo-boolean',
                                    editable: true,
                                    fieldLabel: _('meeting_item_published'),
                                    name: 'published',
                                    id: 'meeting-' + this.ident + '-published',
                                    anchor: '100%'
                                }
                            ]
                        }]
                    },
                    {
                        xtype: 'textarea',
                        editable: true,
                        fieldLabel: _('meeting_item_description'),
                        name: 'introtext',
                        id: 'meeting-' + this.ident + '-introtext',
                        anchor: '100%'
                    },
                    {
                        xtype: 'textarea',
                        fieldLabel: _('meeting_item_content'),
                        name: 'content',
                        id: 'meeting-' + this.ident + '-content',
                        height: 150,
                        anchor: '100%'
                    }
                ]
                },
                {
                    title: _('meeting_subscribers')
                    , xtype: 'meeting-grid-subscribers'
                    , layout: 'anchor'
                    , cls: MODx.modx23 ? '' : 'main-wrapper'
                    , record: config.record.object
                    , pageSize: 5
                }
            ]
        }
        , keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }],
        // buttons: [{
        //     text: _('close'),
        //     id: 'window-close-btn',
        //     handler: function () {
        //         this.hide();
        //     },
        //     scope: this
        // }]
    });
    Meeting.window.Party.superclass.constructor.call(this, config);
};
Ext.extend(Meeting.window.Party, MODx.Window);
Ext.reg('meeting-window-party', Meeting.window.Party);