<?php

namespace Kappascore\Controller\Api;

class GetLastResultsRequest extends AbstractExternalRequest {

    public function run($body){

        $filters = [];

        $response = $this->requestOperation('last_results', $filters);

        if(!$response['status']){
            throw new \Exception($response['message']);
        }

        $this->sendResponse(0, $response['message']);

    }

}