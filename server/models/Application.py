from dataclasses import dataclass
from enum import Enum
import time
from uuid import uuid4


class ApplicationStage(Enum):
    TO_APPLY = "Waiting to apply"
    APPLIED = "Applied"
    SCHEDULED = "Interview scheduled"
    STAGE_ONE = "Stage one - intro call"
    STAGE_TWO = "Stage two - skills check"
    STAGE_THREE = "Stage three - cultural fit"
    WAITING_FOR_OFFER = "Waiting for offer"
    REJECTED = "Rejected"
    RECEIVED_OFFER = "Received offer"
    DECLINED_OFFER = "Offer declined"


@dataclass
class Application:
    name: str
    id: str = uuid4().hex
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
    def from_dict(cls, data):
        data["stage"] = ApplicationStage(data["stage"]).value
        data["answered"] = data["answered"].upper() == "TRUE"
        data["rejected"] = data["rejected"].upper() == "TRUE"
        data["used_cover_letter"] = data["used_cover_letter"].upper() == "TRUE"

        return cls(**data)

    def to_json(self):
        """returns camelCased dictionary ready for serializing"""
        return {
            "id": self.id,
            "name": self.name,
            "appliedDate": self.applied_date,
            "lastAction": self.last_action,
            "stage": self.stage,
            "answered": self.answered,
            "rejected": self.rejected,
            "pointsOfContact": self.points_of_contact,
            "notes": self.notes,
            "url": self.url,
            "usedCoverLetter": self.used_cover_letter,
            "coverLetterName": self.cover_letter_name,
        }

    @classmethod
    def from_json(cls, data):
        """loads an Application from a camelCased dictionary"""
        return cls(
            id=data["id"],
            name=data["name"],
            applied_date=data["appliedDate"],
            last_action=data["lastAction"],
            stage=data["stage"],
            answered=data["answered"],
            rejected=data["rejected"],
            points_of_contact=data["pointsOfContact"],
            notes=data["notes"],
            url=data["url"],
            used_cover_letter=data["usedCoverLetter"],
            cover_letter_name=data["coverLetterName"],
        )
