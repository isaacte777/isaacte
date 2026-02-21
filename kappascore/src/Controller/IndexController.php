<?php

namespace Kappascore\Controller;

use App\Kernel\Config;
use App\Kernel\Controllers\BaseController;
use Klein\Request;
use Kappascore\Controller\Api\Responder as ApiResponder;
use Propel\PageQuery;

class IndexController extends AbstractController
{

    public function run(): void
    {

        $this->respond("get", $this->relativeRoute(), [$this, "checkLanguage"]);

        $this->respond("get", $this->relativeRoute('[:lang]/live-score'), [$this, "loadLivepage"]);
        $this->respond("get", $this->relativeRoute('[:lang]/live-score/[:sport]'), [$this, "loadLivepage"]);

        $this->respond("get", $this->relativeRoute('[:lang]/event/[:event_id]'), [$this, "loadEventpage"]);
        $this->respond("get", $this->relativeRoute('[:lang]/event/[:event_id]/[:page]'), [$this, "loadEventpage"]);

        $this->respond("get", $this->relativeRoute('[:lang]/sport/[:sport_id]'), [$this, "loadCategorypage"]);
        $this->respond("get", $this->relativeRoute('[:lang]/sport/[:sport_id]/[:category_id]'), [$this, "loadTournamentpage"]);

        $this->respond("get", $this->relativeRoute('[:lang]/statistics'), function ($request, $response, $service, $app) {

            $sports = $this->requestOperation('sports', []);

            $sport_menu = [];
            if($sports['status']){

                $sports_list = $sports['message'];

                $favs = $this->requestOperation('favorite_tournaments', []);

                $favorite_tournaments = [];
                if($favs['status']){
                    $favorite_tournaments = $favs['message'];
                }

                foreach($sports_list as $sport){
                    foreach($favorite_tournaments as $favorite_tournament){

                        if(empty($sport_menu[$sport['_id']])){
                            $sport_menu[$sport['_id']] = [
                                "name"          => $sport['name'],
                                "id"            => $sport['oxb_id'],
                                "_id"           => $sport['_id'],
                                "tournaments"   => []
                            ];
                        }

                        if($sport['_id'] === $favorite_tournament['category']['sport_id']){
                            $sport_menu[$sport['_id']]['tournaments'][] = $favorite_tournament;
                        }
                    }
                }
            }

            die($app->twig->render($this->template . '/pages/statistics.html.twig', [
                ...$this->defaultTwigParams(),
                "langs"         => $this->langsAvailable,
                'sport_menu'    => $sport_menu,
                'sports'        => $sports_list,
                'settings'      => $this->website,
                'template'      => $this->template,
                'partner'       => $this->partner,
                'lang'          => $request->lang
            ]));
        });

        $this->respond("get", $this->relativeRoute('[:lang]/tournament/[:tournament_id]'), function ($request, $response, $service, $app) {

            $tournament = $this->requestOperation('tournament_details', [
                'id'    => $request->tournament_id
            ]);

            if(!$tournament['status']){
                die('Tournament not found.');
            }

            $sports = $this->requestOperation('sports', []);

            $sport_menu = [];
            if($sports['status']){

                $sports_list = $sports['message'];

                $favs = $this->requestOperation('favorite_tournaments', []);

                $favorite_tournaments = [];
                if($favs['status']){
                    $favorite_tournaments = $favs['message'];
                }

                foreach($sports_list as $sport){
                    foreach($favorite_tournaments as $favorite_tournament){

                        if(empty($sport_menu[$sport['_id']])){
                            $sport_menu[$sport['_id']] = [
                                "name"          => $sport['name'],
                                "id"            => $sport['oxb_id'],
                                "_id"           => $sport['_id'],
                                "tournaments"   => []
                            ];
                        }

                        if($sport['_id'] === $favorite_tournament['category']['sport_id']){
                            $sport_menu[$sport['_id']]['tournaments'][] = $favorite_tournament;
                        }
                    }
                }
            }

            die($app->twig->render($this->template . '/pages/tournament.html.twig', [
                ...$this->defaultTwigParams(),
                "langs"         => $this->langsAvailable,
                'sport_menu'    => $sport_menu,
                'settings'      => $this->website,
                'template'      => $this->template,
                'tournament'    => $tournament['message'],
                'partner'       => $this->partner,
                'lang'          => $request->lang
            ]));
        });

        $this->respond("get", $this->relativeRoute('sitemap'), function ($request, $response, $service, $app) {
            die('sitemap');
        });
        $this->respond(['get', 'post'], $this->relativeRoute('api/[:partner]'), function ($request, $response, $service, $app) {
            $responder = new ApiResponder();
            $responder->handleRequest($request, $response, $service, $app);
        });

        // Homepage
        $this->respond("get", $this->relativeRoute('[:lang]'), [$this, "loadHomepage"]);
        $this->respond("get", $this->relativeRoute('[:lang]/[:sport]'), [$this, "loadHomepage"]);

        // Dynamic content
        $this->respond("get", $this->relativeRoute('[:lang]/page/[:slug]'), [$this, "dynamicPage"]);

    }

