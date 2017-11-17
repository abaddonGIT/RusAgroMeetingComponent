<?php
ini_set('display_errors', 1);
ini_set('error_reporting', -1);
// Load MODX config
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
} else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH . 'index.php';
$corePath = $modx->getOption('meeting_core_path', null, $modx->getOption('core_path') . 'components/meeting/');
require_once $corePath . 'model/meeting/meeting.class.php';
$modx->meeting = new Meeting($modx);
$modx->lexicon->load('meeting:default');
/* handle request */
$path = $modx->getOption('processorsPath', $modx->meeting->config, $corePath . 'processors/');
$modx->request->handleRequest(array(
    'processors_path' => $path,
    'location' => '',
));
//if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
//    /** @noinspection PhpIncludeInspection */
//    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
//}
//else {
//    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
//}
///** @noinspection PhpIncludeInspection */
//require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
///** @noinspection PhpIncludeInspection */
//require_once MODX_CONNECTORS_PATH . 'index.php';
///** @var Meeting $Meeting */
//$Meeting = $modx->getService('meeting', 'Meeting', $modx->getOption('meeting_core_path', null,
//        $modx->getOption('core_path') . 'components/meeting/') . 'model/meeting/'
//);
//$modx->lexicon->load('meeting:default');
//
//// handle request
//$corePath = $modx->getOption('meeting_core_path', null, $modx->getOption('core_path') . 'components/meeting/');
//$path = $modx->getOption('processorsPath', $Meeting->config, $corePath . 'processors/');
//$modx->getRequest();
//
///** @var modConnectorRequest $request */
//$request = $modx->request;
//$request->handleRequest(array(
//    'processors_path' => $path,
//    'location' => '',
//));