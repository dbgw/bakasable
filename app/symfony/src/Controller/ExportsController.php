<?php

namespace App\Controller;

use App\Entity\Command;
use App\Repository\CommandRepository;
use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;
use Knp\Snappy\Pdf;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ExportsController extends AbstractController
{
    private CommandRepository $commandRepository;
    private Pdf $pdf;

    public function __construct(
        CommandRepository $commandRepository,
        Pdf $pdf
    ) {
        $this->commandRepository = $commandRepository;
        $this->pdf = $pdf;
    }

    /**
     * @Route("/api/exports/pdf/devis/{id}", name="exports_pdf_devis")
     */
    public function exportsPdfDevis(int $id): PdfResponse
    {
        $command = $this->commandRepository->findOneById($id);
        if ($command instanceof Command) {
            $options = [];
            $html = $this->renderView('exports/pdf/devis.html.twig', [
                'command' => $command,
                'base_path' => $this->getParameter('kernel.project_dir')
            ]);
            return new PdfResponse(
                $this->pdf->getOutputFromHtml($html, $options),
                "Devis#" . $command->getId() . '.pdf'
            );
        }
        throw $this->createNotFoundException('The devis does not exist');
    }
}