    public function dynamicPage(Request $request, $response, $service, $app){

        $page = PageQuery::create()->filterByBrandfk($this->brand_id)->findOneBySlug($request->slug);

        if(is_null($page)){
            die($app->twig->render($this->template . '/pages/errors/404.html.twig', [
                ...$this->defaultTwigParams(),
                "langs"             => $this->langsAvailable,
                'settings'          => $this->website,
                'template'          => $this->template,
                'partner'           => $this->partner,
                'lang'              => $request->lang
            ]));
        }

        die($app->twig->render($this->template . '/pages/dynamic/page.html.twig', [
            ...$this->defaultTwigParams(),
            "langs"             => $this->langsAvailable,
            'settings'          => $this->website,
            'template'          => $this->template,
            'partner'           => $this->partner,
            'lang'              => $request->lang,
            'page'              => [
                'title'         => $page->getTitle(),
                'slug'          => $page->getSlug(),
                'content'       => $page->getContent()
            ]
        ]));
    }

    public function loadHomepage(Request $request, $response, $service, $app){

        $page_title = null;
        $date_selected = $request->paramsGet()->get('date');
        if(is_null($date_selected)) $date_selected = date('m-d-Y');

        if(empty($request->sport) || is_null($request->sport)){
            $sport_id = 1;
        }else{
            if(!empty($this->sportsAvailable[$request->sport])){
                $sport_id = $this->sportsAvailable[$request->sport];
            }else{
                die('Sport not available');
            }
        }

        $sports = $this->requestOperation('sports', []);

        $internal_sport_id = '';
        foreach ($sports['message'] as $index => $sport){
            $key = array_search($sport['oxb_id'], $this->sportsAvailable);
            $sports['message'][$index]['sport_key'] = $key;
            if($sport['oxb_id'] === $sport_id){
                $internal_sport_id = $sport['_id'];
                $page_title = sprintf(_('%s latest results and today schedule'), $sport['name']);
            }
        }

        if($internal_sport_id === ''){
            die('Sport disabled or not available!');
        }

        $sport_menu = [];
        $favorite_tournaments_ids = [];
        $favorite_events = [];
        if($sports['status']){

            $sports_list = $sports['message'];

            $favs = $this->requestOperation('favorite_tournaments', []);

            $favorite_tournaments = [];
            if($favs['status']){
                $favorite_tournaments = $favs['message'];
            }

            foreach($sports_list as $sport){
                foreach($favorite_tournaments as $favorite_tournament){

                    if(empty($sport_menu[$sport['_id']])){
                        $sport_menu[$sport['_id']] = [
                            "name"          => $sport['name'],
                            "id"            => $sport['oxb_id'],
                            "_id"           => $sport['_id'],
                            "tournaments"   => []
                        ];
                    }

                    if($sport['_id'] === $favorite_tournament['category']['sport_id']){
                        $sport_menu[$sport['_id']]['tournaments'][] = $favorite_tournament;
                        $favorite_tournaments_ids[] = $favorite_tournament['oxb_id'];
                    }
                }
            }
        }

        $last_results = $this->requestOperation('last_results', [
            "sport_id"  => $internal_sport_id,
            "date"      => $date_selected
        ]);

        if(!$last_results['status']){
            die($last_results['message']);
        }

        $formated_data = [];
        foreach ($last_results['message'] as $result) {
            if(isset($result['etsc']) && count($result['etsc']) > 0){
                if(isset($formated_data[$result['cgi']])){
                    $formated_data[$result['cgi']]['events'][] = $result;
                }else{
                    $formated_data[$result['cgi']] = [
                        "events"    => [],
                        "name"      => $result['cgn'],
                        "country"   => $result['cn'],
                        "sport_name"=> $result['sn'],
                        "sport_id"  => $result['si'],
                        "sport_int_id"=> $result['sport_id'],
                    ];
                    $formated_data[$result['cgi']]['events'][] = $result;
                }
            }
        }

        $next_events = $this->requestOperation('next_events', [
            "sport_id"  => $internal_sport_id,
            "date"      => $date_selected
        ]);

        if(!$next_events['status']){
            die($next_events['message']);
        }

        $formated_data_ne = [];
        foreach ($next_events['message'] as $result) {

            // favorite events
            if(in_array($result['cgi'], $favorite_tournaments_ids)){
                if(isset($favorite_events[$result['cgi']])){
                    $favorite_events[$result['cgi']]['events'][] = $result;
                }else{
                    $favorite_events[$result['cgi']] = [
                        "events"    => [],
                        "name"      => $result['cgn'],
                        "country"   => $result['cn'],
                        "country_id"=> $result['ci'],
                        "sport_name"=> $result['sn'],
                        "sport_id"  => $result['si'],
                    ];
                    $favorite_events[$result['cgi']]['events'][] = $result;
                }
            }else{
                if(isset($formated_data_ne[$result['cgi']])){
                    $formated_data_ne[$result['cgi']]['events'][] = $result;
                }else{
                    $formated_data_ne[$result['cgi']] = [
                        "events"    => [],
                        "name"      => $result['cgn'],
                        "country"   => $result['cn'],
                        "country_id"=> $result['ci'],
                        "sport_name"=> $result['sn'],
                        "sport_id"  => $result['si'],
                    ];
                    $formated_data_ne[$result['cgi']]['events'][] = $result;
                }
            }

        }

        die($app->twig->render($this->template . '/pages/homepage.html.twig', [
            ...$this->defaultTwigParams(),
            "langs"             => $this->langsAvailable,
            'sports'            => $sports['message'],
            'last_results'      => $formated_data,
            'next_events'       => $formated_data_ne,
            'favorite_events'   => $favorite_events,
            'sport_menu'        => $sport_menu,
            'settings'          => $this->website,
            'sport_selected'    => $internal_sport_id,
            'page_title'        => $page_title,
            'template'          => $this->template,
            'date_selected'     => $date_selected,
            'partner'           => $this->partner,
            'lang'              => $request->lang
        ]));
    }

