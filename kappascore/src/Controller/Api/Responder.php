<?php

namespace Kappascore\Controller\Api;

use Klein\Request;

class Responder {

    public function handleRequest(Request $request, $response, $service, $app){

        header('Access-Control-Allow-Origin: *');
        header("Content-type: application/json");

        try {

            if($request->method() == 'POST') {
                $body = json_decode(file_get_contents('php://input'), true);
            }else{
                $body = $request->paramsGet()->all();
            }

            $class = sprintf("Kappascore\\Controller\\Api\\%sRequest", $body['opName']);

            if(!class_exists($class)){
                throw new \Exception(sprintf("Unvalid operation %s", $body['opName']), -1);
            }

            if (!method_exists($class, 'run')) {
                throw new \Exception("Unvalid method run()", -1);
            }

            $Operation = new $class($request->partner, $request);
            $Operation->run($body);

        }catch (\Throwable $e){

            $this->sendResponse(-1, $e->getMessage());

        }

    }

    private function sendResponse($code, $info) {
        die(json_encode(["resultCode"   => $code,"responseInfo" => $info]));
    }

}