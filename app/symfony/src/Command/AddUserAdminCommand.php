<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AddUserAdminCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:add-user-admin';

    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var UserPasswordHasherInterface
     */
    private $passwordHasher;

    public function __construct(EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher)
    {
        $this->em = $em;
        $this->passwordHasher = $passwordHasher;
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->setDescription('Add user Admin.')
            ->setHelp('This command allows you to add user.')
            ->addArgument('firstName', InputArgument::REQUIRED, 'User firstName is required')
            ->addArgument('lastName', InputArgument::REQUIRED, 'User lastName is required')
            ->addArgument('email', InputArgument::REQUIRED, 'User email is required')
            ->addArgument('password', InputArgument::REQUIRED, 'User password is required');
    }

    //php bin/console app:add-user-admin user admin admin@example.com userAdmin_1
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // outputs multiple lines to the console (adding "\n" at the end of each line)
        $io = new SymfonyStyle($input, $output);
        $io->title('User add Admin');

        $firstName = $input->getArgument('firstName');
        $lastName = $input->getArgument('lastName');
        $email = $input->getArgument('email');
        $password = $input->getArgument('password');

        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user) {

            $user = new User();
            $user->setUsername($email);
            $user->setEmail($email);
            $user->setFirstname($firstName);
            $user->setLastname($lastName);
            $user->setRoles(['ROLE_ADMIN']);
            $user->setGender('Monsieur');
            $user->setStatus(1);
            $encoded = $this->passwordHasher->hashPassword($user, $password);
            $user->setPassword($encoded);

            $this->em->persist($user);
            $this->em->flush();
            $io->success('User ' . $email . ' added successfully.');

            return Command::SUCCESS;
        }

        $io->error('User ' . $email . ' existe.');

        return Command::FAILURE;
    }
}