    public function loadLivepage($request, $response, $service, $app) {

        if(empty($request->sport) || is_null($request->sport)){
            $sport_id = 1;
        }else{
            if(!empty($this->sportsAvailable[$request->sport])){
                $sport_id = $this->sportsAvailable[$request->sport];
            }else{
                die('Sport not available');
            }
        }

        $sports = $this->requestOperation('sports', []);

        $internal_sport_id = '';
        foreach ($sports['message'] as $index => $sport){
            $key = array_search($sport['oxb_id'], $this->sportsAvailable);
            $sports['message'][$index]['sport_key'] = $key;
            if($sport['oxb_id'] === $sport_id){
                $internal_sport_id = $sport['_id'];
                $page_title = sprintf(_('%s latest results and today schedule'), $sport['name']);
            }
        }

        if($internal_sport_id === ''){
            die('Sport disabled or not available!');
        }

        $sport_menu = [];
        $favorite_tournaments_ids = [];
        $favorite_events = [];
        if($sports['status']){

            $sports_list = $sports['message'];

            $favs = $this->requestOperation('favorite_tournaments', []);

            $favorite_tournaments = [];
            if($favs['status']){
                $favorite_tournaments = $favs['message'];
            }

            foreach($sports_list as $sport){
                foreach($favorite_tournaments as $favorite_tournament){

                    if(empty($sport_menu[$sport['_id']])){
                        $sport_menu[$sport['_id']] = [
                            "name"          => $sport['name'],
                            "id"            => $sport['oxb_id'],
                            "_id"           => $sport['_id'],
                            "tournaments"   => []
                        ];
                    }

                    if($sport['_id'] === $favorite_tournament['category']['sport_id']){
                        $sport_menu[$sport['_id']]['tournaments'][] = $favorite_tournament;
                        $favorite_tournaments_ids[] = $favorite_tournament['oxb_id'];
                    }
                }
            }
        }

        $live_results = $this->requestOperation('live_results', [
            "sport_id"  => $internal_sport_id
        ]);

        if(!$live_results['status']){
            die($live_results['message']);
        }

        $formated_data = [];
        foreach ($live_results['message'] as $result) {
            // favorite events
            if(in_array($result['cgi'], $favorite_tournaments_ids)){
                if(isset($favorite_events[$result['cgi']])){
                    $favorite_events[$result['cgi']]['events'][] = $result;
                }else{
                    $favorite_events[$result['cgi']] = [
                        "events"    => [],
                        "name"      => $result['cgn'],
                        "country"   => $result['cn'],
                        "country_id"=> $result['ci'],
                        "sport_name"=> $result['sn'],
                        "sport_id"  => $result['si'],
                    ];
                    $favorite_events[$result['cgi']]['events'][] = $result;
                }
            }else{
                if(isset($formated_data[$result['cgi']])){
                    $formated_data[$result['cgi']]['events'][] = $result;
                }else{
                    $formated_data[$result['cgi']] = [
                        "events"    => [],
                        "name"      => $result['cgn'],
                        "country"   => $result['cn'],
                        "country_id"=> $result['ci'],
                        "sport_name"=> $result['sn'],
                        "sport_id"  => $result['si'],
                    ];
                    $formated_data[$result['cgi']]['events'][] = $result;
                }
            }
        }

        die($app->twig->render($this->template . '/pages/live-score.html.twig', [
            ...$this->defaultTwigParams(),
            "langs"             => $this->langsAvailable,
            'sports'            => $sports['message'],
            'live_results'      => $formated_data,
            'favorite_events'   => $favorite_events,
            'sport_menu'        => $sport_menu,
            'sport_selected'    => $internal_sport_id,
            'settings'          => $this->website,
            'template'          => $this->template,
            'partner'           => $this->partner,
            'lang'              => $request->lang
        ]));
    }

