var Meeting = function (config) {
    config = config || {};
    Meeting.superclass.constructor.call(this, config);
};
Ext.extend(Meeting, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('meeting', Meeting);

Meeting = new Meeting();