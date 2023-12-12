import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContentPageStyle } from "../assets/styles/frontGlobalStyle";
import DefaultPage from "../components/defaultPage";
import HeaderDefaultPage from "../components/front/headerDefaultPage";
import Base from "../theme/front/base";
import ImageBanner from "../assets/images/image-slide.jpg";
import ROUTES from "../config/routes";

export default function ConditionCommerciale() {
  const dataCrumbs = [
    { name: "Accueil", path: "/" },
    {
      name: "Conditions commerciales",
      path: ROUTES.CONDITION_COMMERCIALE.url,
    },
  ];
  return (
    <Base>
      <HeaderDefaultPage title="Conditions commerciales" image={ImageBanner} />
      <ContentPageStyle className="content-wysiwig">
        <Container>
          <DefaultPage bradcrumbPage={dataCrumbs}>
            <h2>PREAMBULE</h2>
            <p>
              La Plateforme éditée par la société FINGZ et accessible à
              l'adresse www.fingz.fr propose un service d'intermédiation entre
              des artisans réparateurs professionnels (ci-après « les
              Réparateurs ») et des clients consommateurs (ci-après « les
              Clients ») pour la réalisation de prestations de services
              (ci-après « les Prestations »).{" "}
            </p>
            <p>
              <strong>
                Les présentes Conditions Commerciales régissent l'achat de
                Prestations proposé(e)s par le Vendeur à l'Acheteur (ci-après
                collectivement désignées comme « les Parties »), par
                l'intermédiaire de la Marketplace - en cas d'absence, de lacune,
                ou de contradiction entre les CGV du Réparateur et les présentes
                Conditions Commerciales.{" "}
              </strong>
            </p>

            <h2>1. DEFINITIONS</h2>
            <p>
              Les termes employés ci-après ont, dans les présentes Conditions
              Commerciales de la Plateforme, la signification suivante :
            </p>
            <ul>
              <li>
                <strong>« Clients » </strong> : désigne toute personne physique
                ayant la qualité deconsommateur, accédant à la Plateforme et
                commandant une Prestation réalisée par un Réparateur.
              </li>
              <li>
                <strong>« Commande » </strong> : désigne la commande de
                Prestation ou de Devis réalisée par un Client auprès d'un
                Réparateur sur la Plateforme, une fois les éléments essentiels
                définis.
              </li>
              <li>
                <strong>« Conditions Commerciales de la Plateforme » </strong>{" "}
                désigne les conditions commerciales harmonisant les pratiques
                commerciales des Réparateurs de la Plateforme, complétant le
                Contrat de Prestation dans l'hypothèse où les CGV du Réparateur
                seraient absentes, incomplètes ou non conformes.
              </li>
              <li>
                <strong>«Conditions Générales de Services » </strong> : désigne
                les conditions contractuelles encadrant la fourniture de
                Services de la Plateforme par l'Opérateur aux Réparateurs.
              </li>
              <li>
                <strong>« Conditions Générales d'Utilisation » </strong> ou{" "}
                <strong>« CGU »</strong> : désigne les conditions contractuelles
                mises à disposition sur la page d'accueil de la Plateforme, afin
                d'encadrer l'utilisation de celle-ci par tout Utilisateur.
              </li>
              <li>
                <strong>« CGV du Réparateur » </strong> : désigne les CGV du
                Réparateur régissant la vente à distance des Prestations du
                Réparateur.
              </li>
              <li>
                <strong>« Contenus » </strong> : désigne l'ensemble des
                informations, textes, logos, marques, animations, dessins et
                modèles, photographies, données et de façon générale tous les
                éléments et contenus du Réparateur publié sur la Plateforme
                selon les modalités, la forme et les conditions qui lui sont
                proposées dans le cadre des Services.
              </li>
              <li>
                <strong>« Contrat de Prestation » </strong> : désigne le contrat
                conclu entre le Réparateur et le Client encadrant la réalisation
                des Prestations. Le Contrat de Prestation est composé : de la
                Fiche présentant la Prestation ou du Devis, des CGV du
                Réparateur et, le cas échéant, des Conditions Commerciales de la
                Plateforme.
              </li>
              <li>
                <strong>« Devis » </strong> : désigne la proposition de
                Prestation adressée par le Réparateur au Client en réponse à son
                Offre de Prestation. Lorsque le Devis est accepté par le Client,
                celui-ci fait partie intégrante du Contrat de Prestation.
              </li>
              <li>
                <strong>« Espace Client » </strong> : désigne l'interface
                hébergée sur la Plateforme dans laquelle est regroupé l'ensemble
                des données fournies par le Client et lui permettant de gérer
                ses Commandes. L'accès à l'Espace Client se fait grâce aux
                Identifiants.{" "}
              </li>
              <li>
                <strong>« Fiche » </strong> : désigne la description de la
                Prestation de Réparation proposée parle Réparateur.
              </li>
              <li>
                <strong>« Heures Ouvrées » </strong> : désigne les heures de
                travail usuelles entendues comme toute heure travaillée du lundi
                au vendredi, entre 9h et 17h30.
              </li>
              <li>
                <strong>« Identifiants » </strong> : désigne l'adresse email du
                Client et le mot de passe choisis par ce dernier, nécessaires à
                l'accès à son Espace Client sur la Plateforme.
              </li>
              <li>
                <strong>« Informations confidentielles » </strong> : désigne
                toutes les informations financières, juridiques, techniques,
                commerciales, stratégiques, ainsi que les données, documents de
                toute nature, dessins, concepts, secrets de fabrication,
                savoir-faire, systèmes d'information, logiciels, transmis ou
                portés à la connaissance d'une Partie au titre du Contrat, quels
                que soient la forme et/ou les supports utilisés.
              </li>
              <li>
                <strong>« Offre » </strong> : désigne l'offre de Prestation
                formulée par un Client à un ou plusieurs Réparateur(s) par
                l'intermédiaire de la Plateforme.
              </li>
              <li>
                <strong>« Opérateur » </strong> : désigne la société qui gère la
                Plateforme et mettent en relation les Parties, qui est en
                l'occurrence la société FINGZ, société par actions simplifiée,
                immatriculée au Registre du Commerce et des Sociétés de Paris
                sous le numéro 889 838 694, dont le siège social est situé au
                19, rue Ravignan 75018 Paris.
              </li>
              <li>
                <strong>« Parties » </strong> : au pluriel, désigne ensemble le
                Client et le Réparateur. Au singulier, désigne une seule des
                deux Parties.
              </li>
              <li>
                <strong>« Plateforme » </strong> : désigne la plateforme en
                ligne accessible à l'adresse suivante : www.fingz.fr. La
                Plateforme regroupe l'ensemble des pages web, Services et
                fonctionnalités proposés aux Utilisateurs.{" "}
              </li>
              <li>
                <strong>« Prestataire de Services de Paiement » </strong> ou{" "}
                <strong>« PSP »</strong> : désigne la société, détentrice d'un
                agrément bancaire, fournissant, par l'intermédiaire de
                l'Opérateur, des services de paiement aux Réparateurs afin de
                leur permettre d'encaisser les paiements des Clients. Le
                Prestataire de Services de Paiement de l'Opérateur est Stripe
                Payments Europe, Ltd., Société de droit irlandais, dont le siège
                social est situé the One Building, 1, Lower Grand Canal Street,
                Dublin 2, Ireland ; habilitée à exercer son activité au sein de
                l'Espace Economique Européen, en qualité d'établissement de
                monnaie électronique agréé par la Banque Centrale d'Irlande sous
                le numéro C187865.
              </li>
              <li>
                <strong>« Prestations » </strong> : désigne les services de
                réparation proposés par le Réparateur aux Clients via la
                Plateforme.
              </li>
              <li>
                <strong>« Réparateur » </strong> : désigne un artisan, personne
                physique ou morale exerçant légalement son activité en tant
                qu'auto-entrepreneur, SARL, EURL, SAS, ou SASU, affiliée à une
                Chambre des Métiers et de l'Artisanat, justifiant d'un numéro de
                SIRET, d'une inscription au Répertoire des Métiers et ayant de
                préférence le label « Répar'acteur ».
              </li>
              <li>
                <strong>« Services » </strong> : désigne les différents services
                fournis par l'Opérateur aux Réparateurs et aux Clients par
                l'intermédiaire de la Plateforme.
              </li>
              <li>
                <strong>« Utilisateur » </strong> : désigne toute personne qui
                accède et navigue sur la Plateforme, qu'il soit Réparateur,
                Client, ou simple internaute.
              </li>
              <li>
                <strong>« Vitrine » </strong> : désigne la fiche de présentation
                du Réparateur détaillant l'ensemble de ses Univers de
                compétence, sa localisation, les tarifs pratiqués, et les notes
                et avis obtenus par ce dernier.
              </li>
            </ul>

            <h2>2. OBJET</h2>
            <p>
              Les présentes Conditions Commerciales de la Plateforme sont
              proposées afin d'harmoniser la politique commerciale applicable
              aux Commandes sur la Plateforme.{" "}
            </p>
            <p>
              Les présentes Conditions Commerciales s'appliquent en cas
              d'absence, de lacune, ou de contradiction entre les CGV du
              Réparateur et les présentes Conditions Commerciales. Elles forment
              le Contrat de Prestation, composé des éléments suivants :
            </p>
            <ul>
              <li>Fiche</li>
              <li>CGV du Réparateur</li>
              <li>Conditions Commerciales de la Plateforme.</li>
            </ul>
            <p>
              Il est entendu qu'en cas de contradiction entre ces documents, les
              Fiches prévaudront sur les CGV du Réparateur, tandis que les
              Conditions Commerciales de la Plateforme prévaudront, le cas
              échéant, tant sur les Fiches que sur les CGV du Réparateur.{" "}
            </p>

            <h2>3. ACCEPTATION DES CONDITIONS COMMERCIALES</h2>
            <p>
              Il est précisé que la dernière version des Conditions Commerciales
              s'appliquera à toute nouvelle Commande. Le Client est invité à
              imprimer les présentes Conditions Commerciales de la Plateforme et
              à en conserver une copie.{" "}
            </p>
            <p>
              Toute Commande implique obligatoirement l'acceptation sans réserve
              des présentes Conditions Commerciales de la Plateforme et des
              éventuelles CGV du Réparateur.
            </p>
            <p>
              Le Client pourra prendre connaissance des présentes Conditions
              Commerciales de la Plateforme au moment de la Commande d'une
              Prestation auprès du Réparateur. Elles doivent être consultées et
              expressément acceptées avant toute Commande.
            </p>
            <p>
              Le Client est invité à lire attentivement, imprimer les présentes
              Conditions Commerciales de la Plateforme et à en conserver une
              copie.{" "}
            </p>

            <h2>4. INFORMATIONS RELATIVES AU CLIENT</h2>
            <p>
              Pour pouvoir passer une Commande, le Client sera invité à fournir
              des informations permettant de l'identifier en complétant le
              formulaire disponible sur la Plateforme.
            </p>
            <p>
              Les informations que le Client fournit au Réparateur lors d'une
              Commande doivent être complètes, exactes et à jour. Le Réparateur
              se réserve le droit de demander au Client de confirmer, par tout
              moyen approprié, son identité, son éligibilité et les informations
              communiquées.
            </p>

            <h2>5. PROCESSUS DE COMMANDE DES PRESTATIONS</h2>

            <h3>5.1. Caractéristiques des Prestations du Réparateur</h3>
            <p>
              Le Réparateur s'engage à présenter sur sa Vitrine et au travers
              des Fiches, les caractéristiques essentielles des Prestations
              qu'il propose et les informations obligatoires en vertu du droit
              applicable.
            </p>
            <p>
              Par conséquent, le Client accepte de les lire attentivement avant
              de passer commande sur la Plateforme.
            </p>
            <p>
              Le Client souhaitant commander une Prestation auprès d'un
              Réparateur formule à ce dernier une Offre de Prestation
            </p>
            <p>
              Le Réparateur recevant l'Offre de Prestation pourra également
              entrer en contact avec le Client avant de proposer un Devis, le
              prix d'une Prestation spécifique ou de refuser la Prestation.
            </p>
            <p>
              Le Client reconnaît avoir vérifié l'adéquation de l'Offre de
              Prestation qu'il formule et des Prestations à ses besoins.
            </p>
            <p>
              Les Prestations commercialisées sont conformes à la législation
              européenne en vigueur et aux normes applicables en France.{" "}
            </p>

            <h3>5.2. Procédure de Commande</h3>
            <p>
              Les Commandes de Prestations ou de Devis sont directement passées
              sur la Plateforme. Pour effectuer une Commande, le Client doit
              suivre les étapes décrites ci-dessous.
            </p>
            <h4>5.2.1.Choix de la Prestation</h4>
            <p>
              Une fois sa recherche effectuée via la Plateforme, le Client devra
              sélectionner la Prestation de son choix parmi les résultats
              proposés.
            </p>
            <p>
              Le Client exprime ses besoins de la manière la plus détaillée
              possible tant en termes de délais attendus qu'en termes de
              caractéristiques techniques.
            </p>

            <h4>5.2.2.Commandes</h4>
            <p>
              Lorsque le Client opte pour une prestation standard, au forfait,
              le Client peut directement passer une Commande de Prestations via
              la Plateforme et effectuer son paiement. A défaut, il doit
              demander un Devis.{" "}
            </p>
            <p>
              Lorsque le Devis est payant, le Client est invité à régler le
              montant dû à ce titre lors de sa Commande de Devis. Le Client sera
              remboursé des frais engagés si le Réparateur annule la Commande de
              Devis car il n'est pas en mesure de répondre aux demandes du
              Client.{" "}
            </p>
            <p>
              Si le Réparateur décide de répondre à la Commande de Devis,
              celui-ci est établi par le Réparateur sur la base des besoins
              exprimés par le Client et des éventuels échanges intervenus entre
              les Parties pour obtenir des précisions, puis adressé au Client.
            </p>
            <p>
              Le Client a le choix d'accepter ou de refuser le Devis,
              l'acceptation du Devis valant Commande de Prestations.{" "}
            </p>
            <p>
              Il est invité à vérifier le contenu de sa Commande de Prestations
              avant toute validation.{" "}
            </p>
            <p>
              Après vérification, le Client est invité à procéder au paiement
              sécurisé des Prestations ou du Devis commandés en suivant les
              instructions figurant sur la Plateforme et fournir au Réparateur
              toutes les informations nécessaires à la facturation des
              Prestations par le Réparateur.{" "}
            </p>

            <h4>5.2.3.Accusé de réception</h4>
            <p>
              Une fois que toutes les étapes décrites ci-dessus sont complétées,
              une page apparait sur la Plateforme afin d'accuser réception de la
              Commande du Client. Une copie de l'accusé de réception de la
              Commande est automatiquement adressée au Client par courrier
              électronique, à condition que l'adresse électronique communiquée
              par le biais du formulaire d'inscription soit correcte et valide.{" "}
            </p>

            <h4>5.2.4.Annulation par le Réparateur</h4>
            <p>
              A réception de la Commande du Client, le Réparateur est engagé à
              fournir le Devis ou la Prestation pour lesquels le Client a passé
              Commande.
            </p>
            <p>
              Le Réparateur peut néanmoins procéder à une annulation dans un
              délai de quarante-huit (48) heures s'il n'est pas en mesure de
              répondre aux besoins du Client.
            </p>
            <p>
              Il peut aussi contacter directement le Client pour obtenir des
              précisions sur la Commande avant de déterminer s'il est en mesure
              d'y répondre ou non.
            </p>

            <h4>5.2.5.Facturation</h4>
            <p>
              Pendant la procédure de Commande, le Client devra saisir les
              informations nécessaires à la facturation.
            </p>
            <p>
              Le Client doit notamment préciser le moyen de paiement utilisé et
              fournir au Réparateur toutes les informations nécessaires à la
              réalisation de la Prestation, et notamment celles applicables au
              mode de délivrance de la Prestation comme l'adresse du lieu de
              réalisation de la Prestation lorsque celle-ci est à domicile et
              les codes d'accès à cette adresse.
            </p>
            <p>
              Quel que soit le mode de Commande ou de paiement utilisé, le
              Réparateur adressera au Client l'original de sa facture une fois
              les Prestations exécutées.
            </p>

            <h3>5.3. Prix</h3>
            <p>
              Les Réparateurs renseignent sur leur Vitrine au sein de leurs
              offres des prix forfaitaires pour les Prestations ainsi que le
              prix des Devis, le cas échéant, affichés en euros Toutes Taxes
              Comprises (TTC).
            </p>
            <p>
              Lorsque le prix de la Prestation est forfaitaire ou que le Devis
              est payant, le Client paie le prix correspondant dès la Commande
              de Prestation ou de Devis.
            </p>
            <p>
              Les prix incluent en particulier la taxe sur la valeur ajoutée
              (TVA) au taux en vigueur à la date de Commande. Toute modification
              du taux applicable peut impacter le prix des Prestations à compter
              de la date d'entrée en vigueur du nouveau taux.
            </p>

            <h2>6. DROIT DE RETRACTATION</h2>
            <p>
              Les modalités du droit de rétractation sont prévues dans la «
              politique de rétractation », disponible en Annexe 1 « Politique de
              Rétraction » des présentes.
            </p>
            <p>
              Par principe, le Client dispose d'un droit de rétraction, qu'il
              exerce en informant l'Opérateur et le Réparateur. Certains
              services sont toutefois exclus du droit de rétraction, en raison
              des exceptions légales prévues par l'article L.221-28 du Code de
              la consommation.
            </p>
            <p>Sont notamment exclus :</p>
            <ul>
              <li>
                Les biens confectionnés selon les spécifications du Client ou
                nettement personnalisés ;
              </li>
              <li>
                Les biens qui ont été descellés par le Client après la livraison
                et qui ne peuvent être renvoyés pour des raisons d'hygiène ou de
                protection de la santé ;
              </li>
              <li>
                La fourniture de services pleinement exécutés avant la fin du
                délai de rétraction et dont l'exécution a commencé après accord
                préalable exprès du consommateur et renoncement exprès à son
                droit de rétraction ;{" "}
              </li>
              <li>
                La fourniture de travaux d'entretien ou de réparation à réaliser
                en urgence au domicile du consommateur et expressément
                sollicités par lui, dans la limite des pièces de rechange et
                travaux strictement nécessaires pour répondre à l'urgence.
              </li>
            </ul>
            <p>
              Dès lors que le Client planifie un rendez-vous avec le Réparateur
              ou lui envoie un objet en réparation, le Client est engagé et
              renonce à son droit de rétractation.
            </p>

            <h2>7. PAIEMENT</h2>
            <h3>7.1. Moyens de paiement</h3>
            <p>
              Le Client peut payer ses Prestations en ligne sur la Plateforme
              suivant les modes de paiement proposés c'est-à-dire par carte
              bancaire (Visa / Maestro / Mastercard).
            </p>
            <p>
              Le Client sera redirigé vers un espace sécurisé correspondant à ce
              choix afin de procéder au paiement. En l'occurrence, le Client se
              déclare informé du fait que tout paiement sur la Plateforme se
              fait via le Prestataire de Services de Paiement, gérant les flux
              financiers.
            </p>
            <p>
              Dans ce cadre, le Client garantit au Réparateur qu'il détient
              toutes les autorisations requises pour utiliser le moyen de
              paiement choisi.
            </p>
            <p>
              Toutes les mesures nécessaires seront alors prises pour garantir
              la sécurité et la confidentialité des données transmises en ligne
              dans le cadre du paiement en ligne sur la Plateforme.{" "}
            </p>

            <h3>7.2. Date de paiement</h3>
            <p>
              Le compte du Client sera débité dès la Commande de Prestation
              passée sur la Plateforme.{" "}
            </p>

            <h3>7.3. Refus de paiement</h3>
            <p>
              Si la banque refuse de débiter une carte bancaire, le Client devra
              contacter l'Opérateur afin de payer la Commande par tout autre
              moyen de paiement valable.
            </p>
            <p>
              Dans l'hypothèse où, pour quelle que raison que ce soit,
              opposition, refus ou autre, la transmission du flux d'argent dû
              par le Client s'avèrerait impossible, la Commande et la Prestation
              seraient annulées.
            </p>

            <h2>8. OBLIGATION DES PARTIES</h2>

            <h3>8.1. Obligations du Réparateur </h3>
            <p>
              Le Réparateur s'engage, dans le cadre défini par les présentes
              Conditions Commerciales, à mettre en œuvre tous les moyens pour
              permettre la réalisation des Prestations commandées par le Client.
            </p>
            <p>
              Le Réparateur s'engage à réaliser les Prestations de manière
              loyale et conforme aux règles de l'art. Le Réparateur s'engage à
              respecter les délais et conditions prévues entre les Parties dans
              le Contrat de Prestation.{" "}
            </p>

            <h3>8.2. Obligations du Client</h3>
            <p>
              Afin de permettre au Réparateur de réaliser les Prestations
              commandées dans les meilleures conditions, le Client s'engage à :
            </p>
            <ul>
              <li>
                Tenir à la disposition du Réparateur toutes les informations
                nécessaires à la bonne exécution de la Prestation
              </li>
              <li>Verser le prix convenu en contrepartie de la Prestation ;</li>
              <li>Respecter l'ensemble des lois et règlements en vigueur ; </li>
            </ul>

            <h2>9. GARANTIE COMMERCIALE</h2>
            <p>
              En dehors des garanties commerciales que le Réparateur pourrait
              proposer, le Client bénéficie de garanties légales lorsque la
              Prestation inclut la fourniture de tout ou partie du matériel
              concerné par la Prestation (par exemple, l'incorporation de pièces
              de rechange).{" "}
            </p>

            <div style={{ border: "1px solid black", padding: "20px 24px", marginBottom: "30px" }}>
              <p>
                A noter que la garantie de conformité prévue à l'article 10.1
                ci-après n'est applicable que dans le cas où le Réparateur agit
                en tant que professionnel et le Client en tant que consommateur.
                Cela n'est pas le cas concernant la garantie des vices cachés
                décrites à l'article 10.2 ci-après, applicables à toutes les
                Parties.
              </p>
              <p>
                <strong>
                  Ces garanties ne sont valables qu'en cas de remplacement ou
                  fourniture d'un élément matériel par le Réparateur lors de
                  l'exécution de la Prestation et uniquement sur les biens
                  fournis.{" "}
                </strong>
              </p>
              <h5>Article 10.1. Garantie de conformité</h5>
              <p>
                <strong>Article L. 217-4 du Code de la consommation</strong> : «
                Le Réparateur livre un bien conforme au contrat et répond des
                défauts de conformité existant lors de la délivrance.Il répond
                également des défauts de conformité résultant de l'emballage,
                des instructions de montage ou de l'installation lorsque
                celle-ci a été mise à sa charge par le contrat ou a été réalisée
                sous sa responsabilité ».
              </p>
              <p>
                <strong>Article L.217-5 du Code de la consommation</strong> : «
                Le bien est conforme au contrat :1° S'il est propre à l'usage
                habituellement attendu d'un bien semblable et, le cas échéant :-
                s'il correspond à la description donnée par le Réparateur et
                possède les qualités que celui-ci a présentées à l'acheteur sous
                forme d'échantillon ou de modèle ;- s'il présente les qualités
                qu'un acheteur peut légitimement attendre eu égard aux
                déclarations publiques faites par le Réparateur, par le
                producteur ou par son représentant, notamment dans la publicité
                ou l'étiquetage ;2° Ou s'il présente les caractéristiques
                définies d'un commun accord par les parties ou est propre à tout
                usage spécial recherché par l'acheteur, porté à la connaissance
                du Réparateur et que ce dernier a accepté.».
              </p>
              <p>
                Le Réparateur est susceptible de répondre des défauts de
                conformité existants lors de la délivrance et des défauts de
                conformité résultant de l'emballage, des instructions de montage
                ou de l'installation lorsque celle-ci a été mise à sa charge ou
                a été réalisée sous sa responsabilité.
              </p>
              <p>
                L'action résultant du défaut de conformité se prescrit par deux
                (2) ans à compter de la délivrance du bien fourni{" "}
                <strong>(Article L.217-12 du Code de la consommation)</strong>
              </p>
              <p>
                En cas de défaut de conformité, le Client pourra demander le
                remplacement ou la réparation du bien fourni, à son choix.
                Toutefois, si le coût du choix du Client est manifestement
                disproportionné au regard de l'autre option envisageable, compte
                tenu de la valeur du bien fourni ou de l'importance du défaut,
                le Réparateur pourra procéder à un remboursement, sans suivre
                l'option choisie par le Client.
              </p>
              <p>
                Dans l'hypothèse ou un remplacement ou une réparation serait
                impossible, le Réparateur s'engage à restituer le prix du bien
                fourni sous trente (30) jours à réception du bien retourné et en
                échange du renvoi du bien par le Client.
              </p>
              <p>
                Enfin, le Client est dispensé de rapporter la preuve de
                l'existence du défaut de conformité du bien fourni pendant les
                vingt-quatre (24) mois suivant la délivrance du bien fourni
                excepté pour les biens d'occasion pour lesquels ce délai est
                fixé à six (6) mois [12 mois à compter du 1er Janvier 2022].{" "}
                <strong>(Article L. 217-7 du Code de la consommation).</strong>
              </p>
              <p>
                Il est précisé que la présente garantie légale de conformité
                s'applique indépendamment de la garantie commerciale consentie,
                le cas échéant, sur les biens fournis ou la Prestation.{" "}
              </p>
              <h5>Article 10.2. Garantie des vices cachés</h5>
              <p>
                Le Réparateur est tenu de la garantie à raison des vices cachés
                du bien fourni qui le rendent impropre à l'usage auquel on le
                destine, ou qui diminuent tellement cet usage que le Client ne
                l'aurait pas acquis, ou n'en aurait donné qu'un moindre prix,
                s'il les avait connus.{" "}
                <strong>(Article 1641 du Code Civil)</strong>
              </p>
              <p>
                Cette garantie permet au Client qui peut prouver l'existence
                d'un vice caché de choisir entre le remboursement du prix du
                bien s'il est retourné et le remboursement d'une partie de son
                prix, si le bien n'est pas retourné.
              </p>
              <p>
                Dans l'hypothèse où un remplacement ou une réparation serait
                impossible, le Réparateur s'engage à restituer le prix du bien
                fourni sous trente (30) jours à réception du bien fourni
                retourné et en échange du renvoi du bien fourni par le Client.
                L'action résultant des vices rédhibitoires doit être intentée
                par le Client dans un délai de deux (2) ans à compter de la
                découverte du vice.{" "}
                <strong>(Alinéa 1er de l'article 1648 du Code Civil)</strong>
              </p>
            </div>

            <h2>10. RESPONSABILITE</h2>
            <p>
              La responsabilité du Réparateur ne pourra en aucun cas être
              engagée en cas d'inexécution ou de mauvaise exécution des
              obligations contractuelles imputables au Client, notamment lors de
              la saisie de sa Commande.
            </p>
            <p>
              Le Réparateur ne pourra être tenu pour responsable, ou considéré
              comme ayant failli aux présentes, pour tout retard ou inexécution,
              lorsque la cause du retard ou de l'inexécution est liée à un cas
              de force majeure telle qu'elle est définie par la jurisprudence
              des cours et Tribunaux français.
            </p>

            <h2>11. FORCE MAJEURE</h2>
            <p>
              La responsabilité du Réparateur ne pourra pas être mise en œuvre
              si la non-exécution ou le retard dans l'exécution de l'une de ses
              obligations décrites dans les présentes Conditions Commerciales de
              la Plateforme découle d'un cas de force majeure.{" "}
            </p>
            <p>
              Il y a force majeure en matière contractuelle lorsqu'un évènement
              échappant au contrôle du débiteur, qui ne pouvait être
              raisonnablement prévu lors de la conclusion du contrat et dont les
              effets ne peuvent être évités par des mesures appropriées, empêche
              l'exécution de son obligation par le débiteur.
            </p>
            <p>
              Si l'empêchement est temporaire, l'exécution de l'obligation est
              suspendue à moins que le retard qui en résulterait ne justifie la
              résolution du contrat. Si l'empêchement est définitif, le contrat
              est résolu de plein droit et les parties sont libérées de leurs
              obligations dans les conditions prévues aux articles 1351 et
              1351-1 du Code civil.
            </p>
            <p>
              En cas de survenance d'un des évènements susvisés, le Réparateur
              s'efforcera d'informer le Client dès que possible.
            </p>

            <h2>12. DONNÉES PERSONNELLES</h2>
            <div className="cadre-black"
              style={{
                border: "1px solid black",
                padding: "20px 24px",
                backgroundColor: "#f6f6f6",
                marginBottom: "30px"
              }}
            >
              <p>
                Tout consommateur a la possibilité de s'inscrire gratuitement
                sur la liste d'opposition au démarchage téléphonique BLOCTEL
                <a
                  href="https://conso.bloctel.fr/index.php/inscription.php"
                  target="_blank"
                >
                  https://conso.bloctel.fr/index.php/inscription.php{" "}
                </a>
              </p>
              <p>
                Conformément à la loi n° 2020-901 du 24 juillet 2020 visant à
                encadrer le démarchage téléphonique et à lutter contre les
                appels frauduleux, tout professionnel se réserve le droit de
                démarcher un consommateur inscrit sur la liste d'opposition au
                démarchage téléphonique lorsqu'il s'agit de sollicitations
                intervenant dans le cadre de l'exécution d'un contrat en cours
                et ayant un rapport avec l'objet dudit contrat, y compris
                lorsqu'il s'agit de proposer au consommateur des produits ou
                services afférents ou complémentaires à l'objet du contrat en
                cours ou de nature à améliorer ses performances ou sa qualité.
              </p>
            </div>

            <p>
              Le Réparateur peut être amené à collecter et traiter les données à
              caractère personnel des Clients de la Plateforme lors de la
              Commande de Prestation. A ce titre, il garantit qu'il traite ces
              données dans le respect des droits et obligations issues de la loi
              n°78-17 du 6 janvier 1978 relative à l'informatique aux fichiers
              et aux libertés dans sa version modifiée dite Loi « Informatique
              et Libertés », et du Règlement (UE) 2016/679 du Parlement européen
              et du Conseil du 27 avril 2016 relatif à la protection des
              personnes physiques à l'égard du traitement des données à
              caractère personnel et à la libre circulation de ces données, et
              abrogeant la directive 95/46/CE (Règlement général sur la
              protection des données, ci-après « RGPD »),
            </p>
            <p>
              A compter de la mise en relation avec le Client ayant procédé à
              une Offre de Prestation, le Réparateur sera responsable des
              traitements de données à caractère personnel des Clients.{" "}
            </p>
            <p>
              Conformément à la loi n°78-17 du 6 janvier 1978 relative à
              l'informatique aux fichiers et aux libertés et au RGPD, le
              Réparateur assure la mise en œuvre des droits des personnes
              concernées.
            </p>
            <p>
              Il est rappelé que le Client dont les données à caractère
              personnel sont traitées bénéficie des droits d'accès, de
              rectification, de mise à jour, de portabilité et d'effacement des
              informations qui le concernent, ainsi qu'un droit à la limitation
              du traitement conformément aux articles 49,50,51,53 et 55 de la
              Loi Informatique et Libertés et aux dispositions des articles 15,
              16, 17 et 18 du RGPD.
            </p>
            <p>
              Conformément aux dispositions de l'article 56 de la Loi
              Informatique et Libertés et à l'article 21 du RGPD, le Client peut
              également, pour des motifs légitimes, s'opposer au traitement des
              données le concernant, sans motif et sans frais.{" "}
            </p>
            <p>
              Le Client peut également définir le sort de ses données après sa
              mort et choisir que le Réparateur communique ou non ses données à
              un tiers que le Client aura préalablement désigné.
            </p>
            <p>
              Le Client peut exercer l'ensemble de ces droits en adressant un
              courrier électronique à{" "}
              <a href="mailto:donneespersonnelles@fingz.fr" target="_blank">
                donneespersonnelles@fingz.fr
              </a>{" "}
              ou en envoyant un message ou courrier au Réparateur.
            </p>
            <p>
              Enfin, le Client peut également introduire une réclamation auprès
              des autorités de contrôle et notamment de la CNIL (
              <a href="https://www.cnil.fr/fr/plaintes" target="_blank">
                https://www.cnil.fr/fr/plaintes
              </a>
              ).
            </p>
            <p>
              L'ensemble de la politique liée aux traitements de données
              personnelles mis en œuvre par l'Opérateur est détaillée au sein de
              la Politique de Confidentialité de la Plateforme.
            </p>

            <h2>13. RÉCLAMATIONS</h2>
            <p>
              Tout Client aura la possibilité de formuler une réclamation
              concernant une Commande de Prestations auprès du Réparateur.
            </p>
            <p>
              Le Client pourra contacter le Réparateur par l'intermédiaire de la
              messagerie disponible sur la Plateforme, notamment dans les cas
              suivants :
            </p>
            <ul>
              <li>Qualité de la Prestation non satisfaisante ; </li>
              <li>
                Périmètre ou modalités d'exécution de la Prestation non
                respectées ;{" "}
              </li>
              <li>
                Annulation d'une Prestation par un Réparateur ne respectant pas
                les modalités d'annulation prévues au sein des CGU.
              </li>
            </ul>
            <p>
              Tout litige en lien avec la Commande de Prestations sera
              directement réglé entre le Client et le Réparateur, seules Parties
              aux présentes Conditions Commerciales (sauf dans les cas où
              l'Opérateur agit en tant que Réparateur sur la Plateforme).
            </p>
            <p>
              Le Réparateur et/ou le Client pourra néanmoins solliciter de
              l'Opérateur qu'il intervienne en tant que médiateur entre eux, à
              partir de leur interface respective.
            </p>

            <h2>14. PROPRIÉTÉ INTELLECTUELLE</h2>
            <p>
              Tous les Contenus publiés sur sa Vitrine sont la propriété du
              Réparateur, ou sont des Contenus sur lesquels il dispose d'une
              licence d'utilisation.
            </p>
            <p>
              Toute représentation ou reproduction, totale ou partielle, des
              Contenus, par quel que procédé que ce soit, sans l'autorisation
              préalable expresse du Réparateur, est interdite et constituera une
              contrefaçon sanctionnée par les dispositions du Code de la
              Propriété Intellectuelle.
            </p>
            <p>
              L'acceptation des présentes Conditions Commerciales de la
              Plateforme vaut reconnaissance par le Client des droits de
              propriété intellectuelle du Réparateur et engagement à les
              respecter.
            </p>

            <h2>15. VALIDITÉ DES CONDITIONS COMMERCIALES</h2>
            <p>
              Toute modification de la législation ou de la réglementation en
              vigueur, ou toute décision d'un tribunal compétent invalidant une
              ou plusieurs clauses des présentes Conditions Commerciales de la
              Plateforme ne saurait affecter la validité du présent Contrat. Une
              telle modification ou décision n'autorise en aucun cas les Clients
              à méconnaître les présentes Conditions Commerciales de la
              Plateforme.
            </p>

            <h2>16. MODIFICATION DES CONDITIONS COMMERCIALES</h2>
            <p>
              Les présentes Conditions Commerciales de la Plateforme sont datées
              de manière précise et pourront être modifiées et mises à jour à
              tout moment. Il est toutefois précisé que les Conditions
              Commerciales de la Plateforme applicables sont celles en vigueur
              au moment de la Commande. Ainsi, les modifications apportées aux
              Conditions Commerciales de la Plateforme ne s'appliqueront pas aux
              Prestations déjà Commandées.
            </p>

            <h2>17. ATTRIBUTION DE COMPETENCE ET DROIT APPLICABLE</h2>
            <p>
              LES PRÉSENTES CONDITIONS COMMERCIALES AINSI QUE LES RELATIONS
              ENTRE LE CLIENT ET LE RÉPARATEUR SONT RÉGIES PAR LE DROIT
              FRANÇAIS.
            </p>
            <p>
              Toutefois, préalablement à tout recours au juge arbitral ou
              étatique, le Client est invité à contacter le Réparateur.
              L'Opérateur peut également servir d'intermédiaire entre les
              Parties.
            </p>
            <p>
              Si aucun accord n'est trouvé ou si le Client justifie avoir tenté,
              au préalable, de résoudre son litige directement auprès du
              Réparateur par une réclamation écrite, il sera alors proposé une
              procédure de médiation facultative, menée dans un esprit de
              loyauté et de bonne foi en vue de parvenir à un accord amiable
              lors de la survenance de tout conflit relatif au présent contrat,
              y compris portant sur sa validité.
            </p>
            <p>
              Pour enclencher cette médiation, le Client peut contacter le
              médiateur de la consommation de l'Opérateur : Vivons mieux
              ensemble, dont les coordonnées sont : Médiation - vivons mieux
              ensemble, 465 avenue de la Libération, 54000 NANCY et qui peut
              être saisi via ce lien :
              https://www.mediation-vivons-mieux-ensemble.fr
            </p>
            <p>
              A DEFAUT D'ACCORD AMIABLE DANS UN DELAI D'UN (1) MOIS A COMPTER DE
              LA SAISINE DE L'UNE DES PARTIES, LE LITIGE POURRA ETRE SOUMIS AUX
              TRIBUNAUX COMPETANTS.
            </p>

            <h2>ANNEXE 1 - POLITIQUE DE RETRACTATION</h2>
            <div className="cadre-black"
              style={{
                border: "1px solid black",
                padding: "20px 24px",
                backgroundColor: "#f6f6f6",
                marginBottom: "30px"
              }}
            >
              <p>
                Tout Réparateur référencé sur la Plateforme propose à tout
                Client un droit de rétractation de quatorze (14) jours dont les
                modalités sont détaillées ci-dessous.
              </p>
            </div>

            <h3>Principe de rétractation</h3>
            <p>
              Tout Client dispose par principe du droit de se rétracter en
              informant le Réparateur et l'Opérateur de son intention de
              renoncer à l'exécution de la Prestation, sans donner de motif. Les
              exceptions légales au droit de rétraction sont rappelées à la fin
              de ce document.
            </p>

            <h3>Délai de rétractation</h3>
            <p>
              Le délai de rétractation expire quatorze (14) jours après la
              conclusion du Contrat de Prestations.
            </p>

            <h3>Notification du droit de rétractation</h3>
            <p>
              Pour exercer son droit de rétractation et conformément à l'article
              L.221-21 du Code de la consommation, le Client doit notifier sa
              décision de se rétracter au moyen d'une déclaration dénuée
              d'ambiguïté, via son Espace Client, au Réparateur.{" "}
            </p>
            <p>Il peut également utiliser le formulaire ci-dessous : </p>

            <div className="cadre-black"
              style={{
                border: "1px solid black",
                padding: "20px 24px",
                backgroundColor: "#f6f6f6",
                marginBottom: "30px"
              }}
            >
              <p>
                <strong>FORMULAIRE DE RETRACTATION</strong>
              </p>
              <p>À l'attention de [Nom du Réparateur]</p>
              <p>
                Je vous notifie par la présente ma rétractation du contrat
                portant sur la fourniture de la Prestation ci-dessous :
              </p>
              <p>- Référence de la Prestation : ____________</p>
              <p>- Nature de la Prestation : ____________</p>
              <p>
                - Commandée le [____________] / date d'exécution prévue pour le
                [________________]
              </p>
              <p>- Moyen de paiement utilisé :</p>
              <p>
                - Nom du Client et le cas échéant du bénéficiaire de la commande
                :
              </p>
              <p>
                - Signature du Client (sauf cas de transmission par courriel)
              </p>
              <p>- Date</p>
            </div>

            <p>
              Pour que le délai de rétractation soit respecté, le Client doit
              transmettre sa communication relative à l'exercice du droit de
              rétractation avant l'expiration du délai de rétractation au
              Réparateur et à l'Opérateur en annulant sa Commande depuis son
              Espace Client.
            </p>

            <h3>Effets de la rétractation</h3>
            <p>
              En cas de rétractation de la part du Client, l'Opérateur s'engage
              à restituer la totalité des sommes versées au titre de l'exécution
              de la Prestation, à compter de la date à laquelle il est informé
              de la décision du Client de se rétracter.
            </p>
            <p>
              Le Réparateur et/ou l'Opérateur procédera au remboursement en
              utilisant le même moyen de paiement que celui que le Client aura
              utilisé pour la transaction initiale, sauf accord exprès du Client
              pour qu'il utilise un autre moyen de paiement et dans la mesure où
              le remboursement n'occasionnera pas de frais pour le Client.
            </p>

            <h3>Exclusions du droit de rétractation</h3>
            <p>
              Le droit de rétractation ne peut être exercé pour les contrats :
            </p>
            <ul>
              <li>
                De fourniture de services pleinement exécutés avant la fin du
                délai de rétractation et dont l'exécution a commencé après
                accord préalable exprès du consommateur et renoncement exprès à
                son droit de rétractation ;
              </li>
              <li>
                De fourniture de biens ou de services dont le prix dépend de
                fluctuations sur le marché financier échappant au contrôle du
                professionnel et susceptibles de se produire pendant le délai de
                rétractation ;
              </li>
              <li>
                De fourniture de biens confectionnés selon les spécifications du
                consommateur ou nettement personnalisés ;
              </li>
              <li>
                De fourniture de biens susceptibles de se détériorer ou de se
                périmer rapidement ;
              </li>
              <li>
                De fourniture de biens qui ont été descellés par le consommateur
                après la livraison et qui ne peuvent être renvoyés pour des
                raisons d'hygiène ou de protection de la santé ;
              </li>
              <li>
                De fourniture de biens qui, après avoir été livrés et de par
                leur nature, sont mélangés de manière indissociable avec
                d'autres articles ;
              </li>
              <li>
                De fourniture de boissons alcoolisées dont la livraison est
                différée au-delà de trente jours et dont la valeur convenue à la
                conclusion du contrat dépend de fluctuations sur le marché
                échappant au contrôle du professionnel ;
              </li>
              <li>
                De travaux d'entretien ou de réparation à réaliser en urgence au
                domicile du consommateur et expressément sollicités par lui,
                dans la limite des pièces de rechange et travaux strictement
                nécessaires pour répondre à l'urgence ;
              </li>
              <li>
                De fourniture d'enregistrements audio ou vidéo ou de logiciels
                informatiques lorsqu'ils ont été descellés par le consommateur
                après la livraison ;
              </li>
              <li>
                De fourniture d'un journal, d'un périodique ou d'un magazine,
                sauf pour les contrats d'abonnement à ces publications ;
              </li>
              <li>Conclus lors d'une enchère publique ;</li>
              <li>
                De prestations de services d'hébergement, autres que
                d'hébergement résidentiel, de services de transport de biens, de
                locations de voitures, de restauration ou d'activités de loisirs
                qui doivent être fournis à une date ou à une période déterminée
                ;
              </li>
              <li>
                De fourniture d'un contenu numérique non fourni sur un support
                matériel dont l'exécution a commencé après accord préalable
                exprès du consommateur et renoncement exprès à son droit de
                rétractation.
              </li>
            </ul>
          </DefaultPage>
        </Container>
      </ContentPageStyle>
    </Base>
  );
}
