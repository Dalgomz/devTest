from flask import Flask


def create_app():
    app = Flask(__name__)

    @app.get("/")
    def index():
        return {"message": "Backend Flask is running"}

    @app.get("/health")
    def health():
        return {"status": "ok"}

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
