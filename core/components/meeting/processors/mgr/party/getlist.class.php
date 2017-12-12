<?php

class PartyGetListProcessor extends modObjectGetListProcessor
{
    public $classKey = 'MeetingItem';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';


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
        $parentId = $this->getProperty('id');

        if ($query) {
            $c->where(array(
                'fullName:LIKE' => "%{$query}%",
                'OR:phone:LIKE' => "%{$query}%",
                'OR:email:LIKE' => "%{$query}%",
                'meetingId' => $parentId
            ));
        } else {
            $c->where(array(
                'meetingId' => $parentId
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
        //Удаление
        $array['actions'][] = array(
            'cls' => '',
            'icon' => 'icon icon-remove',
            'title' => $this->modx->lexicon('subscribe_item_remove'),
            'action' => 'removeItem',
            'button' => true,
            'menu' => true,
        );

        return $array;
    }
}

return 'PartyGetListProcessor';