<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Benefit;
use App\Entity\DeliveryMode;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;
use App\Repository\BenefitRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\HttpClient\NativeHttpClient;
use Symfony\Component\HttpFoundation\Request;

final class GetBenefitsServiceAction
{
    private $params;
    public function __construct(ContainerBagInterface $params)
    {
        $this->params = $params;
    }
    /**
     * @param Paginator $data
     * @param Request $request
     * @param BenefitRepository $benefitRepository
     * @return Paginator
     */
    public function __invoke(Paginator $data, Request $request, BenefitRepository $benefitRepository): Paginator
    { 
        $lat = $request->query->get('latitude', '');
        $lng = $request->query->get('longitude', '');

       //$result = $benefitRepository->getBenefitByDistance($lat, $lng, 2);
       //dd($result);
       //exit;

        $client = new NativeHttpClient(); 
        $key = $this->params->get('google_key');
        $fields = "reviews,rating";
        /**
         * @var Benefit $benefit
         */
        foreach ($data as $benefit) {
            $prices =  [];

            // get DeliveryModes By Distance
            $results = $benefitRepository->getDeliveryModesByDistance($lat, $lng, $benefit->getId());
            if($results){
               $ids = array_column($results, 'id');
               $deliveryModes = new ArrayCollection();
               foreach ($benefit->getDeliveryModes() as $deliveryMode) {
                   if (in_array($deliveryMode->getId(), $ids)) {
                     $deliveryModes[] = $deliveryMode;
                   }
               }
               $benefit->setDeliveryModes($deliveryModes);
            }

            if ($benefit->getTypeService() === 'forfait') {
                /**
                 * @var DeliveryMode $deliveryMode
                 */
                foreach ($benefit->getDeliveryModes() as $deliveryMode) {
                    if ($deliveryMode->getPrice() > 0) {
                        $prices[] = floatval($deliveryMode->getPrice());
                    }
                }
            }
            if (Count($prices)) {
                $benefit->setMinPrice(min($prices));
            }
            $place_id = $benefit->getUser()->getPlaceId();
            if ($place_id && $key) {
                $response = $client->request('GET', "https://maps.googleapis.com/maps/api/place/details/json?place_id=" . $place_id . "&key=" . $key . "&fields=" . $fields);
                if ($response->getStatusCode() === 200) {
                    $content = $response->toArray();
                    if (isset($content['result'], $content['result']['rating'], $content['result']['reviews'])) {
                        $benefit->getUser()->setGoogleRating($content['result']['rating']);
                    }
                }
            }
        }
        return $data;
    }
}
