<?php

class MeetingItemGetListProcessor extends modObjectGetListProcessor
{
    public $classKey = 'Ticket';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    //public $permission = 'list';


    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where(array(
                'pagetitle:LIKE' => "%{$query}%",
                'OR:introtext:LIKE' => "%{$query}%",
                'parent' => 167
            ));
        } else {
            $c->where(array(
                'parent' => 167
            ));
        }
        return $c;
    }


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = parent::prepareRow($object);
        $array['actions'] = array();

        // Открыть мероприятие
        $array['actions'][] = array(
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('subscribe_item_open'),
            'action' => 'showItem',
            'button' => true,
            'menu' => true,
        );

        $array['actions'][] = array(
            'cls' => '',
            'icon' => 'icon icon-remove',
            'title' => $this->modx->lexicon('meeting_item_delete'),
            'action' => 'removeItem',
            'button' => true,
            'menu' => true,
        );

        return $array;
    }
}

return 'MeetingItemGetListProcessor';