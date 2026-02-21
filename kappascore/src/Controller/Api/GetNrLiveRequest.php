<?php

namespace Kappascore\Controller\Api;

class GetNrLiveRequest extends AbstractExternalRequest {

    public function run($body){

        $filters = [

        ];

        $response = $this->requestOperation('count_live', $filters);

        if(!$response['status']){
            throw new \Exception($response['message']);
        }

        $this->sendResponse(0, $response['message']);

    }

}