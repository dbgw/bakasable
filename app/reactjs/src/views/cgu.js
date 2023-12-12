import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContentPageStyle } from "../assets/styles/frontGlobalStyle";
import DefaultPage from "../components/defaultPage";
import HeaderDefaultPage from "../components/front/headerDefaultPage";
import Base from "../theme/front/base";
import ImageBanner from "../assets/images/image-slide.jpg";
import ROUTES from "../config/routes";

export default function CGU() {
  const dataCrumbs = [
    { name: "Accueil", path: "/" },
    {
      name: "Conditions générales d'utilisation",
      path: ROUTES.CGU.url,
    },
  ];
  return (
    <Base>
      <HeaderDefaultPage
        title="Conditions générales d'utilisation"
        image={ImageBanner}
      />
      <ContentPageStyle className="content-wysiwig">
        <Container>
          <DefaultPage bradcrumbPage={dataCrumbs}>
            <h2>PREAMBULE</h2>
            <p>
              La société FINGZ, société par actions simplifiée, immatriculée au
              Registre du Commerce et des Sociétés de Paris sous le numéro 889
              838 694, dont le siège social sis 19, rue Ravignan 75018 Paris
              (ci-après « FINGZ » ou « l'Opérateur ») édite et exploite la
              plateforme internet accessible à l'adresse suivante : www.fingz.fr
              (ci-après « la Plateforme »).
            </p>
            <p>
              La Plateforme propose un service d'intermédiation entre des
              artisans réparateurs (ci-après « les Réparateurs ») disposant de
              compétences spécifiques (ci-après «les Compétences ») et proposant
              la réalisation de prestations de services (ci-après « les
              Prestations »), et des particuliers (ci-après « les Clients »)
              souhaitant leur confier la réalisation de prestations de service
              déterminées (ci-après « les Missions »).
            </p>
            <p>
              Dans ce cadre, il est rappelé que FINGZ intervient en tant
              qu'Opérateur de la Plateforme, comme simple intermédiaire
              technique. Son rôle est limité à l'hébergement des Vitrines des
              Réparateurs sur la Plateforme et à la mise en relation de ces
              derniers avec les Clients.
            </p>
            <p
              style={{
                border: "2px solid red",
                padding: "10px",
                fontWeight: "600",
              }}
            >
              TOUTE UTILISATION EFFECTUEE A QUEL QUE TITRE QUE CE SOIT DE LA
              PLATEFORME IMPLIQUE OBLIGATOIREMENT L'ACCEPTATION SANS RESERVE,
              PAR L'UTILISATEUR, DES PRESENTES CONDITIONS GENERALES
              D'UTILISATION (CGU).
            </p>

            <h2>1. DEFINITIONS</h2>
            <p>
              Les termes, mentionnés ci-dessous, ont dans les présentes
              Conditions Générales d'Utilisation, la signification suivante :
            </p>

            <ul>
              <li>
                <strong>« Back-Office » </strong>: désigne l'interface
                permettant au Réparateur d'accéder à son espace personnel à
                partir duquel il pourra gérer son catalogue de Prestations, ses
                Commandes, le suivi de son activité et ses correspondances avec
                l'Opérateur ou les Clients.
              </li>
              <li>
                <strong>« Commande » </strong>: désigne la commande de
                Mission(s) ou d'un Devis payant réalisée par un Client auprès
                d'un Réparateur sur la Plateforme, une fois les détails de la
                Mission convenus et acceptés par les Parties.
              </li>
              <li>
                <strong>« Compétences » </strong>: désigne l'ensemble des
                domaines dans lesquels le Réparateur dispose d'un savoir-faire.
              </li>
              <li>
                <strong>« Conditions Commerciales de la Plateforme » </strong> :
                désigne les conditions commerciales harmonisant les pratiques
                commerciales des Réparateurs de la Plateforme, complétant le
                Contrat de Prestation dans l'hypothèse où les CGV du Réparateur
                seraient absentes, incomplètes ou non conformes.
              </li>
              <li>
                <strong>« Conditions Générales d'Utilisation »</strong> ou{" "}
                <strong>« CGU »</strong> ou <strong> « Contrat » </strong>{" "}
                :désigne les présentes conditions contractuelles mises à
                disposition sur la page d'accueil de la Plateforme, afin
                d'encadrer l'utilisation de celle-ci par tout Utilisateur.
              </li>
              <li>
                <strong>«Conditions Générales de Services »</strong> : désigne
                les conditions contractuelles encadrant la fourniture de
                Services de la Plateforme par l'Opérateur aux Réparateurs.
              </li>
              <li>
                <strong>« CGV du Réparateur »</strong> : désigne les CGV du
                Réparateur régissant la vente à distance des Prestations du
                Réparateur.
              </li>
              <li>
                <strong>« Contenus »</strong> : désigne l'ensemble des
                informations, textes, logos, marques, animations, dessins et
                modèles, photographies, données et de façon générale tous les
                éléments et contenus du Réparateur publié sur la Plateforme
                selon les modalités, la forme et les conditions qui lui sont
                proposées dans le cadre des Services.
              </li>
              <li>
                <strong>« Contrat de Prestation »</strong> : désigne le contrat
                conclu entre le Réparateur et le Client encadrant la réalisation
                des Prestations. Le Contrat de Prestation est composé : de la
                Fiche présentant la Prestation ou du Devis, des CGV du
                Réparateur et, le cas échéant, des Conditions Commerciales de la
                Plateforme.
              </li>
              <li>
                <strong>« Devis »</strong> : désigne la proposition de
                Prestation adressée par le Réparateur au Client en réponse à son
                Offre de Mission. Lorsque le Devis est accepté par le Client,
                celui-ci fait partie intégrante du Contrat de Prestation.
              </li>
              <li>
                <strong>« Espace Client »</strong> : désigne l'interface
                hébergée sur la Plateforme dans laquelle est regroupé l'ensemble
                des données fournies par le Client et lui permettant de gérer
                ses Commandes. L'accès à l'Espace Client se fait grâce aux
                Identifiants.
              </li>
              <li>
                <strong>Heures Ouvrées</strong> : désigne les heures de travail
                usuelles entendues comme toute heure travaillée du lundi au
                vendredi, entre 9h et 17h30.
              </li>
              <li>
                <strong>« Identifiants »</strong> : désigne l'adresse email du
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
                <strong>« Mission »</strong> : désigne la prestation de services
                confiée par le Client à un Réparateur.
              </li>
              <li>
                <strong>« Offre »</strong> : désigne l'offre de Mission formulée
                par un Client à destination d'un Réparateur par l'intermédiaire
                de la Plateforme.
              </li>
              <li>
                <strong>« Parties »</strong> : désigne ensemble l'Opérateur et
                l'Utilisateur.
              </li>
              <li>
                <strong>« Plateforme »</strong> : désigne la plateforme en ligne
                accessible à l'adresse suivante :{" "}
                <Link to={ROUTES.HOME.url}>www.fingz.fr</Link>. La Plateforme
                regroupe l'ensemble des pages web, Services et fonctionnalités
                proposés aux Utilisateurs.
              </li>
              <li>
                <strong>« Prestataire de Services de Paiement »</strong> ou{" "}
                <strong> « PSP »</strong> : désigne la société, détentrice d'un
                agrément bancaire, fournissant, par l'intermédiaire de
                l'Opérateur, des services de paiement aux Réparateurs afin de
                leur permettre d'encaisser les paiements des Clients. Le
                Prestataire de Services de Paiement de l'Opérateur est Stripe
                Payments Europe, Ltd., Société de droit irlandais, dont le siège
                social est situé à The One Building, 1, Lower Grand Canal
                Street, Dublin 2, Ireland ; habilitée à exercer son activité au
                sein de l'Espace Economique Européen, en qualité d'établissement
                de monnaie électronique agréé par la Banque Centrale d'Irlande
                sous le numéro C187865.
              </li>
              <li>
                <strong>« Prestations »</strong> : désigne les services proposés
                par le Réparateur aux Clients via la Plateforme.
              </li>
              <li>
                <strong>« Réparateur »</strong> : désigne un artisan, personne
                physique ou morale exerçant légalement son activité en tant
                qu'auto-entrepreneur, SARL, EURL, SAS, ou SASU, affiliée à une
                Chambre des Métiers et de l'Artisanat, justifiant d'un numéro de
                SIRET, d'une inscription au Répertoire des Métiers et ayant de
                préférence le label « Répar'acteur ».
              </li>
              <li>
                <strong>« Services »</strong> : désigne l'ensemble des services
                proposés par l'Opérateur aux Clients et aux Réparateurs par
                l'intermédiaire de la Plateforme.
              </li>
              <li>
                <strong>« Univers »</strong> : désigne les secteurs d'activité
                couverts par l'Opérateur.
              </li>
              <li>
                <strong>« Utilisateur »</strong> : désigne toute personne qui
                accède et navigue sur la Plateforme, qu'il soit Réparateur,
                Client, ou simple internaute.
              </li>
              <li>
                <strong>« Vitrine »</strong> : désigne la fiche de présentation
                du Réparateur détaillant l'ensemble de ses Univers de
                compétence, sa localisation, [ses disponibilités], les tarifs
                pratiqués, et les notes et avis obtenus par ce dernier.
              </li>
            </ul>

            <h2>2. ACCEPTATION DES CONDITIONS GENERALES D'UTILISATION</h2>

            <p>
              L'utilisation des fonctionnalités de la Plateforme et des Services
              implique l'acceptation des présentes CGU.
            </p>
            <p>
              Ainsi, l'Utilisateur s'engage à lire attentivement les présentes
              Conditions Générales d'Utilisation lors de l'accès à la Plateforme
              et est invité à les télécharger, les imprimer et à en conserver
              une copie.
            </p>
            <p>
              l est précisé que les présentes CGU sont référencées en bas de
              chaque page de la Plateforme au moyen d'un lien hypertexte et
              peuvent ainsi être consultées à tout moment.
            </p>

            <h2>3. SPECIFICATIONS TECHNIQUES </h2>
            <p>
              En utilisant la Plateforme, l'Utilisateur reconnaît disposer des
              moyens et compétences nécessaires à l'utilisation des
              fonctionnalités proposées sur la Plateforme.
            </p>
            <p>
              Les équipements nécessaires à l'accès et à l'utilisation de la
              Plateforme sont à la charge de l'Utilisateur, de même que les
              frais de télécommunications éventuellement induits par leur
              utilisation.
            </p>

            <h2>4. ROLE DE L'OPERATEUR </h2>
            <h3>
              4.1. Intervention de l'Opérateur en tant que simple intermédiaire
            </h3>
            <p>
              La Plateforme éditée par l'Opérateur consiste à mettre en
              relation, par voie électronique, les Réparateurs et les Clients en
              vue de la fourniture de Prestations.
            </p>

            <p>
              L'Opérateur n'exerce aucun contrôle sur l'exécution des Missions
              et n'intervient pas dans la transaction opérée entre le Client et
              le Réparateur, sauf dans l'hypothèse où l'Opérateur est mandaté
              par un Utilisateur dans le cadre d'un litige lié à une Mission.{" "}
            </p>
            <p>
              Le Contrat de Prestation est donc conclu exclusivement et
              directement entre le Client et le Réparateur, l'Opérateur
              intervenant comme simple intermédiaire technique.
            </p>
            <p>
              Les indications sur les tarifs et les descriptions des Prestations
              sont établies par les Réparateurs.{" "}
            </p>
            <p>
              L'Opérateur est rémunéré par le paiement d'un abonnement par les
              Réparateurs.
            </p>
            <p>
              Les présentes Conditions Générales d'Utilisation ne confèrent en
              aucun cas aux Utilisateurs la qualité de salarié, mandataire,
              agent ou représentant de l'Opérateur.
            </p>

            <h3>
              4.2. Obligation générale d'information précontractuelle : loyauté,
              clarté et transparence
            </h3>
            <h4>4.2.1.Dispositions générales</h4>
            <p>
              En tant qu'opérateur de plateforme en ligne, l'Opérateur agit de
              manière neutre, claire et transparente. L'Opérateur n'accorde
              aucun traitement différencié à aucun Utilisateur.
            </p>
            <p>
              L'Opérateur n'entretient aucun lien capitalistique ou de
              quelconque dépendance juridique avec un des Réparateurs référencés
              sur la Plateforme qui influencerait le classement ou le
              référencement du Réparateur.
            </p>
            <p>
              Les Réparateurs présentés aux Utilisateurs sur la Plateforme sont
              référencés par Univers et proximité géographique avec la
              localisation indiquée par l'Utilisateur, puis selon la proximité
              et la note attribuée par les Clients aux Réparateurs, selon les
              critères de pertinence par rapport à la recherche effectuée par le
              Client.
            </p>

            <h4>4.2.2. Transparence financière</h4>
            <p>
              Conformément à l'article 242 bis du code général des impôts,
              l'Opérateur s'engage à :
            </p>

            <ul>
              <li>
                A l'occasion de chaque transaction réalisée par son
                intermédiaire, communiquer aux Réparateurs les informations
                relatives aux régimes fiscaux et à la réglementation sociale
                applicables à ces sommes, aux obligations déclaratives et de
                paiement qui en résultent auprès de l'administration fiscale et
                des organismes de recouvrement des cotisations sociales ainsi
                qu'aux sanctions encourues en cas de manquement à ces
                obligations (cf. Annexe 1 : Informations en matière
                d'obligations civiles et fiscales) ;
              </li>
              <li>
                Délivrer aux Réparateurs en janvier de chaque année un document
                récapitulant le montant brut des transactions dont elle a eu
                connaissance et que les Réparateurs ont perçu, par son
                intermédiaire, au cours de l'année précédente.
              </li>
              <li>
                Transmettre à l'Administration fiscale avant le 31 janvier de
                l'année suivant celle au titre de laquelle les informations sont
                données, un récapitulatif reprenant les éléments transmis dans
                le document récapitulatif transmis à chaque Réparateur.
              </li>
            </ul>

            <h2>5. AVIS EN LIGNE </h2>
            <p>
              Dans un délai de 3 jours ouvrés suivant la validation de la
              réalisation de la Mission par le Réparateur, le Client recevra un
              courriel afin de s'exprimer sur son expérience.
            </p>
            <p>
              Les Clients pourront évaluer la prestation réalisée en attribuant
              une note via des étoiles « de 0 à 5 » la note maximale étant 5
              étoiles, et en laissant un commentaire sur leurs expériences
              d'achat.
            </p>
            <p>
              L'ensemble des Utilisateurs pourront ensuite accéder à ces avis
              directement sur la Vitrine du Réparateur concerné.{" "}
            </p>

            <h2>6. CONDITIONS D'ACCES ET D'INSCRIPTION </h2>
            <p>
              Tout Utilisateur peut accéder à la Plateforme, consulter les
              Prestations proposées et bénéficier des Services décrits aux
              présentes CGU.
            </p>
            <p>
              L'Utilisateur souhaitant devenir Client ou devenir Réparateur est
              invité à suivre les étapes décrites ci-après :{" "}
            </p>

            <h3>6.1. Inscription en tant que Réparateur</h3>
            <p>
              Pour être référencé en tant que Réparateur, l'Utilisateur
              professionnel répondant aux conditions ci-dessous devra contacter
              l'Opérateur en vue de solliciter son inscription sur la Plateforme
              en remplissant le formulaire d'inscription accessible via la page
              d'accueil de la Plateforme via l'onglet « Inscription ». Il lui
              appartiendra notamment de renseigner les Identifiants lui
              permettant d'accéder à son Back-Office.
            </p>
            <p>
              Les conditions requises pour s'inscrire en tant que Réparateur
              sont les suivantes :{" "}
            </p>

            <ul>
              <li>
                Être un artisan affilié à une Chambre des Métiers et de
                l'Artisanat ;{" "}
              </li>
              <li>
                Disposer d'une ou plusieurs Compétence(s) couvertes par les
                Univers référencés sur la Plateforme ;{" "}
              </li>
              <li>Disposer, par exemple, du label « Répar'acteur ». </li>
            </ul>
            <p>
              Au moment de son inscription, le Réparateur s'engage à également à
              signer et respecter les Conditions Générales de Services ainsi que
              la Charte d'engagement.
            </p>
            <p>
              L'inscription sur la Plateforme en tant que Réparateur est
              payante.{" "}
            </p>
            <p>
              Les conditions de gestion des Identifiants et de désinscription du
              Réparateur sont régies par les Conditions Générales de Service.
            </p>

            <h3>6.2. Inscription en tant que Client</h3>
            <p>
              Tout Utilisateur souhaitant avoir un accès à l'ensemble des
              fonctionnalités proposées par la Plateforme devra préalablement se
              créer un Espace Client pour devenir Client.
            </p>
            <p>
              L'inscription sur la Plateforme en tant que Client est gratuite.
            </p>
            <p>
              Pour créer un Espace Client, l'Utilisateur professionnel est
              invité à remplir le formulaire d'inscription accessible via la
              page d'accueil de la Plateforme via l'onglet « Inscription ».
            </p>
            <p>
              L'Utilisateur souhaitant devenir Client s'engage à fournir à
              l'Opérateur des données exactes, loyales et à jour, qui ne portent
              pas atteinte, à quelque titre que ce soit, aux droits des tiers et
              à communiquer à l'Opérateur toute mise à jour nécessaire des
              données communiquées lors de son inscription.
            </p>
            <p>
              Enfin, l'Utilisateur devra valider les présentes CGU avant de
              finaliser son inscription.
            </p>
            <p>
              L'adresse e-mail et le mot de passe constituent les Identifiants
              du Client.
            </p>
            <p>
              Le Client s'engage à ne créer qu'un seul et unique Espace Client
              sur la Plateforme. L'Opérateur décline toute responsabilité quant
              aux conséquences dommageables que pourrait avoir l'utilisation
              d'Espaces Clients multiples pour un seul Client.
            </p>
            <p>
              L'Utilisateur est entièrement responsable de l'exactitude et de la
              mise à jour des données communiquées dans le cadre de l'ouverture
              et de la gestion de son Espace Client.
            </p>

            <h4>6.2.1. Identifiants </h4>
            <p>
              Le Client sera seul responsable de l'utilisation de ses
              Identifiants ou des actions faites par l'intermédiaire de son
              Espace Client, quelle que soit les actions réalisées par
              l'intermédiaire des Identifiants.{" "}
            </p>
            <p>
              Dans le cas où un Client divulguerait ou utiliserait ses
              Identifiants de façon contraire à leur destination, l'Opérateur
              pourra alors supprimer l'Espace Client sans préavis ni indemnité.
            </p>
            <p>
              En aucun cas, l'Opérateur ne saurait être tenu responsable en cas
              d'usurpation de l'identité d'un Client. Tout accès et action
              effectués à partir de l'Espace Client d'un Client seront présumés
              être effectués par ce Client, dans la mesure où l'Opérateur n'a
              pas pour obligation et ne dispose pas des moyens techniques lui
              permettant de s'assurer de l'identité des personnes ayant accès à
              la Plateforme à partir d'un Espace Client.
            </p>
            <p>
              Toute perte, détournement, ou utilisation non autorisée des
              Identifiants d'un Client et leurs conséquences relèvent de la
              seule responsabilité de du Client, ce dernier étant tenu d'en
              avertir l'Opérateur, sans délai, par message électronique adressé
              à l'adresse suivante :{" "}
              <a href="mailto:contact.clients@fingz.fr" target="_blank">
                contact.clients@fingz.fr
              </a>
              .{" "}
            </p>

            <h4>6.2.2. Désinscription du Client</h4>
            <p>
              Le Client peut à tout moment fermer son Espace Client en adressant
              un courriel à l'adresse :{" "}
              <a href="mailto:contact.clients@fingz.fr" target="_blank">
                contact.clients@fingz.fr
              </a>{" "}
              ou en cliquant sur Contact.{" "}
            </p>
            <p>
              L'Opérateur procèdera dans les meilleurs délais à une
              désactivation de l'Espace Client et adressera au Client un
              courriel lui confirmant la clôture de son Compte et de la
              suppression définitive de l'ensemble de ses éléments sur la
              Plateforme.
            </p>

            <h2>7. SERVICES </h2>
            <h3>7.1. Services offerts à tout Utilisateur</h3>
            <p>
              Tout Utilisateur peut accéder gratuitement à la Plateforme, ainsi
              qu'à ses différentes fonctionnalités.
            </p>
            <p>
              Le principal Service proposé par l'Opérateur consiste à offrir à
              tout Utilisateur la possibilité de consulter les Prestations
              référencées par Univers en vue de contacter les Réparateurs
              inscrits sur la Plateforme pour la réalisation de ces Prestations.
            </p>

            <h4>7.1.1. Présentation des Prestations</h4>
            <p>
              L'Utilisateur pourra accéder à l'intégralité des Prestations
              proposées sur la Plateforme à l'aide d'un moteur de recherche.
            </p>

            <h4>7.1.2. Recherche d'une Prestation</h4>

            <p>
              L'Utilisateur pourra accéder à une liste des différentes
              Prestations après avoir sélectionné l'Univers concerné, sa
              localisation et facultativement un mot-clef.
            </p>
            <p>
              En cliquant sur la Prestation de son choix, l'Utilisateur pourra
              accéder à l'ensemble des Vitrines des Réparateurs proposant cette
              Prestation. Il pourra affiner sa recherche en filtrant sur des
              catégories et sous-catégories de Prestations.
            </p>
            <p>
              Les résultats correspondant à sa recherche seront présentés par
              défaut à l'Utilisateur selon un critère de pertinence déterminé
              comme suit : sont affichés en priorité les Réparateurs les plus
              proches de la localisation renseignée et les mieux notés.
            </p>

            <h3>7.2. Services proposés aux Clients </h3>
            <p>
              En se créant un Espace Client conformément aux présentes, tout
              Client pourra accéder aux fonctionnalités suivantes :{" "}
            </p>

            <h4>7.2.1. Commande de Mission</h4>
            <p>
              Tout Client aura la possibilité de passer une Commande de Missions
              à partir des Prestations proposées par les Réparateurs via la
              Plateforme.
            </p>
            <p>
              Toute Commande de Missions sera régie par les CGV du Réparateur,
              le cas échéant, complétées par les Conditions Commerciales
              disponibles sur la Plateforme. En cas de contradiction entre les
              CGV du Réparateur et les Conditions Commerciales, ces dernières
              s'appliquent en priorité.
            </p>
            <p>
              Les moyens de paiement proposés par l'intermédiaire de la
              Plateforme aux Clients sont fournis par le Prestataire de Services
              de Paiement.
            </p>

            <h4>7.2.2. Gestion des Offres de Missions et Missions en cours</h4>
            <p>
              En créant un Espace Client, le Client pourra suivre et gérer ses
              Offres et Commandes en cours, accéder à l'historique de l'ensemble
              des Missions réalisées pour son compte, et exercer son droit de
              rétractation lorsque celui-ci s'applique.
            </p>

            <h3>7.3. Services proposés aux Réparateurs</h3>
            <p>
              L'Opérateur propose aux Utilisateurs de devenir Réparateurs sur la
              Plateforme afin de pouvoir bénéficier de certains Services
              détaillés au sein des Conditions Générales de Services, et
              notamment de pouvoir être mis en relation avec des Clients pour
              leur proposer ses Prestations.
            </p>
            <p>
              Pour cela, les Réparateurs potentiels sont invités à suivre les
              étapes décrites ci-dessus à l'article 6.1 « Inscription en tant
              que Réparateur ».
            </p>

            <h2>8. OBLIGATION DES PARTIES</h2>
            <h3>8.1. Obligations des Utilisateurs</h3>
            <p>
              Dans le cadre de l'utilisation de la Plateforme, chaque
              Utilisateur s'engage à ne pas porter atteinte à l'ordre public et
              à se conformer aux lois et règlements en vigueur, à respecter les
              droits des tiers et les dispositions des présentes Conditions
              Générales d'Utilisation.
            </p>
            <p>Chaque Utilisateur a pour obligation de :</p>
            <ul>
              <li>
                Se comporter de façon loyale et en personne prudente et
                raisonnable à l'égard de l'Opérateur et des tiers ;
              </li>
              <li>
                Être honnête et sincère dans les informations fournies à
                l'Opérateur et, le cas échéant aux tiers Utilisateurs ;
              </li>
              <li>
                Utiliser la Plateforme conformément à son objet tel que décrit
                dans les présentes CGU ;
              </li>
              <li>
                Ne pas détourner la finalité de la Plateforme pour commettre des
                crimes, délits ou contraventions réprimés par le code pénal ou
                par toute autre loi ;
              </li>
              <li>
                Respecter la vie privée des tiers et la confidentialité des
                échanges ;
              </li>
              <li>
                Respecter les droits de propriété intellectuelle de l'Opérateur
                portant sur les éléments de la Plateforme et le cas échéant, les
                droits de propriété intellectuelle des autres Utilisateurs ;
              </li>
              <li>
                Ne pas chercher à porter atteinte au sens des articles 323-1 et
                suivants du code pénal aux systèmes de traitements automatisés
                de données mis en œuvre sur la Plateforme ;
              </li>
              <li>
                Ne pas modifier les informations mises en ligne par l'Opérateur
                ou par un autre Utilisateur ;
              </li>
              <li>
                Ne pas utiliser la Plateforme pour envoyer massivement des
                messages non sollicités (publicitaires ou autres) ;
              </li>
              <li>
                Ne pas diffuser des données ayant pour effet de diminuer, de
                désorganiser, de ralentir ou d'interrompre le fonctionnement
                normal de la Plateforme.
              </li>
            </ul>
            <p>
              Dans le respect des dispositions légales et réglementaires en
              vigueur et conformément à la loi du 29 juillet 1881 relative à la
              liberté de la presse, l'Utilisateur s'engage à ne pas diffuser de
              message ou information :
            </p>
            <ul>
              <li>
                Constitutifs de dénigrement fautif visant l'Opérateur ou les
                Utilisateurs de la Plateforme ;
              </li>
              <li>Contraires à l'ordre public et aux bonnes mœurs ; </li>
              <li>
                À caractère injurieux, diffamatoire, raciste, xénophobe,
                révisionniste ou portant atteinte à l'honneur ou à la réputation
                d'autrui ;
              </li>
              <li>
                Incitant à la discrimination, à la haine d'une personne ou d'un
                groupe de personnes à raison de leur origine ou de leur
                appartenance ou de leur non-appartenance à une ethnie, une
                nation, une race ou une religion déterminée ;
              </li>
              <li>Menaçant une personne ou un groupe de personnes ;</li>
              <li>À caractère pédophile ;</li>
              <li>
                Incitant à commettre un délit, un crime ou un acte de terrorisme
                ou faisant l'apologie des crimes de guerre ou des crimes contre
                l'humanité ;
              </li>
              <li>Incitant au suicide ;</li>
              <li>
                Permettant à des tiers de se procurer directement ou
                indirectement des logiciels piratés, des numéros de série de
                logiciels, des logiciels permettant des actes de piratage et
                d'intrusion dans les systèmes informatiques et de
                télécommunications, des virus et autres bombes logiques et d'une
                manière générale tout outil logiciel ou autre permettant de
                porter atteinte aux droits d'autrui et à la sécurité des
                personnes et des biens ;
              </li>
              <li>
                À caractère commercial (prospection, racolage, prostitution...).
              </li>
            </ul>
            <h3>8.2. Obligations de l'Opérateur</h3>
            <p>
              L'obligation générale de l'Opérateur est une obligation de moyens.
              Il ne pèse sur l'Opérateur aucune obligation de résultat ou de
              moyens renforcée d'aucune sorte.{" "}
            </p>
            <p>
              L'Opérateur s'engage à mettre tous les moyens en œuvre pour
              assurer une continuité d'accès et d'utilisation de la Plateforme 7
              jours sur 7 et 24 heures sur 24.
            </p>
            <p>
              L'Opérateur attire toutefois l'attention des Utilisateurs sur le
              fait que les protocoles actuels de communication via Internet ne
              permettent pas d'assurer de manière certaine et continue la
              transmission des échanges électroniques (messages, documents,
              identité de l'émetteur ou du destinataire).
            </p>
            <p>
              Par ailleurs, conformément aux dispositions des articles L.111-7
              et suivants du code de la consommation, en tant qu'opérateur de
              plateforme en ligne, l'Opérateur s'engage à apporter une
              information claire transparente et loyale sur les modalités de son
              intervention, notamment au sein de l'article 5.2. des présentes.
            </p>

            <h2>9. RESPONSABILITE </h2>
            <h3>9.1. Principes généraux</h3>
            <p>L'Opérateur décline toute responsabilité notamment :</p>
            <ul>
              <li>
                En cas d'impossibilité d'accéder temporairement à la Plateforme
                pour des opérations de maintenance technique ou d'actualisation
                des informations publiées. Les Utilisateurs reconnaissent que la
                responsabilité de l'Opérateur ne saurait être engagée en cas de
                dysfonctionnements ou d'interruptions desdits réseaux de
                transmission ;
              </li>
              <li>
                En cas d'attaques virales, intrusion illicite dans un système de
                traitement automatisé de données ;
              </li>
              <li>
                En cas d'utilisation anormale ou d'une exploitation illicite de
                la Plateforme par un Utilisateur ou un tiers ;
              </li>
              <li>
                Relativement au contenu des sites internet tiers vers lesquels
                renvoient des liens hypertextes présents sur la Plateforme ;
              </li>
              <li>
                En cas de non-respect des présentes CGU imputable aux
                Utilisateurs ;
              </li>
              <li>
                En cas de retard ou d'inexécution de ses obligations, lorsque la
                cause du retard ou de l'inexécution est liée à un cas de force
                majeure telle qu'elle est définie à l'article 11 des présentes
                CGU ;
              </li>
              <li>En cas de cause étrangère non imputable à l'Opérateur ;</li>
              <li>
                En cas d'agissement illicite d'un Réparateur ou d'un Client, ou
                d'inexécution contractuelle dont un Réparateur ou un Client se
                serait rendu coupable ;
              </li>
              <li>
                De tout problème rencontré lors de l'exécution de la Commande
                par le Réparateur.
              </li>
            </ul>
            <p>
              En cas d'utilisation anormale ou d'une exploitation illicite de la
              Plateforme, l'Utilisateur est alors seul responsable des dommages
              causés aux tiers et des conséquences des réclamations ou actions
              qui pourraient en découler.
            </p>

            <h3>9.2. Statut d'hébergeur</h3>
            <p>
              Les Utilisateurs reconnaissent que l'Opérateur a la qualité
              d'hébergeur au sens de l'article 6 I 2° de la loi du 21 juin 2004
              pour la confiance dans l'économie numérique dite LCEN.
            </p>
            <p>
              A ce titre, l'Opérateur se réserve la possibilité de retirer tout
              contenu qui lui aura été signalé et qu'elle considèrera comme
              manifestement illicite au sens de l'article 6 I 2° de la LCEN.
            </p>
            <p>
              La notification des contenus manifestement illicites par un
              Utilisateur ou tout autre tiers doit se faire par courrier
              électronique à l'adresse :{" "}
              <a href="mailto:reclamations@fingz.fr" target="_blank">
                reclamations@fingz.fr
              </a>{" "}
              ou par courrier en recommandé avec avis de réception à : FINGZ 27
              rue du chemin vert 75011 Paris.
            </p>
            <p>
              Conformément à l'article 6 I 5° de la LCEN, la notification, pour
              être valide, doit reprendre les éléments suivants :{" "}
            </p>
            <ul>
              <li>La date de la notification ;</li>
              <li>
                Si le notifiant est une personne physique : ses nom, prénoms,
                profession, domicile, nationalité, date et lieu de naissance ;
                si le requérant est une personne morale : sa forme, sa
                dénomination, son siège social et l'organe qui la représente
                légalement ;
              </li>
              <li>
                Le nom et le domicile du destinataire ou, s'il s'agit d'une
                personne morale, sa dénomination et son siège social ;
              </li>
              <li>
                La description des faits litigieux et leur localisation précise
                ;
              </li>
              <li>
                Les motifs pour lesquels le contenu doit être retiré, comprenant
                la mention des dispositions légales et des justifications de
                faits ;
              </li>
              <li>
                La copie de la correspondance adressée à l'auteur ou à l'éditeur
                des informations ou activités litigieuses demandant leur
                interruption, leur retrait ou leur modification, ou la
                justification de ce que l'auteur ou l'éditeur n'a pu être
                contacté.{" "}
              </li>
            </ul>
            <h3>9.3. Litiges entre Clients et Réparateurs</h3>
            <p>
              Le Réparateur, en utilisant la Plateforme pour fournir ses
              Prestations, reconnaît qu'il engage également l'image de marque de
              FINGZ. Le Réparateur reconnaît donc que ses agissements, qui ne
              respecteraient pas l'ensemble des obligations stipulées au présent
              Contrat, peuvent avoir un effet préjudiciable pour FINGZ.{" "}
            </p>
            <p>
              Le Client et le Réparateur ont accès à une messagerie interne pour
              échanger entre eux afin de résoudre le litige les opposant sans
              passer par FINGZ.
            </p>
            <p>
              En tout état de cause, le Réparateur s'engage à répondre à cette
              réclamation dans un délai de quarante-huit (48) Heures Ouvrées
              suivant la notification de la réclamation par l'Opérateur.
            </p>
            <p>
              Le Réparateur fera alors son affaire personnelle de la résolution
              du différend. Soucieuse de l'image de la Plateforme, FINGZ invite
              toutefois le Réparateur à faire ses meilleurs efforts pour
              résoudre amiablement tout litige l'opposant au Client.
            </p>
            <p>
              Dans l'éventualité où le Client et le Réparateur ne parviendraient
              pas à un accord dans le délai de 5 Jours Ouvrés, le Réparateur ou
              le Client pourra contacter FINGZ à l'adresse mail suivante :{" "}
              <a href="mailto:reclamations@fingz.fr" target="_blank">
                reclamations@fingz.fr
              </a>{" "}
              afin de mandater cette dernière en tant que médiateur. FINGZ
              interviendra alors entre le Client et le Réparateur afin de tenter
              de proposer une solution aux parties.
            </p>
            <p>
              Tout Client dispose de la possibilité de saisir FINGZ concernant
              les Missions commandées, notamment dans les cas suivants :
            </p>
            <ul>
              <li>Qualité de la Prestation non satisfaisante ;</li>
              <li>
                Périmètre ou modalités d'exécution de la Mission non respectées
                ;
              </li>
              <li>
                Annulation d'une Mission par un Réparateur ne respectant pas les
                modalités d'annulation prévues au sein des CGU.{" "}
              </li>
            </ul>
            <p>
              Le Réparateur a également la possibilité de saisir FINGZ en cas de
              litige avec le Client notamment dans les cas suivants :
            </p>
            <ul>
              <li>
                Annulation d'une Mission par le Client ne respectant pas les
                modalités d'annulation prévues au sein des CGU ;
              </li>
              <li>Non-respect par le Client des CGU. </li>
            </ul>

            <h2>10. FORCE MAJEURE</h2>
            <p>
              La responsabilité de l'Opérateur ne pourra pas être mise en œuvre
              si la non-exécution ou le retard dans l'exécution de l'une de ses
              obligations décrites dans les présentes CGU découle d'un cas de
              force majeure.
            </p>
            <p>
              Il y a force majeure en matière contractuelle lorsqu'un évènement
              échappant au contrôle du débiteur, qui ne pouvait être
              raisonnablement prévu lors de la conclusion du Contrat et dont les
              effets ne peuvent être évités par des mesures appropriées, empêche
              l'exécution de son obligation par le débiteur.
            </p>
            <p>
              Si l'empêchement est temporaire, l'exécution de l'obligation est
              suspendue à moins que le retard qui en résulterait ne justifie la
              résolution du Contrat. Si l'empêchement est définitif, le Contrat
              est résolu de plein droit et les Parties sont libérées de leurs
              obligations dans les conditions prévues aux articles 1351 et
              1351-1 du code civil.
            </p>
            <p>
              En cas de survenance d'un des évènements susvisés, l'Opérateur
              s'efforcera d'informer l'Utilisateur dès que possible.
            </p>

            <h2>11. PROPRIETE INTELLECTUELLE</h2>
            <h3>
              11.1.Titularité des droits de propriété intellectuelle des
              Réparateurs
            </h3>
            <p>
              Dans le cadre de la présentation de leurs Prestations via la
              Plateforme, les Réparateurs sont susceptibles de présenter des
              photographies, marques, logos, dessins et autres modèles leur
              appartenant ou appartenant à des tiers.
            </p>
            <p>
              Tout Réparateur proposant des Prestations par l'intermédiaire de
              la Plateforme garantit qu'il a le droit de faire une
              représentation de tous les éléments incorporels présentés dans les
              Contenus.{" "}
            </p>
            <p>
              En tout état de cause, à l'exception des cas où il est Réparateur,
              l'Opérateur ne saurait être tenu responsable d'un acte de
              contrefaçon, compte tenu de sa simple qualité d'hébergeur des
              Contenus publiés par les Réparateurs.
            </p>

            <h3>
              11.2.Titularité des droits de propriété intellectuelle de
              l'Opérateur
            </h3>
            <p>
              L'Utilisateur reconnaît les droits de propriété intellectuelle de
              l'Opérateur sur la Plateforme, ses composantes et les contenus y
              afférent et renonce à contester ces droits sous quelle que forme
              que ce soit.
            </p>
            <p>
              Les marques, logos, slogans, graphismes, photographies,
              animations, vidéos, solutions logicielles et textes et tout autre
              contenu sur la Plateforme, à l'exception des Contenus publiés par
              les autres Réparateurs, sont la propriété intellectuelle exclusive
              de l'Opérateur et ne peuvent être reproduits, utilisés ou
              représentés sans autorisation expresse sous peine de poursuites
              judiciaires.
            </p>
            <p>
              Toute représentation ou reproduction, totale ou partielle, de la
              Plateforme et de son contenu, par quel que procédé que ce soit,
              sans l'autorisation préalable expresse de l'Opérateur, est
              interdite et constituera une contrefaçon sanctionnée par les
              articles L.335-2 et suivants et les articles L.713-1 et suivants
              du code de la propriété intellectuelle.
            </p>
            <p>
              En particulier, l'Opérateur interdit expressément en tant que
              producteur de base de données :
            </p>

            <ul>
              <li>
                L'extraction, par transfert permanent ou temporaire de la
                totalité ou d'une partie qualitativement ou quantitativement
                substantielle du contenu de sa base de données sur un autre
                support, par tout moyen et sous quelque forme que ce soit ;
              </li>
              <li>
                La réutilisation, par la mise à la disposition du public de la
                totalité ou d'une partie qualitativement ou quantitativement
                substantielle du contenu de la base, quelle qu'en soit la forme
                ;
              </li>
              <li>
                La reproduction, l'extraction ou la réutilisation, par tout
                moyen, y compris les méthodes assimilables au scrapping des
                contenus (photographies, description etc...) publiés par
                l'Opérateur.
              </li>
            </ul>

            <p>
              L'acceptation des présentes CGU vaut reconnaissance par les
              Utilisateurs des droits de propriété intellectuelle de l'Opérateur
              et engagement à les respecter.
            </p>
            <p>
              L'Opérateur accorde une licence personnelle, non-exclusive et non
              cessible aux Utilisateurs les autorisant à utiliser la Plateforme
              et les informations qu'elle contient conformément aux présentes
              CGU.
            </p>
            <p>
              Toute autre exploitation de la Plateforme et de son contenu est
              exclue du domaine de la présente licence et ne pourra être
              effectuée sans l'autorisation préalable expresse de l'Opérateur.
            </p>

            <h2>12. PROTECTION DES DONNEES A CARACTERE PERSONNEL </h2>

            <p>
              L'ensemble de la politique liée aux traitements de données
              personnelles mis en œuvre par l'Opérateur est détaillé dans la
              Politique de Confidentialité de la Plateforme, disponible ici :{" "}
              <Link to={ROUTES.POLITIQUE_CONFIDENTIALITE.url} target="_blank">
                Politique de confidentialité
              </Link>
            </p>
            <p>
              Concernant les cookies utilisés sur la Plateforme, l'Utilisateur
              est invité à consulter la Charte Cookies de l'Opérateur accessible
              à l'adresse{" "}
              <Link to={ROUTES.CHARTE_COOKIES.url} target="_blank">
                Charte de getion des Cookies
              </Link>
            </p>

            <h2>13. SERVICE CLIENT</h2>
            <p>
              Toute question ou réclamation concernant l'utilisation ou le
              fonctionnement de la Plateforme peut être formulée selon les
              modalités suivantes :
            </p>

            <ul>
              <li>
                Par courrier électronique à l'adresse suivante :{" "}
                <a href="mailto:donneespersonnelles@fingz.fr" target="_blank">
                  donneespersonnelles@fingz.fr
                </a>{" "}
                ;
              </li>
              <li>Par courrier à FINGZ 27 rue du chemin vert 75011 Paris ;</li>
              <li>
                Par téléphone au{" "}
                <a href="tel:0970704779" target="_blank">
                  09 70 70 47 79
                </a>{" "}
                (numéro non surtaxé) aux Heures Ouvrées ;
              </li>
            </ul>

            <h2>14. VALIDITE DES CGU </h2>
            <p>
              Si l'une quelconque des stipulations des présentes CGU venait à
              être déclarée nulle au regard d'une disposition législative ou
              réglementaire en vigueur et/ou d'une décision de justice ayant
              autorité de la chose jugée, elle sera réputée non écrite mais
              n'affectera en rien la validité des autres clauses qui demeureront
              pleinement applicables.
            </p>
            <p>
              Une telle modification ou décision n'autorise en aucun cas les
              Utilisateurs à méconnaître les présentes Conditions Générales
              d'Utilisation.
            </p>

            <h2>15. MODIFICATION DES CGU</h2>
            <p>
              Les présentes CGU s'appliquent à tout Utilisateur navigant sur la
              Plateforme.{" "}
            </p>
            <p>
              Les CGU pourront être modifiées et mises à jour par l'Opérateur à
              tout moment, notamment pour s'adapter à l'évolution législative ou
              réglementaire.
            </p>
            <p>
              Les Utilisateurs seront notifiés de toute modification des
              présentes Conditions Générales d'Utilisation.
            </p>
            <p>
              Les CGU applicables sont celles en vigueur au moment de la
              navigation sur la Plateforme.
            </p>

            <h2>16. DISPOSITIONS GENERALES </h2>
            <p>
              Le fait que l'une des Parties n'ait pas exigé l'application d'une
              clause quelconque des présentes CGU, que ce soit de façon
              permanente ou temporaire, ne pourra en aucun cas être considéré
              comme une renonciation à ladite clause.
            </p>
            <p>
              En cas de difficulté d'interprétation entre l'un quelconque des
              titres figurant en tête des clauses, et l'une quelconque de
              celles-ci, les titres seront déclarés inexistants.
            </p>

            <h2>17. COMPETENCE ET DROIT APPLICABLE</h2>
            <p>
              LES PRESENTES CGU AINSI QUE LES RELATIONS ENTRE L'UTILISATEUR ET
              L'OPERATEUR SONT REGIES PAR LE DROIT FRANÇAIS.
            </p>
            <p>
              En cas de différend survenant entre l'Opérateur et un Utilisateur
              au sujet de l'interprétation, de l'exécution ou de la résiliation
              des présentes, les Parties s'efforceront de le régler à l'amiable.
            </p>
            <p>
              Dans un tel cas de figure, l'Utilisateur est tout d'abord invité à
              contacter le service de médiation de l'Opérateur à l'adresse
              suivante :{" "}
              <a href="mailto:reclamations@fingz.fr" target="_blank">
                reclamations@fingz.f
              </a>
              r.
            </p>
            <p>
              Si aucun accord n'est trouvé, il sera alors proposé une procédure
              de médiation facultative, menée dans un esprit de loyauté et de
              bonne foi en vue de parvenir à un accord amiable lors de la
              survenance de tout conflit relatif au présent contrat, y compris
              portant sur sa validité.
            </p>
            <p>
              En application de l'article L. 616-1 du Code de la consommation,
              l'Opérateur communique au consommateur les coordonnées du
              médiateur de la consommation dont il relève. L'Utilisateur peut
              ainsi contacter :
            </p>
            <p>
              Centre de la Médiation de la Consommation de Conciliateurs de
              Justice, 14 rue Saint Jean 75017 Paris, qui peut être saisi via ce
              lien :
              <a href="https://www.cm2c.net/" target="_blank">
                https://www.cm2c.net/
              </a>
            </p>
            <p>
              La partie souhaitant mettre en œuvre le processus de médiation
              devra préalablement en informer l'autre partie par lettre
              recommandée avec accusé de réception en indiquant les éléments du
              conflit.{" "}
            </p>
            <p>
              La médiation ne présentant pas un caractère obligatoire,
              l'Utilisateur consommateur ou l'Opérateur peut à tout moment se
              retirer du processus.
            </p>
            <p>
              DANS L'HYPOTHÈSE OÙ LA MÉDIATION ÉCHOUERAIT OU NE SERAIT PAS
              ENVISAGÉE, LE LITIGE AYANT PU DONNER LIEU À UNE MÉDIATION SERA
              CONFIÉ AU TRIBUNAL COMPÉTENT.
            </p>
          </DefaultPage>
        </Container>
      </ContentPageStyle>
    </Base>
  );
}
