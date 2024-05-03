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
    name: string;
    appliedDate: Number;
    lastAction: Number;
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
