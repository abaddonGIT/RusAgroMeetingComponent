<?php

class MeetingItemUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'modResource';
    public $classKey = 'modResource';
    public $languageTopics = array('meeting');
    //public $permission = 'save';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $id = (int)$this->getProperty('id');
        if (empty($id)) {
            return $this->modx->lexicon('meeting_item_err_ns');
        }

        $published = $this->getProperty('published');

        if ($published == "Да") {
            $this->setProperty('published', true);
        } else {
            $this->setProperty('published', false);
        }
        return parent::beforeSet();
    }
}

return 'MeetingItemUpdateProcessor';
