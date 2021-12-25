import { Profession } from './profession';

export interface Citoyen {
  cin: string;
  dateNaissance: Date;
  lieuNaissance: string;
  nomAr: string;
  nomFr: string;
  prenomAr: string;
  prenomFr: string;
  nomPereAr: string;
  nomPereFr: string;
  nomMereAr: string;
  nomMereFr: string;
  situationFamiliale: string;
  profession: Profession;
}
