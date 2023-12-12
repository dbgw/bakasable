<?php


namespace App\Command;

use App\Entity\DeliveryModeType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class LoadDeliveryModeTypesCommand extends Command
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * LoadDeliveryModeTypesCommand constructor.
     * @param string|null $name
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em, string $name = null)
    {
        parent::__construct($name);
        $this->em = $em;
    }

    protected static $defaultName = 'app:load:delivery_mode_types';

    protected function configure()
    {
        $this
            ->setDescription('Load delivery_mode_types to database');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        foreach ($this->getLists() as $data) {
            $deliveryModeType = new DeliveryModeType();
            $deliveryModeType->setName($data['name']);
            $deliveryModeType->setRequireDeliveryAddress($data['require_delivery_address']);
            $deliveryModeType->setRequireKilometerRadius($data['require_kilometer_radius']);
            $this->em->persist($deliveryModeType);
        }
        try {
            $this->em->flush();
            $io->success('Opération passé avec succés.');
        } catch (\Exception $exception) {
            $io->error('Une erreur est survenu lors de la création des delivery Mode Types.');
        }

        return 0;
    }

    private function getLists(): array
    {
        $response = array();
        $response[] = [
            'name' => 'A domicile',
            'require_delivery_address' => true,
            'require_kilometer_radius' => true,
        ];
        $response[] = [
            'name' => 'En boutique',
            'require_delivery_address' => false,
            'require_kilometer_radius' => false,
        ];
        $response[] = [
            'name' => 'Enlèvement à domicile',
            'require_delivery_address' => true,
            'require_kilometer_radius' => true,
        ];
        $response[] = [
            'name' => 'Visioconférence',
            'require_delivery_address' => false,
            'require_kilometer_radius' => false,
        ];
        return $response;
    }
}
