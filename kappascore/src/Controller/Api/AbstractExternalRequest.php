<?php

namespace Kappascore\Controller\Api;

use App\Kernel\Config;
use Klein\Request;

abstract class AbstractExternalRequest
{

    protected Request $request;
    protected string $partner;

    public function __construct($partner, $request)
    {
        $this->request = $request;
        $this->partner = $partner;
    }

    protected function requestOperation($operation, $filters = null){
        // Create a stream
        $opts = [
            "http" => [
                "method" => "GET"
            ]
        ];

        $context = stream_context_create($opts);

        if(!is_null($filters)){
            $filters['partner'] = $this->partner;
            $params = http_build_query($filters);
        }else{
            $params = 'partner=' . $this->partner;
        }

        $file = file_get_contents(sprintf("%s/Statistics?op=%s&%s", Config::api_partner_path(), $operation, $params), false, $context);

        return json_decode($file, true);
    }

    protected function sendResponse($code, $info) {
        die(json_encode(["resultCode"   => $code,"responseInfo" => $info]));
    }

}