from dataclasses import asdict
import time
import unittest

from ..routes.main import Application


class ApplicationTests(unittest.TestCase):
    def test_default_load(self):
        app = Application(name="foo")
        self.assertEqual(
            asdict(app),
            {
                "name": "foo",
                "applied_date": int(time.time()),
                "last_action": int(time.time()),
                "stage": "Waiting to apply",
                "answered": False,
                "rejected": False,
                "points_of_contact": "",
                "notes": "",
                "url": "",
                "used_cover_letter": False,
                "cover_letter_name": "",
            },
        )
