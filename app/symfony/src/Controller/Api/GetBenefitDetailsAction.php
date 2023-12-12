<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Benefit;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\HttpClient\NativeHttpClient;


class GetBenefitDetailsAction
{
    private $params;
    public function __construct(ContainerBagInterface $params)
    {
        $this->params = $params;
    }
    /**
     * @param Benefit $data
     * @return Benefit
     */
    public function __invoke(Benefit $data): Benefit
    { 
        $place_id = $data->getUser()->getPlaceId();
        $key = $this->params->get('google_key');
        if ($place_id && $key) {
            $client = new NativeHttpClient();
            $fields = "reviews,rating";
            $response = $client->request('GET', "https://maps.googleapis.com/maps/api/place/details/json?place_id=" . $place_id . "&key=" . $key . "&fields=" . $fields);

            if ($response->getStatusCode() === 200) {
                $content = $response->toArray();
                if (isset($content['result'], $content['result']['rating'], $content['result']['reviews'])) {
                    $data->getUser()->setGoogleRating($content['result']['rating']);
                    $data->getUser()->setGoogleReviews($content['result']['reviews']);
                }
            }
        }

        return $data;
    }
}
