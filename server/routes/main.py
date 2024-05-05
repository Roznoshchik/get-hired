import csv
from dataclasses import asdict, fields
from http import HTTPStatus

from flask import render_template, Blueprint, jsonify, request

from ..models.Application import Application

bp = Blueprint(
    "main",
    __name__,
)


@bp.get("/new/<name>")
def create_new_app(name):
    app = Application(name=name)
    with open("applications.csv", "a", newline="\n") as file:
        writer = csv.DictWriter(file, fieldnames=[f.name for f in fields(Application)])
        writer.writerow(asdict(app))
    return jsonify(app)


@bp.get("/data")
def get_applications():
    with open("applications.csv", "r", newline="\n") as file:
        reader = csv.DictReader(file)
        applications = [Application.from_dict(row).to_json() for row in reader]

    return jsonify(applications)


@bp.post("/data")
def post_applications():
    try:
        data = request.json
        applications = []
        for app in data:
            applications.append(Application.from_json(app))

        with open("applications.csv", "w", newline="\n") as file:
            writer = csv.DictWriter(
                file, fieldnames=[f.name for f in fields(Application)]
            )
            writer.writeheader()

            for app in applications:
                writer.writerow(asdict(app))

        return jsonify(), HTTPStatus.OK

    except Exception as e:
        print("ERROR", e)
        return jsonify(), HTTPStatus.INTERNAL_SERVER_ERROR


@bp.get("/")
def index():
    return render_template("index.html")
