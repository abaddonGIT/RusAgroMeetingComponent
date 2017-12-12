Meeting.grid.Items = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'meeting-grid-items';
    }
    Ext.applyIf(config, {
        url: Meeting.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/item/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.showItem(grid, e, row);
            }
        },
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0,
            // getRowClass: function (rec) {
            //     return !rec.data.active
            //         ? 'meeting-grid-row-disabled'
            //         : '';
            // }
        },
        paging: true,
        remoteSort: true,
        autoHeight: true,
    });
    Meeting.grid.Items.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
//Выпадающее меню
Ext.extend(Meeting.grid.Items, MODx.grid.Grid, {
    windows: {},

    /**
     * Вызов контекстного меню
     * @param grid
     * @param rowIndex
     */
    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);

        var menu = Meeting.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },

    createItem: function (btn, e) {
        var w = MODx.load({
            xtype: 'meeting-item-window-create',
            id: Ext.id(),
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({active: true});
        w.show(e.target);
    },

    /**
     * Открытие просмотра подписчиков для мероприятия
     * @param btn
     * @param e
     * @param row
     * @returns {boolean}
     */
    showItem: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/item/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'meeting-window-party',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },

    removeItem: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('meeting_items_remove')
                : _('meeting_item_remove'),
            text: ids.length > 1
                ? _('meeting_items_remove_confirm')
                : _('meeting_item_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/item/remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },

    /**
     * Поля, который принимаются от контроллера
     * @returns {[string,string,string,string]}
     */
    getFields: function () {
        return ['id', 'pagetitle', 'introtext', 'actions'];
    },

    /**
     * Столбцы
     * @returns {[*,*,*,*]}
     */
    getColumns: function () {
        return [{
            header: _('meeting_item_id'),
            dataIndex: 'id',
            sortable: true,
            width: 70
        }, {
            header: _('meeting_item_name'),
            dataIndex: 'pagetitle',
            sortable: true,
            width: 200,
            renderer: function (value, metaData, record) {
                return Meeting.utils.ticketLink(value, record['data']['id'])
            }
        }, {
            header: _('meeting_item_description'),
            dataIndex: 'introtext',
            sortable: false,
            width: 250,
        }, {
            header: '',
            dataIndex: 'actions',
            width: 50,
            renderer: Meeting.utils.renderActions,
            id: 'actions'
        }];
    },

    /**
     * Действия с таблицей
     * @returns {[*]}
     */
    getTopBar: function () {
        return [{
            xtype: 'meeting-field-search',
            width: 250,
            listeners: {
                search: {
                    fn: function (field) {
                        this._doSearch(field);
                    }, scope: this
                },
                clear: {
                    fn: function (field) {
                        field.setValue('');
                        this._clearSearch();
                    }, scope: this
                },
            }
        }];
    },

    onClick: function (e) {
        var elem = e.getTarget();
        if (elem.nodeName == 'BUTTON') {
            var row = this.getSelectionModel().getSelected();
            if (typeof(row) != 'undefined') {
                var action = elem.getAttribute('action');
                if (action == 'showMenu') {
                    var ri = this.getStore().find('id', row.id);
                    return this._showMenu(this, ri, e);
                }
                else if (typeof this[action] === 'function') {
                    this.menu.record = row.data;
                    return this[action](this, e);
                }
            }
        }
        return this.processEvent('click', e);
    },

    /**
     * Получение идентификатора строки
     * @returns {Array}
     * @private
     */
    _getSelectedIds: function () {
        var ids = [];
        var selected = this.getSelectionModel().getSelections();

        for (var i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }

        return ids;
    },

    /**
     * Поиск по таблице мероприятий
     * @param tf
     * @private
     */
    _doSearch: function (tf) {
        this.getStore().baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    },

    /**
     * Очистка поиска
     * @private
     */
    _clearSearch: function () {
        this.getStore().baseParams.query = '';
        this.getBottomToolbar().changePage(1);
    }
});
Ext.reg('meeting-grid-items', Meeting.grid.Items);


