<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
            $modelPath = $modx->getOption('meeting_core_path', null, $modx->getOption('core_path') . 'components/meeting/') . 'model/';
            $modx->addPackage('meeting', $modelPath);
            $manager = $modx->getManager();
            $objects = array(
                'MeetingItem'
            );
            foreach ($objects as $object) {
                $manager->createObjectContainer($object);
            }
            break;
        case xPDOTransport::ACTION_UPGRADE:

            break;

        case xPDOTransport::ACTION_UNINSTALL:
            break;
    }
}
return true;
