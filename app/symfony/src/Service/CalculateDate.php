<?php

declare(strict_types=1);

namespace App\Service;

class CalculateDate
{
  public function getHolidays($year = null)
  {
    if ($year === null) {
        $year = date('Y');
    }

    $easterDate = easter_date((int) $year);
    $easterDay = date('j', $easterDate);
    $easterMonth = date('n', $easterDate);
    $easterYear = date('Y', $easterDate);

    $holidays = array(
      // Jours feries fixes
      mktime(0, 0, 0, 1, 1, (int) $year), // 1er janvier
      mktime(0, 0, 0, 5, 1, (int) $year), // Fete du travail
      mktime(0, 0, 0, 5, 8, (int) $year), // Victoire des allies
      mktime(0, 0, 0, 7, 14, (int) $year), // Fete nationale
      mktime(0, 0, 0, 8, 15, (int) $year), // Assomption
      mktime(0, 0, 0, 11, 1, (int) $year), // Toussaint
      mktime(0, 0, 0, 11, 11, (int) $year), // Armistice
      mktime(0, 0, 0, 12, 25, (int) $year), // Noel

      // Jour feries qui dependent de paques
      mktime(0, 0, 0, (int) $easterMonth, (int) $easterDay + 1, (int) $easterYear), // Lundi de paques
      mktime(0, 0, 0, (int) $easterMonth, (int) $easterDay + 39, (int) $easterYear), // Ascension
      mktime(0, 0, 0, (int) $easterMonth, (int) $easterDay + 50, (int) $easterYear), // Pentecote
    );

    sort($holidays);

    return $holidays;
  }

  public function diffCalendar($oFirstDate, $oSecondDate)
  {
    return (int) ($oSecondDate->getTimestamp() - $oFirstDate->getTimestamp());
  }

  public function diffWorkDay($oFirstDate, $oSecondDate)
  {
    /*
    * Pour calculer le nombre de jours ouvres,
    * on calcule le nombre total de jours et
    * on soustrait les jours fériés et les week end.
    */
    $iDiffCalendar = $this->diffCalendar($oFirstDate, $oSecondDate);

    $iFirstYear = $oFirstDate->format('Y');
    $iSecondYear = $oSecondDate->format('Y');

    $aHolidays = array();

    /*
    * Si l'interval demande chevauche plusieurs annees
    * on doit avoir les jours feries de toutes ces annees
    */
    for ($iYear = $iFirstYear; $iYear <= $iSecondYear; $iYear++) {
      $aHolidays = array_merge($this->getHolidays($iYear), $aHolidays);
    }

    /*
    * On est oblige de convertir les timestamps en string a cause des decalages horaires.
    */
    $aHolidaysString = array_map(function ($value) {
      return strftime('%Y-%m-%d', $value);
    }, $aHolidays);

    for ($i = $oFirstDate->getTimestamp(); $i < $oSecondDate->getTimestamp(); $i += 86400) {
      /* Numero du jour de la semaine, de 1 pour lundi a 7 pour dimanche */
      $iDayNum = strftime('%u', $i);

      if (in_array(strftime('%Y-%m-%d', $i), $aHolidaysString) or $iDayNum == 6 or $iDayNum == 7) {
        /* Si c'est ferie ou samedi ou dimanche, on soustrait le nombre de secondes dans une journee. */
        $iDiffCalendar -= 86400;
      }
    }
    return (int) $iDiffCalendar;
  }

  public function isHoliday($timestamp)
  {
    $iDayNum = strftime('%u', $timestamp);
    $iYear = strftime('%Y', $timestamp);

    $aHolidays = $this->getHolidays($iYear);

    /*
    * On est oblige de convertir les timestamps en string a cause des decalages horaires.
    */
    $aHolidaysString = array_map(function ($value) {
      return strftime('%Y-%m-%d', $value);
    }, $aHolidays);

    if (in_array(strftime('%Y-%m-%d', $timestamp), $aHolidaysString) or $iDayNum == 6 or $iDayNum == 7) {
      return true;
    }
    return false;
  }

  public function isWorkingDay($timestamp)
  {
    return (!$this->isHoliday($timestamp));
  }
}