Meeting.grid.Subscribers = function (config) {
    config = config || {};
    this.sm = new Ext.grid.CheckboxSelectionModel();

    Ext.applyIf(config, {
        id: 'meeting-grid-subscribers'
        , url: Meeting.config.connector_url
        , baseParams: {
            action: 'mgr/party/getlist',
            id: config.record.id
        }
        , fields: ['id', 'fullName', 'age', 'phone', 'email', 'actions']
        , autoHeight: true
        , paging: true
        , remoteSort: true
        , sm: this.sm
        , columns: [
            {header: _('meeting_subscriber_id'), sortable: true, dataIndex: 'id', width: 50}
            , {header: _('meeting_subscriber_fullname'), sortable: true, dataIndex: 'fullName', width: 100}
            , {header: _('meeting_subscriber_age'), sortable: true, dataIndex: 'age', width: 100}
            , {header: _('meeting_subscriber_phone'), sortable: true, dataIndex: 'phone', width: 100}
            , {header: _('meeting_subscriber_email'), sortable: true, dataIndex: 'email', width: 100}
            , {header: '', dataIndex: 'actions', width: 50, renderer: Meeting.utils.renderActions, id: 'actions'}
        ]
        , tbar: [{
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('meeting_subscribe_create'),
            handler: this.createItem,
            scope: this
        }, '->', {
            xtype: 'meeting-field-search',
            width: 250,
            listeners: {
                search: {
                    fn: function (field) {
                        this._doSearch(field);
                    }, scope: this
                },
                clear: {
                    fn: function (field) {
                        field.setValue('');
                        this._clearSearch();
                    }, scope: this
                },
            }
        }]
    });
    Meeting.grid.Subscribers.superclass.constructor.call(this, config);
};
Ext.extend(Meeting.grid.Subscribers, MODx.grid.Grid, {

    /**
     * Поиск по таблице мероприятий
     * @param tf
     * @private
     */
    _doSearch: function (tf) {
        this.getStore().baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    },

    /**
     * Очистка поиска
     * @private
     */
    _clearSearch: function () {
        this.getStore().baseParams.query = '';
        this.getBottomToolbar().changePage(1);
    },

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);

        var menu = Meeting.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },
    onClick: function (e) {
        var elem = e.getTarget();
        if (elem.nodeName == 'BUTTON') {
            var row = this.getSelectionModel().getSelected();
            if (typeof(row) != 'undefined') {
                var type = elem.getAttribute('action');
                if (type == 'menu') {
                    var ri = this.getStore().find('id', row.id);
                    return this._showMenu(this, ri, e);
                }
                else {
                    this.menu.record = row.data;
                    return this[type](this, e);
                }
            }
        }
        return this.processEvent('click', e);
    },
    createItem: function (btn, e, row) {
        console.log(this);
        var w = MODx.load({
            xtype: 'meeting-window-add',
            record: this.record,
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({'meetingId': this.record.id});
        w.show(e.target);
    },
    /**
     * Открытие окна редактирования подписчика
     * @param btn
     * @param e
     * @param row
     * @returns {boolean}
     */
    showItem: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/party/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'meeting-window-subscriber',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },
    removeItem: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('meeting_subscribes_remove')
                : _('meeting_subscribe_remove'),
            text: ids.length > 1
                ? _('meeting_subscribes_remove_confirm')
                : _('meeting_subscribe_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/party/remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    }

    // ,addSubscriber: function(combo, user, e) {
    //     combo.reset();
    //     Sendex.utils.onAjax(this.getEl());
    //
    //     MODx.Ajax.request({
    //         url: Sendex.config.connector_url
    //         ,params: {
    //             action: 'mgr/newsletter/subscriber/create'
    //             ,user_id: user.id
    //             ,newsletter_id: this.config.record.id
    //         }
    //         ,listeners: {
    //             success: {fn:function(r) {this.refresh();},scope:this}
    //         }
    //     });
    // }
    //
    // ,addSubscribers: function(combo, group, e) {
    //     combo.reset();
    //     Sendex.utils.onAjax(this.getEl());
    //
    //     MODx.Ajax.request({
    //         url: Sendex.config.connector_url
    //         ,params: {
    //             action: 'mgr/newsletter/subscriber/add_group'
    //             ,group_id: group.id
    //             ,newsletter_id: this.config.record.id
    //         }
    //         ,listeners: {
    //             success: {fn:function(r) {this.refresh();},scope:this}
    //         }
    //     });
    // }
    //
    // ,removeSubscriber:function(btn,e) {
    //     var ids = this._getSelectedIds();
    //     if (!ids) {return;}
    //     Sendex.utils.onAjax(this.getEl());
    //
    //     MODx.msg.confirm({
    //         title: _('sendex_subscribers_remove')
    //         ,text: _('sendex_subscribers_remove_confirm')
    //         ,url: Sendex.config.connector_url
    //         ,params: {
    //             action: 'mgr/newsletter/subscriber/remove'
    //             ,ids: ids.join(',')
    //         }
    //         ,listeners: {
    //             success: {fn:function(r) {this.refresh();},scope:this}
    //         }
    //     });
    // }

    , _getSelectedIds: function () {
        var ids = [];
        var selected = this.getSelectionModel().getSelections();

        for (var i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }

        return ids;
    }

});
Ext.reg('meeting-grid-subscribers', Meeting.grid.Subscribers);