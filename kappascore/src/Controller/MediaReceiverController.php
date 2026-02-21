<?php

namespace Kappascore\Controller;

use App\Kernel\Controllers\BaseController;
use App\Kernel\Controllers\ControllerInterface;
use App\Kernel\Utils\Encoding;
use Klein\Request;
use Klein\Response;
use Throwable;

class MediaReceiverController extends BaseController implements ControllerInterface
{

    public function run(): void
    {
        set_exception_handler(function (Throwable $e) {
            error_log("ERROR: " . $e->getMessage() . " " . $e->getFile() . ":" . $e->getLine());
            $w = 100;
            $h = 100;
            $im = imagecreatetruecolor($w, $h);

            imagesavealpha($im, true);
            $transparent = imagecolorallocatealpha($im, 0, 0, 0, 127); // alpha 127 = totalmente transparente
            imagefill($im, 0, 0, $transparent);

            header('Content-Type: image/png');
            imagepng($im);

            imagedestroy($im);
        });

        $this->respond("get", $this->relativeRoute('/[:img].png'), function(Request $request, Response $response){

            if(is_null($request->img)){
                throw new \Exception('Invalid url');
            }

            $decode = Encoding::decodeString($request->img);
            $content = file_get_contents($decode);

            if(str_contains($http_response_header[0], "404 Not Found")){
                throw new \Exception('Invalid image');
            }

            error_log(json_encode($http_response_header));

            header ('Content-Type: image/png');
            die($content);

        });

    }
}