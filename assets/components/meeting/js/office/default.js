Ext.onReady(function () {
    Meeting.config.connector_url = OfficeConfig.actionUrl;

    var grid = new Meeting.panel.Home();
    grid.render('office-meeting-wrapper');

    var preloader = document.getElementById('office-preloader');
    if (preloader) {
        preloader.parentNode.removeChild(preloader);
    }
});