<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use function Symfony\Component\String\u;

class SearchController extends AbstractController
{
    /**
     * @Route("/api/anonymous/service/_search", name="service_search", methods={"GET"})
     */
    public function serviceSearch(Request $request): JsonResponse
    {
        $q = u((string) $request->query->get('q', ''))->trim()->toString();
        $u = intval($request->query->get('u', ''));

        $condition = '*' . $q . '*';
        if (!empty($u)) {
            $condition .= " - categories.parent.universe.id:" . $u;
        }

        $post = json_encode([
            "query" => [
                "query_string" => [
                    "query" => $condition,
                    "fields" => ["name", "categories.parent.name", "categories.name", "description"],
                    "default_operator"=> "and"
                ]
            ]
        ]);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->getParameter("elasticsearch_url") . "service/_search");
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'accept: application/json',
            'content-type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $results = curl_exec($ch);
        //$error = curl_error($ch);
        //echo $error;
        curl_close($ch);

        $response = new JsonResponse();
        $response->setContent($results);
        return $response;
    }
}
