<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class FingzDeleteOldConversationsCommand extends Command
{
    protected static $defaultName = 'fingz:delete-old-conversations';
    protected static $defaultDescription = 'Delete old converstaions in a specified time';

    /**
     * @var EntityManagerInterface
     */
    private $em;

    function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        // date to be defined later
        $date = "2021-01-01";
        $q = $this->em->createQuery("DELETE FROM App\Entity\Message m WHERE m.created_at < $date");
        $numDeleted = $q->execute();

        $io->success("$numDeleted messages deleted");

        return Command::SUCCESS;
    }
}
