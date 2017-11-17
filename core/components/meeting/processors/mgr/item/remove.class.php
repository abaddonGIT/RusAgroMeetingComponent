<?php

class MeetingItemRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'MeetingItem';
    public $classKey = 'MeetingItem';
    public $languageTopics = array('meeting');
    //public $permission = 'remove';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('meeting_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var MeetingItem $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('meeting_item_err_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'MeetingItemRemoveProcessor';