    public function loadEventpage($request, $response, $service, $app) {

        $sports = $this->requestOperation('sports', []);
        $subpage = null;
        if(isset($request->page)){
            $subpage = $request->page;
        }

        $sport_menu = [];
        if($sports['status']){

            $sports_list = $sports['message'];

            $favs = $this->requestOperation('favorite_tournaments', []);

            $favorite_tournaments = [];
            if($favs['status']){
                $favorite_tournaments = $favs['message'];
            }

            foreach($sports_list as $sport){
                foreach($favorite_tournaments as $favorite_tournament){

                    if(empty($sport_menu[$sport['_id']])){
                        $sport_menu[$sport['_id']] = [
                            "name"          => $sport['name'],
                            "id"            => $sport['oxb_id'],
                            "_id"           => $sport['_id'],
                            "tournaments"   => []
                        ];
                    }

                    if($sport['_id'] === $favorite_tournament['category']['sport_id']){
                        $sport_menu[$sport['_id']]['tournaments'][] = $favorite_tournament;
                    }
                }
            }
        }

        $event_details = null;
        $event = $this->requestOperation('event_details', [
            "event_id"  => $request->event_id
        ]);

        if($event['status']){
            $event_details = $event['message'][0];
        }

        die($app->twig->render($this->template . '/pages/event.html.twig', [
            ...$this->defaultTwigParams(),
            "langs"         => $this->langsAvailable,
            'sport_menu'    => $sport_menu,
            'event_details' => $event_details,
            'event_id'      => $request->event_id,
            'settings'      => $this->website,
            'template'      => $this->template,
            'subpage'       => $subpage,
            'partner'       => $this->partner,
            'lang'          => $request->lang
        ]));
    }

