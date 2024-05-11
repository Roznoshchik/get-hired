declare global {
  type ApplicationStage =
    | "Waiting to apply"
    | "Applied"
    | "Stage one - intro call"
    | "Stage two - skills check"
    | "Stage three - cultural fit"
    | "Reference check"
    | "Received offer";

  type Application = {
    id: string;
    name: string;
    appliedDate: string;
    lastAction: string;
    stage: ApplicationStage;
    answered: boolean;
    rejected: boolean;
    offerDeclined: boolean;
    pointsOfContact: string;
    notes: string;
    url: string;
    usedCoverLetter: boolean;
    coverLetterName: string;
  };
}

export {}
