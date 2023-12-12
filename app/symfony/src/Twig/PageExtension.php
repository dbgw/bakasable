<?php

declare(strict_types=1);

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class PageExtension extends AbstractExtension
{

  public function __construct()
  {
  }

  public function getFilters(): array
  {
    return [
      new TwigFilter('file_exists', [$this, 'file_exists']),
      new TwigFilter('str_tok', [$this, 'str_tok']),
    ];
  }

  public function file_exists(string $filename): bool
  {
    return file_exists($filename);
  }

  public function str_tok(?string $filename): string
  {
    return $filename ? strtok($filename, '?') : "";
  }
}
