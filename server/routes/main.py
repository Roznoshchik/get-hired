import csv
from dataclasses import asdict, fields
import json

from flask import render_template, Blueprint, jsonify

from ..models.Application import Application

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
