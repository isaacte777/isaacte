<?php

namespace Kappascore\Controller\Api;

class GetSportsRequest extends AbstractExternalRequest {

    public function run($body){

        $filters = [];

        $response = $this->requestOperation('sports', $filters);

        if(!$response['status']){
            throw new \Exception($response['message']);
        }

        $this->sendResponse(0, $response['message']);

    }

}