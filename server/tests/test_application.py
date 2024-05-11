from dataclasses import asdict
from datetime import datetime, timezone
import unittest

from ..routes.main import Application


class ApplicationTests(unittest.TestCase):
    def test_default_load(self):
        app = Application(name="foo")
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        self.assertEqual(
            asdict(app),
            {
                "id": app.id,
                "name": "foo",
                "applied_date": today,
                "last_action": today,
                "stage": "Waiting to apply",
                "answered": False,
                "rejected": False,
                "offer_declined": False,
                "points_of_contact": "",
                "notes": "",
                "url": "",
                "used_cover_letter": False,
                "cover_letter_name": "",
            },
        )
