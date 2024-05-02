from dotenv import load_dotenv
import subprocess  # noseczz

from .config import Config
from .utils.flask_lambda import FlaskLambda

load_dotenv()


def create_app(config_class=Config):
    app = FlaskLambda(__name__)

    @app.cli.command("serve")
    def serve():
        print("Starting npm dev server in client directory...")
        # Start the npm process in the background in the client directory
        npm_process = subprocess.Popen(["npm", "start"])  # nosec

        try:
            print("Starting Flask server...")
            # Now start the Flask server, this will block until Flask exits
            subprocess.run(["flask", "run"], check=True)  # nosec
        finally:
            print("Flask server has exited. Shutting down npm server...")
            # Ensure the npm server is terminated when Flask server stops
            npm_process.terminate()
            try:
                # Wait up to 10 seconds for npm process to exit gracefully
                npm_process.wait(timeout=10)
            except subprocess.TimeoutExpired:  # nosec
                # If it doesn't shut down gracefully, kill it
                npm_process.kill()
            print("npm server shutdown complete.")

    app.config.from_object(config_class)

    from .routes.assets_blueprint import assets_bp

    app.register_blueprint(assets_bp)

    from .routes.main import bp as main_bp

    app.register_blueprint(main_bp)

    return app
