---
+ Pour build l'image php en supprimant le cache => 
> make build

+ Pour stopper la stack
> make stop

+ Pour redémarrer la stack
> make restart

+ Pour redémarrer la stack sans build et sans suppression des containers
> make light_restart

+ Suppressions de la bdd si elle existe déjà
> bin/console d:d:d --force || true

+ Création de la bdd
> bin/console d:d:c 

+ Modification du schéma de la bdd
> bin/console d:s:u -f