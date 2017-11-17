Meeting.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'meeting-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('meeting') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('meeting_items'),
                layout: 'anchor',
                items: [{
                    html: _('meeting_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'meeting-grid-items',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    Meeting.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(Meeting.panel.Home, MODx.Panel);
Ext.reg('meeting-panel-home', Meeting.panel.Home);
