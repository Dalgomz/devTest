import os

import requests
from flask import Flask, jsonify

#Should be on a .env file, hardcoded for the test
PRODUCT_API_URL = "http://localhost:3001"
NOT_FOUND_RESPONSE = {"message": "Product Not found"}


def create_app():
    app = Flask(__name__)

    @app.get("/product/<productId>/similar")
    def similarProducts(productId):
        try:
            similar_ids_response = requests.get(f"{PRODUCT_API_URL}/product/{productId}/similarids")
        except requests.RequestException:
            return jsonify(NOT_FOUND_RESPONSE), 404

        if similar_ids_response.status_code == 404:
            return jsonify(NOT_FOUND_RESPONSE), 404
        if similar_ids_response.status_code != 200:
            return jsonify(NOT_FOUND_RESPONSE), 404

        similar_ids = similar_ids_response.json()

        similar_products = []
        for similar_id in similar_ids:
            try:
                detail_response = requests.get(f"{PRODUCT_API_URL}/product/{similar_id}")
            except requests.RequestException:
                continue

            if detail_response.status_code != 200:
                continue

            similar_products.append(detail_response.json())

        return jsonify(similar_products)

    @app.get("/health")
    def health():
        return {"status": "ok"}

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)


