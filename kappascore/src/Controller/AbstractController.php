<?php

namespace Kappascore\Controller;

use App\Kernel\Config;
use App\Kernel\Controllers\BaseController;
use App\Kernel\Controllers\ControllerInterface;
use Klein\Klein;
use Klein\Request;

abstract class AbstractController extends BaseController implements ControllerInterface
{
    protected string $partner = 'kappa-score';
    protected int $brand_id = 1;
    protected string $template = '';
    protected $website = [];
    protected $sportsAvailable = [
        "soccer"            => 1,
        "ice-hockey"        => 2,
        "basketball"        => 3,
        "tennis"            => 4,
        "baseball"          => 5,
        "volleyball"        => 6,
        "rugby"             => 7,
        "handball"          => 8,
        "table-tennis"      => 10,
        "criquet"           => 66,
        "american-football" => 13,
    ];
    protected $langsAvailable = [
        "es_ES" => "es",
        "es_MX" => "mx",
        "en_US" => "us",
        "de_DE" => "de",
        "fr_FR" => "fr",
        "it_IT" => "it",
        "hi_IN" => "in",
    ];

    public function __construct($uri, Klein $router)
    {
        parent::__construct($uri, $router);
        $this->checkPartner();
    }

    protected function checkPartner(){
        $checker = $this->requestOperation('check_partner', [
            "domain" => 'kappascore.com',
        ]);

        if($checker['status']){
            $this->partner = $checker['message']['partner']['code'];
            $this->website = $checker['message'];
            if(isset($this->website['settings']) && isset($this->website['settings']['template'])){
                $this->template = $this->website['settings']['template'];
            }
        }else{
            die("Site config: ".$checker['message']);
        }
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

    public function checkLanguage(Request $request, $response, $service, $app){

        if(empty($_COOKIE['lang'])){
            $lang = $request->headers()->get('accept-language');
            $lang = explode(",", $lang);

            if(empty($lang[0]) || !empty($lang[0]) && empty($this->langsAvailable[$lang[0]])){
                $lang_int = 'en_US';
                $lang = $this->langsAvailable['en_US'];
            }else{
                $lang_int = $lang[0];
                $lang = $this->langsAvailable[$lang[0]];
            }
        }else{
            if(empty($this->langsAvailable[$_COOKIE['lang']])){
                $lang_int = 'en_US';
                $lang = $this->langsAvailable['en_US'];
            }else{
                $lang_int = $_COOKIE['lang'];
                $lang = $this->langsAvailable[$_COOKIE['lang']];
            }
        }

        // set cookie for 30 days
        setcookie("lang", $lang_int, (time()+3600*24*30));

        // redirect
        header(sprintf('Location: %s', $this->relativeRoute($lang)), true, 301);
        exit;
    }

    protected function defaultTwigParams(array $extra = []) {
        $uri   = $_SERVER['REQUEST_URI'];
        $parts = parse_url($uri);
        $path  = $parts['path'] ?? '/';
        $query = isset($parts['query']) ? '?'.$parts['query'] : '';

        $pattern = '#^/(es|en|de|fr|it|us|mx|in)(?=/|$)#i';
        
        $currentLang = 'es';
        if (preg_match($pattern, $path, $matches)) {
            $currentLang = $matches[1];
        }

        // Helper to check if a menu item is active
        $isActiveMenu = function($menuPath) use ($path, $pattern) {
            $cleanPath = preg_replace($pattern, '', $path);
            if ($cleanPath === '') $cleanPath = '/';
            
            if ($menuPath === '/') {
                return $cleanPath === '/';
            }
            return strpos($cleanPath, $menuPath) === 0;
        };

        $alternate_locales = array_map(function($l) use ($path, $pattern, $query) {
            if (preg_match($pattern, $path)) {
                $newPath = preg_replace($pattern, '/'.$l, $path, 1);
            } else {
                $newPath = '/'.$l . ($path === '/' ? '' : $path);
            }
            return ['code' => strtolower($l), 'url' => $newPath . $query];
        }, $this->langsAvailable);

        $canonical = $_SERVER['REQUEST_URI'];

        return [
            'lang' => $currentLang,
            'isActiveMenu' => $isActiveMenu,
            'alternate_locales' => $alternate_locales,
            'canonical_url' => $canonical,
            'x_default_url' => 'https://kappascore.com/',
            'og_image' => '',
            'indexable' => true,
            'robots_follow' => true,
            ...$extra
        ];
    }

}
