declare global {
  type ApplicationStage =
    "Waiting to apply" |
    "Applied" |
    "Interview scheduled" |
    "Stage one - intro call" |
    "Stage two - skills check" |
    "Stage three - cultural fit" |
    "Waiting for offer" |
    "Rejected" |
    "Received offer" |
    "Offer declined";


  type Application = {
    id: string;
    name: string;
    appliedDate: string;
    lastAction: string;
    stage: ApplicationStage;
    answered: boolean;
    rejected: boolean;
    pointsOfContact: string;
    notes: string;
    url: string;
    usedCoverLetter: boolean;
    coverLetterName: string;
  };
}

export {}
