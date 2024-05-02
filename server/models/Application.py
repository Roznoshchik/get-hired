from dataclasses import dataclass
from enum import Enum
import time


class ApplicationStage(Enum):
    TO_APPLY = "Waiting to apply"
    APPLIED = "Applied"
    SCHEDULED = "Interview scheduled"
    STAGE_ONE = "Stage one - intro call"
    STAGE_TWO = "Stage two - technical or team"
    STAGE_THREE = "Stage three - cultural fit"
    WAITING_FOR_OFFER = "Waiting for offer"
    REJECTED = "Rejected"
    RECEIVED_OFFER = "Received offer"
    DECLINED_OFFER = "Offer declined"


@dataclass
class Application:
    name: str
    applied_date: int = int(time.time())
    last_action: int = int(time.time())
    stage: ApplicationStage = ApplicationStage.TO_APPLY.value
    answered: bool = False
    rejected: bool = False
    points_of_contact: str = ""
    notes: str = ""
    url: str = ""
    used_cover_letter: bool = False
    cover_letter_name: str = ""

    @classmethod
    def from_dict(cls, dict):
        dict["stage"] = ApplicationStage(dict["stage"]).value
        dict["answered"] = dict["answered"].upper() == "TRUE"
        dict["rejected"] = dict["rejected"].upper() == "TRUE"
        dict["used_cover_letter"] = dict["used_cover_letter"].upper() == "TRUE"

        return cls(**dict)
