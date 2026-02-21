<?php

namespace Kappascore\Controller\Campaign;

use App\Kernel\Controllers\BaseController;
use App\Kernel\Controllers\ControllerInterface;
use App\Kernel\GeoIpService;
use App\Kernel\Utils\Encoding;
use Klein\Request;
use Klein\Response;
use Propel\CampaignClick;
use Propel\CampaignQuery;
use Propel\Map\CampaignTableMap;
use Throwable;

class ClickController extends BaseController implements ControllerInterface
{

    public function run(): void
    {
        $this->respond("get", $this->relativeRoute('/[:campaign]'), function(Request $request, Response $response){

            $visitor_address    = ClientIp();
            $visitor_geo        = GeoIpService::getData($visitor_address);

            // Visitor details
            if(is_null($visitor_geo)){
                if(isset($_SERVER['HTTP_CF_IPCOUNTRY'])){
                    $visitor_country = strtoupper($_SERVER['HTTP_CF_IPCOUNTRY']);
                }else{
                    $visitor_country = "ES";
                }
            }else{
                $visitor_country = $visitor_geo['country'];
            }

            $campaign = CampaignQuery::create()->filterByStatus(CampaignTableMap::COL_STATUS_ACTIVE)->findOneByIdentifier($request->campaign);

            if(is_null($campaign)){
                die('Invalid campaign');
            }

            $arrived_utm_source = $request->paramsGet()->get('utm_source', 'kappascore');
            $arrived_utm_medium = $request->paramsGet()->get('utm_medium', 'social');
            $arrived_utm_content = $request->paramsGet()->get('utm_content', 'group');
            $arrived_utm_campaign = $request->paramsGet()->get('utm_campaign', "agent".rand(2378, 2415));

            $utm = [
                "utm_source"    => $arrived_utm_source,
                "utm_medium"    => $arrived_utm_medium,
                "utm_campaign"  => $arrived_utm_campaign,
                "utm_content"   => $arrived_utm_content
            ];
            $utm_query = http_build_query($utm);

            $campaign_link = $campaign->getLink();
            if(str_contains($campaign_link, "?")){
                $campaign_link = $campaign_link.'&'.$utm_query;
            }else{
                $campaign_link = $campaign_link.'?'.$utm_query;
            }

            $click = new CampaignClick();
            $click->setCampaignfk($campaign->getId());
            $click->setUtmSource($utm['utm_source']);
            $click->setUtmMedium($utm['utm_medium']);
            $click->setUtmCampaign($utm['utm_campaign']);
            $click->setUtmContent($utm['utm_content']);
            $click->setVisitorCountry($visitor_country);
            $click->save();

            return $response->redirect($campaign_link.'&cid='.$click->getId());

        });

    }
}