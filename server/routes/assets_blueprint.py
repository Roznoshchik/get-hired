import json
import os
from pathlib import Path

from flask import Blueprint

FLASK_DEBUG = os.getenv("FLASK_DEBUG", "0")
VITE_ORIGIN = os.getenv("VITE_ORIGIN", "http://localhost:5173")

is_production = FLASK_DEBUG != "1"

project_path = Path(os.path.dirname(os.path.abspath(__file__)))

assets_bp = Blueprint(
    "assets_blieprint",
    __name__,
    static_folder="static/bundled",
    static_url_path="/static/bundled",
)

manifest = {}
if is_production:
    manifest_path = project_path / "static/manifest.json"
    try:
        with open(manifest_path, "r") as content:
            manifest = json.load(content)
    except OSError as exception:
        raise OSError("Manifest file not found. Run `npm run build`.") from exception


@assets_bp.app_context_processor
def add_context():
    def dev_asset(file_path):
        return f"{VITE_ORIGIN}/static/{file_path}"

    def prod_asset(file_path):
        try:
            return f"/static/{manifest[file_path]['file']}"
        except Exception:
            return "asset-not-found"

    return {
        "asset": prod_asset if is_production else dev_asset,
        "is_production": is_production,
    }
