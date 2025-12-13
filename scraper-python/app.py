from flask import Flask, request, jsonify
from recipe_scrapers import scrape_me

app = Flask(__name__)

def split_instructions(instructions_list):
    sections = []
    current_section = {"title": "General", "steps": []}
    for line in instructions_list:
        if line.strip().endswith(":"):  # heading marker
            if current_section["steps"]:
                sections.append(current_section)
            current_section = {"title": line.strip(), "steps": []}
        else:
            if line.strip():
                current_section["steps"].append(line.strip())
    if current_section["steps"]:
        sections.append(current_section)
    return sections

@app.route("/scrape", methods=["POST"])
def scrape():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        # Use recipe-scrapers library to handle parsing
        scraper = scrape_me(url)

        return jsonify({
            "title": scraper.title(),
            "ingredients": scraper.ingredients(),
            "ingredientGroups": [
                {"purpose": g.purpose, "ingredients": g.ingredients}
                for g in scraper.ingredient_groups()
            ],
            "instructionGroups": split_instructions(scraper.instructions_list()),
            "image": scraper.image()
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
