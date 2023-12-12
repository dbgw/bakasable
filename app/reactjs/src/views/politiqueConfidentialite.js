import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContentPageStyle } from "../assets/styles/frontGlobalStyle";
import DefaultPage from "../components/defaultPage";
import HeaderDefaultPage from "../components/front/headerDefaultPage";
import Base from "../theme/front/base";
import ImageBanner from "../assets/images/image-slide.jpg";
import ROUTES from "../config/routes";
import ReadMore from "../components/ui-elements/readMore";

export default function PolitiqueConfidentialite() {
  const dataCrumbs = [
    { name: "Accueil", path: "/" },
    {
      name: "Politique de confidentialité",
      path: ROUTES.POLITIQUE_CONFIDENTIALITE.url,
    },
  ];
  return (
    <Base>
      <HeaderDefaultPage
        title={"Politique de confidentialité"}
        image={ImageBanner}
      />
      <ContentPageStyle className="content-wysiwig">
        <Container>
          <DefaultPage bradcrumbPage={dataCrumbs}>
            <h2>Préambule</h2>
            <p>
              Cette Politique de Confidentialité s'adresse aux Utilisateurs de
              FINGZ (ci-après les « Utilisateurs » ou « Vous ») et a pour
              objectif de les informer sur la manière dont leurs informations
              personnelles peuvent être collectées et traitées.
            </p>
            <p>
              Le respect de la vie privée et des données à caractère personnel
              est pour FINGZ une priorité, raison pour laquelle nous nous
              engageons à traiter celles-ci dans le plus strict respect de la
              loi Informatique et Libertés du 6 janvier 1978 dans sa version
              applicable et du Règlement (UE) général sur la protection des
              données du 27 avril 2016 (ci-après le « RGPD »).
            </p>
            <p>
              En tout état de cause, nous nous engageons à respecter les deux
              (2) principes essentiels suivants :
            </p>
            <ul>
              <li>
                L'Utilisateur reste maître de ses données à caractère personnel
                ;
              </li>
              <li>
                Les données sont traitées de manière transparente,
                confidentielle et sécurisée.
              </li>
            </ul>

            <ReadMore>
              <h5>Qu'est-ce qu'une donnée personnelle ?</h5>
              <p>
                Une « donnée personnelle », c'est toute information Vous
                concernant et qui permet de Vous identifier directement ou
                indirectement. Vos nom(s) et prénom(s) ou une photo peuvent par
                exemple permettre de Vous identifier directement. Votre adresse
                email permet de Vous identifier indirectement.
              </p>
              <h5>Qu'est-ce qu'un traitement ?</h5>
              <p>
                Le mot « traitement » désigne toute opération, ou ensemble
                d'opérations, portant sur des données à caractère personnel,
                quel que soit le procédé utilisé (collecte, enregistrement,
                organisation, conservation, adaptation, modification,
                extraction, consultation, utilisation, communication par
                transmission diffusion ou toute autre forme de mise à
                disposition, rapprochement ou interconnexion, verrouillage,
                effacement ou destruction...).
              </p>
            </ReadMore>

            <h2>1. Définitions</h2>
            <ul>
              <li>
                <strong>« Back-Office » </strong> : désigne l'interface
                permettant au Réparateur d'accéder à son espace personnel et de
                remplir sa Vitrine. L'accès au Back-Office se fait à partir des
                Identifiants.{" "}
              </li>
              <li>
                <strong>« Commande » </strong> : désigne la commande de
                Mission(s) ou d'un Devis réalisée par un Client auprès d'un
                Réparateur sur la Plateforme, une fois les détails de la Mission
                convenus et acceptés par les Parties.
              </li>
              <li>
                <strong>« Compétences » </strong> : désigne l'ensemble des
                domaines dans lesquels le Réparateur dispose d'un savoir-faire.{" "}
              </li>
              <li>
                <strong>« Conditions Commerciales de la Plateforme » </strong> :
                désigne les conditions commerciales applicables à la vente de
                Prestations via la Plateforme complétant le Contrat de
                Prestation dans l'hypothèse où les CGV du Réparateur seraient
                absentes, incomplètes ou non conformes.
              </li>
              <li>
                <strong>« Conditions Générales d'Utilisation » </strong> ou{" "}
                <strong>« CGU »</strong> : désigne les conditions contractuelles
                mises à disposition sur la page d'accueil de la Plateforme, afin
                d'encadrer l'utilisation de celle-ci par tout Utilisateur.
              </li>
              <li>
                <strong>«Conditions Générales de Services » </strong> : désigne
                les conditions contractuelles encadrant la fourniture de
                Services de la Plateforme par l'Opérateur aux Réparateurs.
              </li>
              <li>
                <strong>« CGV du Réparateur » </strong> : désigne les Conditions
                Générales de Vente du Réparateur négociées entre le Réparateur
                et le Client, figurant sur le Devis ou tout autre document
                conclu entre les Parties et régissant la vente à distance des
                Prestations du Réparateur.
              </li>
              <li>
                <strong>« Contenus » </strong> : désigne l'ensemble des
                informations, textes, logos, marques, animations, dessins et
                modèles, photographies, données, liens hypertextes, et de façon
                générale tous les éléments et contenus du Réparateur publiés sur
                la Plateforme selon les modalités, la forme et les conditions
                qui lui sont proposées dans le cadre des Services.
              </li>
              <li>
                <strong>« Contrat de Prestation » </strong> : désigne le contrat
                conclu entre le Réparateur et le Client encadrant la réalisation
                des Missions. Le Contrat de Prestation est composé : de la Fiche
                présentant la Prestation ou du Devis, des CGV du Réparateur et,
                le cas échéant, des Conditions Commerciales de la Plateforme.
              </li>
              <li>
                <strong>« Devis » </strong> : désigne la proposition de
                Prestation adressée par le Réparateur au Client en réponse à son
                Offre de Mission. Lorsque le Devis est accepté par le Client,
                celui-ci fait partie intégrante du Contrat de Prestation.
              </li>
              <li>
                <strong>« Forum » </strong> : espace de discussion et d'échanges
                ouvert aux Réparateurs, accessible sur la Plateforme.{" "}
              </li>
              <li>
                <strong>« Identifiants » </strong> : désigne l'adresse email du
                Réparateur et le mot de passe, nécessaires à l'accès à son
                Back-Office sur la Plateforme.
              </li>
              <li>
                <strong>« Mission » </strong> : désigne la prestation de
                services confiée par le Client à un Réparateur.
              </li>
              <li>
                <strong>« Offre » </strong> : désigne l'offre de Mission
                formulée par un Client à destination d'un Réparateur par
                l'intermédiaire de la Plateforme.
              </li>
              <li>
                <strong>« Parties » </strong> : désigne ensemble FINGZ et le
                Réparateur.
              </li>
              <li>
                <strong>« Plateforme » </strong> : désigne le site internet
                accessible à l'adresse suivante : www.fingz.fr. La Plateforme
                regroupe l'ensemble des pages web, services et fonctionnalités
                proposés aux Utilisateurs.{" "}
              </li>
              <li>
                <strong>« Prestataire de Services de Paiement » </strong> ou{" "}
                <strong>« PSP »</strong> : désigne la société, détentrice d'un
                agrément bancaire, fournissant, par l'intermédiaire de
                l'Opérateur, des services de paiement aux Réparateurs afin de
                leur permettre d'encaisser les paiements des Clients. Le
                Prestataire de Services de Paiement de l'Opérateur est Stripe
                Payments Europe, Ltd., Société de droit irlandais, dont le siège
                social est situé à the One Building, 1, Lower Grand Canal
                Street, Dublin 2, Ireland ; habilitée à exercer son activité au
                sein de l'Espace Economique Européen, en qualité d'établissement
                de monnaie électronique agréé par la Banque Centrale d'Irlande
                sous le numéro C187865.
              </li>
              <li>
                <strong>« Prestations » </strong> : désigne les services
                proposés par le Réparateur aux Clients via la Plateforme.
              </li>
              <li>
                <strong>« Réparateur » </strong> : désigne un artisan, personne
                physique ou morale exerçant légalement son activité en tant
                qu'auto-entrepreneur, SARL, EURL, SAS, ou SASU, affiliée à une
                Chambre des Métiers et de l'Artisanat, justifiant d'un numéro de
                SIRET, d'une inscription au Répertoire des Métiers et ayant
                obtenu de préférence le label « Répar'acteur ».
              </li>
              <li>
                <strong>« Services » </strong> désigne l'ensemble des services
                proposés par l'Opérateur aux Clients et aux Réparateurs par
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
                et avis obtenus par ce dernier.{" "}
              </li>
            </ul>

            <h2>2. Identité du responsable de traitement</h2>
            <h3>- FINGZ, en tant que responsable de traitement</h3>
            <p>
              FINGZ, société par actions simplifiée, immatriculée au Registre du
              Commerce et des Sociétés de Paris sous le numéro 889 838 694, dont
              le siège social est situé au 19, rue Ravignan 75018 Paris, aura le
              statut de responsable de traitement pour tous les traitements
              relatifs à :
            </p>
            <ul>
              <li>la mise à disposition de sa Plateforme, </li>
              <li>
                la fourniture des Services, incluant la mise en relation du
                Réparateur et du Client et l'accès aux forums,
              </li>
              <li>l'envoi de newsletters aux Utilisateurs ;</li>
              <li>
                la gestion des demandes d'exercice des droits des Utilisateurs.
              </li>
            </ul>
            <p>
              L'Opérateur est responsable de traitement pour les finalités
              décrites à l'article 6 « Finalités et bases légales des
              traitements » de la présente Politique de Confidentialité.
            </p>
            <h3>- FINGZ, en tant que sous-traitant</h3>
            <h4>o Traitements liés à la réalisation des Missions</h4>
            <p>
              Le Réparateur sera seul responsable des traitements de données
              liés aux Missions, notamment pour la gestion des Commandes de
              Missions, l'exécution des Missions, et le traitement des
              éventuelles réclamations, dès lors que FINGZ n'exerce aucun
              contrôle sur l'exécution des Missions et n'intervient pas dans la
              transaction opérée. Dans ce cadre, FINGZ pourra éventuellement
              agir comme sous-traitant, sur instruction du Réparateur, notamment
              en cas de médiation.
            </p>
            <h4>o Traitements liés aux paiements</h4>
            <p>
              FINGZ aura la qualité de sous-traitant à l'égard du PSP lorsque
              celui-ci collecte et traite des données pour la réalisation des
              procédures de contrôle dans le cadre de la mise en œuvre des
              services de paiement (fraude, anti-blanchiment, financement du
              terrorisme).
            </p>
            <p>
              Le PSP est en revanche sous-traitant des Réparateurs de Vos
              données personnelles pour la réalisation des transactions.{" "}
            </p>
            <ReadMore>
              <h5>Rappel légal :</h5>
              <p>
                Le responsable du traitement est, au sens de la loi Informatique
                et Libertés et du RGPD, la personne qui détermine les moyens et
                les finalités du traitement.{" "}
              </p>
              <p>
                Lorsque deux responsables du traitement ou plus déterminent
                conjointement les finalités et les moyens du traitement, ils
                sont les responsables conjoints du traitement (ou
                co-responsables).
              </p>
              <p>
                Le sous-traitant est une personne traitant des données à
                caractère personnel pour le compte du responsable du traitement,
                il agit sous l'autorité du responsable du traitement et sur
                instruction de celui-ci.
              </p>
            </ReadMore>
            <p>
              Ceci précisé, la présente Politique de Confidentialité concerne
              les traitements de données réalisés par l'Opérateur en sa qualité
              de responsable de traitement ou de co-responsable de traitement.
            </p>
            <p>
              Les Utilisateurs qui souhaiteraient avoir des renseignements sur
              les opérations de traitement effectuées par les Réparateurs ou le
              PSP devront solliciter ces derniers.
            </p>

            <h2>3. Coordonnées de notre délégué à la protection des données</h2>
            <p>
              Nous nous tenons à votre disposition pour répondre à toutes les
              demandes, y compris d'exercice de droits, relatives à Vos données
              à caractère personnel.
            </p>
            <p>Vous pouvez le joindre :</p>
            <ul>
              <li>
                Soit par courriel à l'adresse suivante :{" "}
                <a href="mailto:donnéespersonnelle@fingz.fr" target="_blank">
                  donnéespersonnelle@fingz.fr
                </a>
              </li>
              <li>
                Soit par courrier : FINGZ - Données Personnelles - 27, rue du
                chemin vert - 75011
              </li>
            </ul>

            <h2>4. Collecte & origine des données</h2>
            <p>
              Dans le cadre de la fourniture des Services, l'Opérateur collecte
              et traite des données à caractère personnel relatives à ses
              Utilisateurs lors de Votre inscription, lors de l'utilisation de
              la Plateforme et lors de Vos échanges avec le Service Client de la
              Plateforme.
            </p>
            <p>
              Dans tous les cas, Vous êtes informés des finalités pour
              lesquelles Vos données sont collectées par nos soins via les
              différents formulaires de collecte de données en ligne, les
              courriels qui Vous seraient adressés, des notifications sur la
              Plateforme ou bien encore via notre{" "}
              <Link to={ROUTES.CHARTE_COOKIES.url} target="_blank">
                Charte de gestion des Cookies
              </Link>
              .
            </p>
            <ReadMore>
              <p>
                Les données sur les Utilisateurs collectées par l'Opérateur sont
                traitées conformément aux finalités prévues lors de la collecte
                dans le respect du Référentiel relatif aux traitements de
                données à caractère personnel mis en œuvre aux fins de gestion
                des activités commerciales édité par la CNIL.
              </p>
              <p>
                Lorsque cela est nécessaire, nous nous engageons, selon les cas,
                à recueillir Votre consentement et/ou à Vous permettre de Vous
                opposer à l'utilisation de Vos données pour certaines finalités,
                comme par exemple, pour déposer des cookies tiers sur Vos
                terminaux (téléphone mobile, ordinateur, tablette) à des fins de
                mesure d'audience de notre Plateforme et pour Vous proposer des
                offres commerciales et publicités ciblées en fonction de Vos
                centres d'intérêts.
              </p>
            </ReadMore>

            <h2>5. Consentement</h2>
            <p>
              Dans le cadre du respect des principes de protection des données
              dès la conception et de protection des données par défaut,
              l'Opérateur s'assure que les consentements nécessaires ont bien
              été recueillis lors de l'inscription des Utilisateurs.
            </p>

            <h2>6. Finalités et bases légales des traitements</h2>
            <p>
              Vos différentes données sont collectées par l'Opérateur pour
              assurer :
            </p>
            <h5>
              - La Mise à disposition de la Plateforme, de ses fonctionnalités
              et d'un Back-Office / Espace Client
            </h5>
            <ReadMore>
              <h5>Détails du traitement</h5>
              <p>
                La gestion, l'exploitation et la mise à disposition de la
                Plateforme et de ses Services couvre ces traitements :
              </p>
              <ul>
                <li>
                  L'inscription des Clients et des Réparateurs sur la Plateforme
                  ;
                </li>
                <li>
                  Le dépôt de cookies et autres traceurs dont Vous pouvez
                  retrouver les détails dans notre{" "}
                  <Link to={ROUTES.CHARTE_COOKIES.url} target="_blank">
                    Charte de gestion des Cookies
                  </Link>
                  .
                </li>
              </ul>
              <h5>Base légale</h5>
              <p>
                <strong>L'exécution du Contrat</strong> : le traitement est
                nécessaire à l'exécution des Services prévues dans les
                Conditions Générales d'Utilisation (CGU) de la Plateforme et
                dans les Conditions Générales de Services (CGS) conclus entre
                l'Opérateur et le Réparateur.
              </p>
              <p>
                Votre <strong>Consentement</strong> lorsqu'il est requis.
              </p>
            </ReadMore>
            <h5>- L'intermédiation avec le Réparateur choisi </h5>
            <ReadMore>
              <h5>Détails du traitement :</h5>
              <p>Ce traitement couvre les finalités suivantes : </p>
              <ul>
                <li>
                  Intermédiation entre un Réparateur et un Client, et transfert
                  de Vos données au Réparateur ou au Client concerné
                </li>
              </ul>
              <h5>Bases légales :</h5>
              <p>
                <strong>L'exécution du Contrat </strong> : le traitement est
                nécessaire à l'exécution des Services prévues dans les
                Conditions Générales d'Utilisation (CGU) de la Plateforme et
                dans les Conditions Générales de Services (CGS) conclus entre
                l'Opérateur et le Réparateur.
              </p>
              <p>
                Votre <strong>Consentement</strong> lorsqu'il est requis.{" "}
              </p>
            </ReadMore>
            <h5>
              - L'exécution de Missions, la gestion et le suivi de la relation
              commerciale par le Réparateu
            </h5>
            <p>
              <strong>
                {"->"} Ce traitement est mis en œuvre par le Réparateur,
                agissant en tant que responsable de traitement. FINGZ pourra
                éventuellement agir sur instruction du Réparateur, en tant que
                sous-traitant, notamment dans le cadre de la médiation des
                litiges entre les Utilisateurs.
              </strong>
            </p>
            <ReadMore>
              <h5>Détails du traitement :</h5>
              <p>Ce traitement couvre les finalités suivantes : </p>
              <ul>
                <li>L'exécution des Missions ;</li>
                <li>La gestion des Commandes ; </li>
                <li>La gestion des réclamations et du service après-vente ;</li>
                <li>La gestion des impayés et du contentieux ;</li>
              </ul>
              <p>
                Par extension, ce traitement inclut la conservation des
                documents commerciaux (notamment les factures).
              </p>
              <h5>Bases légales :</h5>
              <p>
                <strong>Exécution du contrat </strong> : les Conditions de Vente
                entre le Réparateur et le Client.
              </p>
              <p>
                <strong>Obligations légales du Réparateur</strong> durée légale
                de conservation des documents commerciaux.{" "}
              </p>
            </ReadMore>

            <h5>
              - La gestion et le suivi de la relation commerciale avec les
              Réparateurs
            </h5>
            <ReadMore>
              <h5>Détails du traitement :</h5>
              <p>Ce traitement couvre les finalités suivantes :</p>
              <ul>
                <li>
                  La fourniture de l'ensemble des Services (notamment le Forum)
                  ;
                </li>
                <li>
                  La gestion de la base de Clients et des Réparateurs (gestion
                  des Espaces Clients, du Back-Office, gestion commerciale,
                  suivi de la relation avec les Utilisateurs (support de la
                  Plateforme, éventuelles enquêtes de satisfaction, etc.)) ;
                </li>
                <li>La gestion des réclamations des Utilisateurs ; </li>
                <li>La gestion des impayés et du contentieux ;</li>
              </ul>
              <h5>Bases légales :</h5>
              <p>
                <strong>L'exécution du Contrat</strong> le traitement est
                nécessaire à l'exécution des Services prévues dans les
                Conditions Générales d'Utilisation (CGU) de la Plateforme et
                dans les Conditions Générales de Services (CGS) conclus entre
                l'Opérateur et le Réparateur.
              </p>
            </ReadMore>
            <h5>- Le paiement des Prestations</h5>
            <p>
              <strong>
                {"->"} Ce traitement est mis en œuvre par le PSP
                (sous-traitant), à la demande du Réparateur (responsable de
                traitement).
              </strong>
            </p>
            <ReadMore>
              <h5>Détails du traitement :</h5>
              <p>Ce traitement couvre les finalités suivantes :</p>
              <ul>
                <li>La réalisation des opérations de paiement ;</li>
                <li>La conservation des données de paiement le cas échéant.</li>
              </ul>
              <h5>Base légale :</h5>
              <p>
                <strong>L'exécution du Contrat</strong> : le traitement des
                données personnelles du Client et du Réparateur est nécessaire
                au paiement des Missions par le Client au Réparateur.
              </p>
            </ReadMore>
            <h5>- Le contrôle des transactions</h5>
            <p>
              <strong>
                {"->"} Ce traitement est mis en œuvre par le PSP (responsable de
                traitement) au titre de ses obligations légales en tant que PSP,
                notamment du KYC (Know your Customer). Ces traitements sont
                régis par la{" "}
                <a href="#">Politique de Confidentialité de Stripe</a> et son{" "}
                <a href="#">Privacy Center</a>.
              </strong>
            </p>
            <h5>
              - L'envoi de newsletters, SMS et autres communications
              commerciales{" "}
            </h5>
            <ReadMore>
              <h5>Détails du traitement :</h5>
              <p>Ce traitement couvre les finalités suivantes :</p>
              <ul>
                <li>
                  Envoi de newsletter, SMS et autres alertes aux Utilisateurs.
                </li>
              </ul>
              <h5>Base légale :</h5>
              <p>
                Votre <strong>Consentement</strong> : le Client, en tant que
                consommateur, doit donner son consentement préalable à la
                prospection commerciale ; le Réparateur doit pouvoir s'y opposer
                à tout moment.
              </p>
              <h5>Détails du traitement :</h5>
              <p>
                Ce traitement couvre l'ensemble des opérations nécessaires au
                suivi des demandes de droits adressées à l'Opérateur
                (qualification de la demande, investigations, réalisation
                d'opérations techniques spécifiques etc.). Il ne concerne que
                les cas où l'Opérateur agit en qualité de responsable de
                traitement.
              </p>
              <h5>Base légale : </h5>
              <p>
                <strong>Obligation légale</strong> découlant des articles 15 et
                suivants du RGPD et des articles 48 et suivants de la loi
                Informatique et Libertés.
              </p>
            </ReadMore>

            <h5>
              - Le bon fonctionnement et l'amélioration permanente de la
              Plateforme, de ses fonctionnalités et des Services proposés{" "}
            </h5>

            <ReadMore>
              <h5>Détails du traitement :</h5>
              <p>
                En cas de litige entre les Utilisateurs, FINGZ peut intervenir
                comme médiateur à leur demande, dans les conditions prévues par
                les Conditions Générales d'Utilisation.
              </p>
              <h5>Base légale :</h5>
              <p>
                <strong>Exécution du contrat</strong> : relation contractuelle
                entre les Utilisateurs et CGU.{" "}
              </p>
            </ReadMore>

            <h5>
              - La transmission d'informations concernant les Utilisateurs aux
              autorités administratives compétentes
            </h5>
            <ReadMore>
              <h5>Détails du traitement :</h5>
              <p>
                La transmission d'informations concernant les Utilisateurs, tout
                particulièrement les Réparateurs, au regard de leur utilisation
                de la Plateforme, aux autorités administratives compétentes en
                vertu d'une obligation légale incombant à l'Opérateur,
                notamment, mais sans s'y limiter, en vertu de l'article 242 bis
                du Code Général des Impôts.{" "}
              </p>
              <h5>Base légale :</h5>
              <p>
                <strong>Obligation légale</strong> de l'Opérateur.{" "}
              </p>
            </ReadMore>

            <h2>7. Destinataires de Vos données</h2>
            <p>
              Dans la limite de leurs attributions respectives et pour les
              finalités rappelées à l'article 6, les principales personnes qui
              seront susceptibles d'avoir accès à Vos données sont les suivantes
              :
            </p>
            <ul>
              <li>
                Le personnel habilité des différents services de l'Opérateur (le
                personnel habilité des services commercial, informatique,
                marketing, et client) ;
              </li>
              <li>Le Prestataire de Services de Paiement ;</li>
              <li>Le Réparateur ; </li>
              <li>
                Le cas échéant, le personnel habilité de nos sous-traitants ;
              </li>
              <li>
                Le cas échéant, les juridictions concernées, autorités
                administratives compétentes (notamment l'administration
                fiscale), médiateurs, experts-comptables, commissaires aux
                comptes, avocats, huissiers, sociétés de recouvrement de
                créances ;
              </li>
              <li>
                Les tiers susceptibles de déposer des cookies sur Vos terminaux
                (ordinateurs, tablettes, téléphones portables...) lorsque Vous y
                consentez (pour plus de détail, consultez notre{" "}
                <Link to={ROUTES.CHARTE_COOKIES.url} target="_blank">
                  Charte de gestion des Cookies
                </Link>
                .
              </li>
            </ul>
            <ReadMore>
              <p>
                <strong>
                  Certaines catégories de personnes ont accès aux données
                  collectées :
                </strong>
              </p>
              <p>{">"} Le Prestataire de Services de Paiement ;</p>
              <ul>
                <li>Lieu de stockage : USA</li>
              </ul>
              <p>{">"} Les fournisseurs de stockage cloud ;</p>
              <ul>
                <li>Lieu de stockage : France</li>
              </ul>
              <p>
                - Pour toute demande d'information complémentaire, Vous pouvez
                adresser une demande d'information complémentaire à notre
                contact en matière de Protection des Données par courriel à{" "}
                <a href="mailto:donneespersonnelles@fingz.fr" target="_blank">
                  donneespersonnelles@fingz.fr
                </a>
                ,ou par courrier à FINGZ - Données Personnelles - 27, rue du
                chemin vert - 75011 Paris.
              </p>
              <p>
                {">"} Le cas échéant, les juridictions concernées, médiateurs,
                experts-comptables, commissaires aux comptes, avocats,
                huissiers, sociétés de recouvrement de créances ;
              </p>
              <p>
                {">"} Les tiers susceptibles de déposer des cookies sur Vos
                terminaux (ordinateurs, tablettes, téléphones portables...)
                lorsque Vous y consentez (pour plus de détail, consultez notre{" "}
                <Link to={ROUTES.CHARTE_COOKIES.url} target="_blank">
                  Charte de gestion des Cookies
                </Link>
                .
              </p>
            </ReadMore>
            <p>
              Vos données à caractère personnel ne sont ni communiquées, ni
              échangées, ni vendues ni louées sans Votre consentement exprès
              préalable conformément aux dispositions légales et réglementaires
              applicables.
            </p>

            <h2>8. Transfert de données hors Union Européenne</h2>
            <p>
              Conformément à la Politique de Confidentialité du PSP accessible{" "}
              <Link to={ROUTES.POLITIQUE_CONFIDENTIALITE.url} target="_blank">
                ici
              </Link>
              , os données personnelles pourront être traitées en dehors de
              l'Union Européenne et en particulier aux Etats-Unis dans le cadre
              de la fourniture des services de paiement.
            </p>
            <p>
              Tout transfert de Vos données personnelles en dehors de l'Union
              Européenne est réalisé conformément à la réglementation applicable
              à la protection des données personnelles. A ce titre, le
              responsable de traitement et ses sous-traitants, y inclus les
              sous-traitants ultérieurs, mettent en œuvre l'ensemble des mesures
              nécessaires afin de s'assurer du respect et de la confidentialité
              de Vos données, notamment par la conclusion de clauses
              contractuelles types telles qu'adoptées par la Commission
              Européenne.
            </p>
            <p>
              Dans le cas contraire, les Utilisateurs seront informés dans les
              meilleurs délais des conditions de ce transfert et notamment des
              mesures prises par l'Opérateur afin de s'assurer du respect de la
              confidentialité et de la sécurité de leurs données.
            </p>
            <p>
              Vous pouvez demander à accéder aux documents assurant des
              garanties appropriées contractuelles en faisant la demande à notre
              par courriel à{" "}
              <a href="mailto:donneespersonnelles@fingz.fr" target="_blank">
                donneespersonnelles@fingz.fr
              </a>
              ,ou par courrier à FINGZ - Données Personnelles - 27, rue du
              chemin vert - 75011 Paris.
            </p>

            <h2>9. Durée de conservation des Données</h2>
            <p>
              Nous conservons Vos données uniquement le temps nécessaire pour
              les finalités poursuivies, telles que décrites à l'article 6 «
              Finalités et bases légales des traitements ».
            </p>
            <p>
              A titre indicatif, cliquez ci-dessous pour plus de détails sur les
              durées légales de conservation.
            </p>
            <ReadMore>
              <table style={{ width: "100px" }}>
                <tr>
                  <td>
                    <strong>
                      La Mise à disposition de la Plateforme, de ses
                      fonctionnalités et d'un Back Office
                    </strong>
                  </td>
                  <td>
                    <p>
                      Les données collectées pour les traitements relatifs à
                      l'accès à la Plateforme, et la fourniture des Services
                      sont conservées pendant toute la durée de la relation
                      contractuelle avec l'Opérateur augmentée de trois (3) ans.{" "}
                    </p>
                    <p>
                      Elles sont par la suite stockées en archivage
                      intermédiaire pendant cinq (5) ans dans un objectif de
                      preuve.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Pour l'intermédiation avec un Réparateur </strong>
                  </td>
                  <td>
                    <p>
                      Les données collectées pour les traitements relatifs à
                      l'accès à la Plateforme, et la fourniture des Services
                      sont conservées pendant toute la durée de la relation
                      contractuelle avec l'Opérateur augmentée de trois (3) ans.
                    </p>
                    <p>
                      Elles sont par la suite stockées en archivage
                      intermédiaire pendant cinq (5) ans dans un objectif de
                      preuve.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      La gestion et le suivi de la relation commerciale
                    </strong>
                  </td>
                  <td>
                    <p>
                      Les données collectées pour les traitements relatifs à
                      l'accès à la Plateforme, et la fourniture des Services
                      sont conservées pendant toute la durée de la relation
                      contractuelle avec l'Opérateur augmentée de trois (3) ans.
                    </p>
                    <p>
                      Elles sont par la suite stockées en archivage
                      intermédiaire pendant cinq (5) ans dans un objectif de
                      preuve.
                    </p>
                    <p>
                      Les documents comptables et pièces justificatives sont
                      conservées pendant dix (10) ans en application de
                      l'article L.123-22 du Code de commerce.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Le paiement des Prestations</strong>
                  </td>
                  <td>
                    <p>
                      Vos données de paiement sont traitées et conservées par le
                      PSP conformément à sa Politique de Confidentialité,
                      accessible à l'adresse suivante :{" "}
                      <a href="https://stripe.com/fr/privacy" target="_blank">
                        {" "}
                        https://stripe.com/fr/privacy
                      </a>
                      .
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Envoi de newsletters et SMS</strong>
                  </td>
                  <td>
                    <p>
                      Les données utilisées dans le cadre de l'envoi de
                      newsletter et autres alertes sont conservées pour une
                      durée de trois (3) ans à compter de la fin de la relation
                      commerciale si l'Utilisateur est Client de l'Opérateur.
                    </p>
                    <p>
                      Si l'Utilisateur n'est pas encore Client, les données
                      utilisées dans le cadre de l'envoi de newsletter et autres
                      alertes sont conservées pendant une durée de trois (3) ans
                      à compter du jour de la dernière prise de contact de
                      l'Utilisateur avec l'Opérateur.
                    </p>
                    <p>
                      Ensuite, les données de l'Utilisateur sont stockées pour
                      une période de cinq (5) ans, pour des raisons de preuve,
                      conformément aux dispositions en vigueur (Code des
                      assurance, Code de la mutualité, Code de commerce, Code
                      civil, Code de la consommation, Code de la sécurité
                      intérieure etc.).
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Gestion des demandes d'exercice de droit</strong>
                  </td>
                  <td>
                    <p>
                      Les données relatives à la gestion des demandes de droit
                      sont conservées pour toute la durée nécessaire au
                      traitement de la demande. Elles sont par la suite
                      archivées pour la durée de prescription pénale applicable
                      en archivage intermédiaire.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Gestion du bon fonctionnement du Site</strong>
                  </td>
                  <td>
                    <p>
                      Les cookies et autres traceurs commerciaux peuvent être
                      déposés sur le terminal de l'Utilisateur pour une durée
                      maximale de treize (13) mois. Au-delà de ce délai, les
                      données de fréquentation brutes associées à un identifiant
                      sont soit supprimées soit anonymisées.
                    </p>
                    <p>
                      Les informations collectées par l'intermédiaire de cookies
                      et traceurs sont conservées pour une durée de vingt-cinq
                      (25) mois. Au-delà de ce délai, ces données sont
                      supprimées, ou anonymisées.
                    </p>
                  </td>
                </tr>
              </table>
            </ReadMore>

            <h2>10.Vos droits</h2>
            <p>
              Conformément à la Loi Informatique et Libertés et au RGPD, vous
              disposez des droits suivants (en savoir plus) :
            </p>
            <ul>
              <li>
                Droit d'accès <strong>(article 15 RGPD)</strong>, de
                rectification <strong>(article 16 RGPD)</strong>, de mise à
                jour, de complétude de Vos données ;{" "}
              </li>
              <li>
                Droit à l'effacement (ou « droit à l'oubli ») de Vos données à
                caractère personnel <strong>(article 17 RGPD)</strong>,
                lorsqu'elles sont inexactes, incomplètes, équivoques, périmées,
                ou dont la collecte, l'utilisation, la communication ou la
                conservation est interdite ;{" "}
              </li>
              <li>
                Droit de retirer à tout moment Votre consentement{" "}
                <strong>(article 7 RGPD)</strong> ;{" "}
              </li>
              <li>
                Droit à la limitation du traitement de Vos données{" "}
                <strong>(article 18 RGPD)</strong> ;{" "}
              </li>
              <li>
                Droit d'opposition au traitement de Vos données{" "}
                <strong>(article 21 RGPD)</strong> ;
              </li>
              <li>
                Droit à la portabilité des données que Vous nous avez fournies,
                lorsque Vos données font l'objet de traitements automatisés
                fondés sur votre consentement ou sur un contrat
                <strong>(article 20 RGPD)</strong> ;
              </li>
              <li>
                Droit de ne pas faire l'objet d'une décision fondée
                exclusivement sur un traitement automatisé{" "}
                <strong>(article 22 du RGPD)</strong> ;{" "}
              </li>
              <li>
                Droit de définir le sort de Vos données après votre mort et de
                choisir que nous communiquions (ou non) Vos données à un tiers
                que vous aurez préalablement désigné{" "}
                <strong>(article 85 LIL)</strong>. En cas de décès et à défaut
                d'instructions de votre part, nous nous engageons à détruire Vos
                données, sauf si leur conservation s'avère nécessaire à des fins
                probatoires ou pour répondre à une obligation légale.
              </li>
            </ul>
            <p>Vous pouvez exercer Vos droits :</p>
            <ul>
              <li>
                Par courriel à l'adresse suivante :{" "}
                <a href="mailto:donneespersonnelles@fingz.fr" target="_blank">
                  donneespersonnelles@fingz.fr
                </a>
              </li>
              <li>
                Par courrier : FINGZ - Données Personnelles - 27, rue du chemin
                vert - 75011 Paris.
              </li>
            </ul>
            <p>
              Enfin, Vous pouvez également introduire une réclamation auprès des
              autorités de contrôle et notamment de la <strong>CNIL</strong> ou
              de toute autre autorité compétente.
            </p>
            <ReadMore>
              <p>
                Lorsqu'il s'agit des traitements effectués par l'Opérateur dans
                le cadre de la mise à disposition de ses Services, ces droits
                peuvent être exercés, par simple demande par courrier
                électronique à l'adresse dédiée{" "}
                <a href="mailto:donneespersonnelles@fingz.fr" target="_blank">
                  donneespersonnelles@fingz.fr
                </a>{" "}
                ou par courrier papier à l'adresse suivante :FINGZ – Données
                Personnelles – 27, rue du chemin vert – 75011 Paris en
                justifiant de votre identité et d'un motif légitime lorsque
                celui-ci est exigé par la loi.
              </p>
            </ReadMore>

            <h2>11.Données de connexion et cookies</h2>
            <p>
              Nous faisons usage pour le bon fonctionnement de la Plateforme et
              des Services de données de connexion (date, heure, adresse
              Internet, protocole de l'ordinateur du visiteur, page consultée)
              et des cookies (petits fichiers enregistrés sur votre ordinateur)
              permettant de Vous identifier, de mémoriser Vos consultations, et
              de bénéficier de mesures et statistiques d'audience, notamment
              relatives aux pages consultées.
            </p>
            <p>
              En ce sens, l'Opérateur a rédigé une{" "}
              <Link to={ROUTES.CHARTE_COOKIES.url} target="_blank">
                Charte de gestion des Cookies
              </Link>{" "}
              afin de Vous informer plus spécifiquement de leur utilisation.
            </p>

            <ReadMore>
              <p>
                En naviguant sur notre site, Vous acceptez que l'Opérateur
                installe ce type de cookies dits « techniques » qui ont pour
                finalité exclusive de permettre ou faciliter la communication
                par voie électronique de Votre équipement terminal avec notre
                site, en facilitant la gestion et la navigation sur celui-ci.
              </p>
              <p>
                Notre accès aux informations stockées dans Votre équipement
                terminal ou l'inscription d'informations dans ce dernier se fera
                donc uniquement dans les cas suivants :
              </p>
              <ul>
                <li>
                  Permettre ou faciliter la communication par voie électronique
                  ;
                </li>
                <li>
                  Lorsque cela s'avère nécessaire à la fourniture de notre
                  service de communication en ligne à Votre demande expresse.
                </li>
              </ul>
              <p>
                Si le navigateur le permet, Vous pouvez désactiver à tout moment
                ces cookies, en suivant la procédure indiquée par ce navigateur.
                Cependant, l'Opérateur vous informe qu'une telle désactivation
                peut avoir pour conséquence de ralentir et/ou perturber l'accès
                à la Plateforme internet.
              </p>
            </ReadMore>

            <h2>12.Réseaux sociaux</h2>
            <p>
              Lors de la navigation sur la Plateforme ou sur le site Internet de
              l'Opérateur, les Utilisateurs disposent de la possibilité de
              cliquer sur les icônes dédiées aux réseaux sociaux (Facebook,
              LinkedIn, Twitter, Instagram, YouTube) figurant sur notre
              Plateforme ou dans notre application mobile.
            </p>
            <p>
              Les réseaux sociaux permettent d'améliorer la convivialité de la
              Plateforme et de la Plateforme et aident à sa promotion via les
              partages.
            </p>
            <p>
              Lorsque les Utilisateurs utilisent ces boutons, l'Opérateur peut
              avoir accès à des informations personnelles que les Utilisateurs
              auraient indiquées comme publiques et accessibles depuis leurs
              profils (Facebook, LinkedIn, Twitter, Instagram, YouTube).
              Cependant, l'Opérateur ne crée ni n'utilise aucune base de données
              issues de Facebook, LinkedIn, Twitter, Instagram, YouTube) et
              n'exploite aucune donnée relevant de Votre vie privée par ce
              biais.
            </p>
            <ReadMore>
              <p>
                Afin de limiter les accès de tiers à Vos informations
                personnelles présentes sur Facebook, LinkedIn, Twitter,
                Instagram, YouTube), nous Vous invitons à paramétrer Vos profils
                et/ou la nature de Vos publications via les espaces dédiés sur
                les médias sociaux dans le but d'en limiter l'audience.
              </p>
            </ReadMore>

            <h2>13.Sécurité</h2>
            <p>
              L'Opérateur respecte le RGPD et la loi Informatique et Libertés en
              matière de sécurité et de confidentialité de Vos données.
            </p>
            <p>
              Nous mettons en œuvre toutes les mesures techniques et
              organisationnelles nécessaires afin d'assurer la sécurité de nos
              traitements de données à caractère personnel et la confidentialité
              des données que nous collectons.
            </p>

            <p>
              A ce titre, nous prenons toutes les précautions utiles, au regard
              de la nature des données et des risques présentés par les
              traitements pour en préserver la sécurité et, notamment, empêcher
              que les données soient déformées, endommagées, ou que des tiers
              non autorisés y aient accès (protection physique des locaux,
              procédés d'authentification des personnes accédant aux données
              avec accès personnel et sécurisé via des Identifiants et mots de
              passe confidentiels, protocole https sécurisé, journalisation et
              traçabilité des connexions, chiffrement de certaines données...).
            </p>
          </DefaultPage>
        </Container>
      </ContentPageStyle>
    </Base>
  );
}
