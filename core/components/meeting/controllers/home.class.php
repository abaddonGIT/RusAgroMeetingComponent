<?php

/**
 * The home manager controller for Meeting.
 *
 */
class MeetingHomeManagerController extends modExtraManagerController
{
    /** @var Meeting $Meeting */
    public $Meeting;


    /**
     *
     */
    public function initialize()
    {
        $path = $this->modx->getOption('meeting_core_path', null,
                $this->modx->getOption('core_path') . 'components/meeting/') . 'model/meeting/';
        $this->Meeting = $this->modx->getService('meeting', 'Meeting', $path);
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return array('meeting:default');
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('meeting');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
//        echo $this->Meeting->config['jsUrl'];
        $this->addCss($this->Meeting->config['cssUrl'] . 'mgr/main.css');
        $this->addCss($this->Meeting->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
        $this->addJavascript($this->Meeting->config['jsUrl'] . 'mgr/meeting.js');
        $this->addJavascript($this->Meeting->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->Meeting->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->addJavascript($this->Meeting->config['jsUrl'] . 'mgr/widgets/items.grid.js');
        $this->addJavascript($this->Meeting->config['jsUrl'] . 'mgr/widgets/add.window.js');
        $this->addJavascript($this->Meeting->config['jsUrl'] . 'mgr/widgets/notify.window.js');
        $this->addJavascript($this->Meeting->config['jsUrl'] . 'mgr/widgets/subscribe.window.js');
        $this->addJavascript($this->Meeting->config['jsUrl'] . 'mgr/widgets/items.windows.js');
        $this->addJavascript($this->Meeting->config['jsUrl'] . 'mgr/widgets/party.windows.js');
        $this->addJavascript($this->Meeting->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->Meeting->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('<script type="text/javascript">
        Meeting.config = ' . json_encode($this->Meeting->config) . ';
        Meeting.config.connector_url = "' . $this->Meeting->config['connectorUrl'] . '";
        Ext.onReady(function() {
            MODx.load({ xtype: "meeting-page-home"});
        });
        </script>
        ');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        return $this->Meeting->config['templatesPath'] . 'home.tpl';
    }
}