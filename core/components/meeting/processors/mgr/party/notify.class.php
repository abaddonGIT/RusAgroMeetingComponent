<?php

class NotifyProcessor extends modProcessor
{
    private $API_KEY = "AAAAGnlMkHY:APA91bFRp9jReCmbc-Mub5rhOz1nU1qgKPkX7d77doji7zPr5iliGQbUO6dAudEPesODEBU4AM0pbT9UkiZp9mQbgYilwOxBJG3AZd9qa355YTGhZ7jD4RiMQAdzPQ94pwMNgAQ0H_GH";
    private $API_URL = "https://fcm.googleapis.com/fcm/send";

    public function checkPermissions()
    {
        return true;
    }

    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return mixed
     */
    public function process()
    {
        $id = (int)$this->getProperty('meetingId');
        $body = $this->getProperty('notification');
        $topic = 'meeting_' . $id;

        if (empty($body)) {
            return $this->modx->error->failure('Сообщение не может быть пустым!');
        }

        $headers = array
        (
            'Authorization: key=' . $this->API_KEY,
            'Content-Type: application/json'
        );

        $fields = array
        (
            'to' => "/topics/" . $topic,
            'data' => array(
                'body' => $body
            )
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->API_URL);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
        $result = curl_exec($ch);
        curl_close($ch);
        try {
            $out = json_decode($result, true);
            if ($out['message_id']) {
                return $this->success();
            } else {
                return $this->modx->error->failure('Ошибка при отправке уведомлений!');
            }
        } catch (Exception $e) {
            return $this->modx->error->failure('Не был указан родитель для документа');
        }
        //$this->modx->log(1, print_r($result, 1));
//        return $this->modx->error->failure('Не был указан родитель для документа');
    }
}

return 'NotifyProcessor';