<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\HttpClient\NativeHttpClient;


class GetUserRepairManAction
{
    private $params;
    public function __construct(ContainerBagInterface $params)
    {
        $this->params = $params;
    }
    /**
     * @param User $data
     * @return User
     */
    public function __invoke(User $data): User
    { 
        $place_id = $data->getPlaceId();
        $key = $this->params->get('google_key');
        if ($place_id && $key) {
            $client = new NativeHttpClient();
            $fields = "reviews,rating";
            $response = $client->request('GET', "https://maps.googleapis.com/maps/api/place/details/json?place_id=" . $place_id . "&key=" . $key . "&fields=" . $fields);

            if ($response->getStatusCode() === 200) {
                $content = $response->toArray();
                if (isset($content['result'], $content['result']['rating'], $content['result']['reviews'])) {
                    $data->setGoogleRating($content['result']['rating']);
                    $data->setGoogleReviews($content['result']['reviews']);
                }
            }
        }

        return $data;
    }
}
