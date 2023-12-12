<?php

namespace App\Command;

use App\Service\PayRepairman;
use App\Service\CalculateDate;
use App\Service\StripeProvider;
use App\Entity\Command as EntityCommand;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CheckRepairmanPaymentsCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:check-repairman-payments';

    /**
     * @var CalculateDate
     */
    private $calculateDate;

    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var PayRepairman
     */
    private $payRepairman;

    /**
     * @param CalculateDate $calculateDate
     * @param EntityManagerInterface $em
     * @param PayRepairman $payRepairman
     */
    public function __construct(CalculateDate $calculateDate, EntityManagerInterface $em, PayRepairman $payRepairman)
    {
        $this->calculateDate = $calculateDate;
        $this->em = $em;
        $this->payRepairman = $payRepairman;
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->setDescription('Check repairman payments');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // outputs multiple lines to the console (adding "\n" at the end of each line)
        $io = new SymfonyStyle($input, $output);

        $date = new \DateTime();
        $io->title('Check repairman payments : ' . $date->format("Y-m-d H:i:s"));

        $results = $this->em->createQueryBuilder()
            ->from('App:Command', 'c')
            ->select('c')
            ->where('c.adjust = 0 or c.adjust IS NULL')
            ->andWhere('c.status = 5')
            ->andWhere('c.completionDate IS NOT NULL')
            ->andWhere('c.total IS NOT NULL AND c.total>0')
            ->getQuery()
            ->getResult();

        if ($results) {
            /**
             * @var EntityCommand $row
             */
            foreach ($results as $row) {
                if ($row->getCompletionDate() && !$row->getAdjust() && $row->getStatus() === 5 && $row->getTotal() > 0) {
                    $seconde = $this->calculateDate->diffWorkDay($row->getCompletionDate(), new \DateTime());
                    $dayWork = intval($seconde / 86400);
                    //if ($dayWork > 3) {
                    //3 minute  TODO decomment ligne dessus
                    if ($seconde > 180) {
                        $response = $this->payRepairman->execute($row);
                        if (isset($response["status"], $response["message"])) {
                            if ($response["status"] === "success") {
                                $io->success($response["message"]);
                            } else if ($response["status"] === "error") {
                                $io->error($response["message"]);
                            }
                        }
                    }
                }
            }
        }
        return Command::SUCCESS;
    }
}
