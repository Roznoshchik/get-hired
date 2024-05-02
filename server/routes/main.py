import csv
from dataclasses import dataclass, asdict, fields
from enum import Enum
import json
import time

from flask import render_template, Blueprint, jsonify


class ApplicationStage(Enum):
    TO_APPLY = "Waiting to apply"
    APPLIED = "Applied"
    SCHEDULED = "Interview scheduled"
    INTRO_CALL = "Intro call"
    TECH_INTERVIEW = "Technical interview"
    CULTURE_INTERVIEW = "Culture interview"
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


bp = Blueprint(
    "main",
    __name__,
)


@bp.get("/new/<name>")
def create_new_app(name):
    app = Application(name=name)
    with open("applications.csv", "a", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=[f.name for f in fields(Application)])
        writer.writerow(asdict(app))
    return jsonify(app)


@bp.get("/")
def index():
    with open("applications.csv", "r", newline="") as file:
        reader = csv.DictReader(file)
        applications = [Application.from_dict(row) for row in reader]

    return render_template(
        "index.html", data=json.dumps(applications, indent=4, default=asdict)
    )
