from dataclasses import dataclass
from datetime import datetime, timezone
from enum import Enum
from typing import List
from uuid import uuid4


class ApplicationStage(Enum):
    TO_APPLY = "Waiting to apply"
    APPLIED = "Applied"
    STAGE_ONE = "Stage one - intro call"
    STAGE_TWO = "Stage two - skills check"
    STAGE_THREE = "Stage three - cultural fit"
    REFERENCE_CHECK = "Reference check"
    RECEIVED_OFFER = "Received offer"


def get_date():
    current_utc_datetime = datetime.now(timezone.utc)
    formatted_date = current_utc_datetime.strftime("%Y-%m-%d")
    return formatted_date


@dataclass
class Application:
    name: str
    id: str = uuid4().hex
    applied_date: str = get_date()
    last_action: str = get_date()
    stage: ApplicationStage = ApplicationStage.TO_APPLY.value
    rejected: bool = False
    offer_declined: bool = False
    points_of_contact: str = ""
    notes: str = ""
    url: str = ""
    used_cover_letter: bool = False
    cover_letter_name: str = ""

    @classmethod
    def from_dict(cls, data):
        data["stage"] = ApplicationStage(data["stage"]).value
        data["rejected"] = data["rejected"].upper() == "TRUE"
        data["offer_declined"] = data["offer_declined"].upper() == "TRUE"
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
            "rejected": self.rejected,
            "offerDeclined": self.offer_declined,
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
            rejected=data["rejected"],
            offer_declined=data["offerDeclined"],
            points_of_contact=data["pointsOfContact"],
            notes=data["notes"],
            url=data["url"],
            used_cover_letter=data["usedCoverLetter"],
            cover_letter_name=data["coverLetterName"],
        )
