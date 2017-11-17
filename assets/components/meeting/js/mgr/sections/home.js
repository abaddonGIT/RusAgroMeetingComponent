Meeting.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'meeting-panel-home',
            renderTo: 'meeting-panel-home-div'
        }]
    });
    Meeting.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(Meeting.page.Home, MODx.Component);
Ext.reg('meeting-page-home', Meeting.page.Home);