    public function loadCategorypage($request, $response, $service, $app) {

        $sports = $this->requestOperation('sports', []);
        $sport_selected = null;

        $categories = $this->requestOperation('categories', []);
        $tournaments = $this->requestOperation('tournaments', [
            "sport_id" => $request->sport_id
        ]);

        if(empty($categories['status']) || !$categories['status']){
            die('Categories not found.');
        }

        if(empty($tournaments['status']) || !$tournaments['status']){
            die('Tournaments not found.');
        }

        $categories_list = [];
        foreach ($categories['message'] as $category) {
            $exists = false;
            foreach ($tournaments['message'] as $tournament) {
                if($tournament['category_id'] === $category['_id']){
                    $exists = true;
                }
            }
            if($exists) $categories_list[] = $category;
        }

        $sport_menu = [];
        if($sports['status']){

            $sports_list = $sports['message'];

            if(!is_null($request->sport_id)){
                foreach ($sports_list as $sport) {
                    if ($sport['_id'] == $request->sport_id) {
                        $sport_selected = $sport;
                    }
                }
            }

            $favs = $this->requestOperation('favorite_tournaments', []);

            $favorite_tournaments = [];
            if($favs['status']){
                $favorite_tournaments = $favs['message'];
            }

            foreach($sports_list as $sport){
                foreach($favorite_tournaments as $favorite_tournament){

                    if(empty($sport_menu[$sport['_id']])){
                        $sport_menu[$sport['_id']] = [
                            "name"          => $sport['name'],
                            "id"            => $sport['oxb_id'],
                            "_id"           => $sport['_id'],
                            "tournaments"   => []
                        ];
                    }

                    if($sport['_id'] === $favorite_tournament['category']['sport_id']){
                        $sport_menu[$sport['_id']]['tournaments'][] = $favorite_tournament;
                    }
                }
            }
        }

        if(is_null($sport_selected)){
            die('Sport not found.');
        }

        die($app->twig->render($this->template . '/pages/sport.html.twig', [
            ...$this->defaultTwigParams(),
            "langs"         => $this->langsAvailable,
            'sport_menu'    => $sport_menu,
            'sport_selected'=> $sport_selected,
            'settings'      => $this->website,
            'template'      => $this->template,
            'categories'    => $categories_list,
            'lang'          => $request->lang
        ]));
    }

    public function loadTournamentpage($request, $response, $service, $app) {

        $sports = $this->requestOperation('sports', []);
        $sport_selected = null;

        $tournaments = $this->requestOperation('tournaments', [
            "sport_id"      => $request->sport_id,
            "category_id"   => $request->category_id
        ]);

        if(empty($tournaments['status']) || !$tournaments['status']){
            die('Tournaments not found.');
        }

        $sport_menu = [];
        if($sports['status']){

            $sports_list = $sports['message'];

            if(!is_null($request->sport_id)){
                foreach ($sports_list as $sport) {
                    if ($sport['_id'] == $request->sport_id) {
                        $sport_selected = $sport;
                    }
                }
            }

            $favs = $this->requestOperation('favorite_tournaments', []);

            $favorite_tournaments = [];
            if($favs['status']){
                $favorite_tournaments = $favs['message'];
            }

            foreach($sports_list as $sport){
                foreach($favorite_tournaments as $favorite_tournament){

                    if(empty($sport_menu[$sport['_id']])){
                        $sport_menu[$sport['_id']] = [
                            "name"          => $sport['name'],
                            "id"            => $sport['oxb_id'],
                            "_id"           => $sport['_id'],
                            "tournaments"   => []
                        ];
                    }

                    if($sport['_id'] === $favorite_tournament['category']['sport_id']){
                        $sport_menu[$sport['_id']]['tournaments'][] = $favorite_tournament;
                    }
                }
            }
        }

        if(is_null($sport_selected)){
            die('Sport not found.');
        }

        die($app->twig->render($this->template . '/pages/category.html.twig', [
            ...$this->defaultTwigParams(),
            "langs"         => $this->langsAvailable,
            'sport_menu'    => $sport_menu,
            'sport_selected'=> $sport_selected,
            'settings'      => $this->website,
            'template'      => $this->template,
            'tournaments'   => $tournaments['message'],
            'partner'       => $this->partner,
            'lang'          => $request->lang
        ]));
    }
}