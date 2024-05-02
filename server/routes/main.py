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
    applied_date: int = time.time()
    last_action: int = time.time()
    stage: ApplicationStage = ApplicationStage.TO_APPLY.value
    answered: bool = False
    rejected: bool = False
    points_of_contact: str = ""
    notes: str = ""
    url: str = ""
    used_cover_letter: bool = False
    cover_letter_name: str = ""



bp = Blueprint(
    "main",
    __name__,
)

@bp.get("/new/<name>")
def create_new_app(name):
    applications = []
    for app in ["foo", "bar", "baz"]:
        applications.append(Application(name=app))
    return jsonify(applications)




@bp.get("/")
def index():
    applications = [
        Application(
            "Acme, inc.",
            20230401,
            20230402,
            ApplicationStage.APPLIED.value,
            True,
            False,
            "John Doe",
            "Initial application",
            "http://example.com",
            True,
            "cover_letter_1.pdf",
        ),
        Application(
            "FOO, inc.",
            time.time(),
            time.time(),
            ApplicationStage.TO_APPLY.value,
            False,
            False,
            "Alan Walker",
            "Thought they were cool",
            "http://example.com",
            True,
            "cover_letter_2.pdf",
        ),
    ]

    with open("applications.csv", "w", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=[f.name for f in fields(Application)])
        writer.writeheader()
        for app in applications:
            writer.writerow(asdict(app))

    # Reading from a CSV file
    with open("applications.csv", "r", newline="") as file:
        reader = csv.DictReader(file)
        applications = [application_from_dict(row) for row in reader]
        data=jsonify(applications)
    return render_template(
        # "index.html", data=json.dumps(applications, indent=4, default=asdict)
        "index.html", data=data.json
    )


def application_from_dict(row):
    row["stage"] = ApplicationStage(row["stage"]).value
    row["answered"] = row["answered"] == "TRUE"
    row["rejected"] = row["rejected"] == "TRUE"
    row["used_cover_letter"] = row["used_cover_letter"] == "TRUE"
    return Application(**row)
