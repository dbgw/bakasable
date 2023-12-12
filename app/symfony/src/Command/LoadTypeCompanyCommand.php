<?php


namespace App\Command;

use App\Entity\TypeCompany;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class LoadTypeCompanyCommand extends Command
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * LoadTypeCompanyCommand constructor.
     * @param string|null $name
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em, string $name = null)
    {
        parent::__construct($name);
        $this->em = $em;
    }

    protected static $defaultName = 'app:load:type_company';

    protected function configure()
    {
        $this
            ->setDescription('Load type_company to database');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        foreach ($this->getLists() as $data) {
            $typeCompany = new TypeCompany();
            $typeCompany->setName($data['name']);
            $typeCompany->setRequireNoTva($data['require_no_tva']);
            $this->em->persist($typeCompany);
        }
        try {
            $this->em->flush();
            $io->success('Opération passé avec succés.');
        } catch (\Exception $exception) {
            $io->error('Une erreur est survenu lors de la création des types de sociétés.');
        }

        return 0;
    }

    private function getLists(): array
    {
        $response = array();
        $response[] = [
            'name' => 'SASU',
            'require_no_tva' => true,
        ];
        $response[] = [
            'name' => 'SAS',
            'require_no_tva' => true,
        ];
        $response[] = [
            'name' => 'EURL',
            'require_no_tva' => true,
        ];
        $response[] = [
            'name' => 'SARL',
            'require_no_tva' => true,
        ];
        $response[] = [
            'name' => 'SA',
            'require_no_tva' => true,
        ];
        $response[] = [
            'name' => 'SNC',
            'require_no_tva' => true,
        ];
        $response[] = [
            'name' => 'Auto-Entrepreneur',
            'require_no_tva' => false,
        ];
        return $response;
    }
}
