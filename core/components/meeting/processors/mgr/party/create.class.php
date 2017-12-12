<?php

class MeetingItemCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'MeetingItem';
    public $classKey = 'MeetingItem';
    public $languageTopics = array('meeting');
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $fullName = trim($this->getProperty('fullName'));
        $phone = trim($this->getProperty('phone'));
        $email = trim($this->getProperty('email'));

        if (empty($phone)) {
            $this->modx->error->addField('phone', $this->modx->lexicon('meeting_item_err_phone'));
        }

        if (empty($email)) {
            $this->modx->error->addField('email', $this->modx->lexicon('meeting_item_err_email'));
        } elseif ($this->modx->getCount($this->classKey, array('email' => $email))) {
            $this->modx->error->addField('email', $this->modx->lexicon('meeting_item_err_email_ae'));
        }

        if (empty($fullName)) {
            $this->modx->error->addField('fullName', $this->modx->lexicon('meeting_item_err_name'));
        }

        return parent::beforeSet();
    }
}

return 'MeetingItemCreateProcessor';