import json

READ_FILE_NAME = "fixtures/all_data.json"

tr_models = {
    "tour.faq": {"exclude_fields": []},
    "tour.tour": {
        "exclude_fields": [
            "country",
            "city",
            "included",
            "notincluded",
            "take",
            "adult_price",
            "child_price",
            "children_possible",
            "what_age_child_free",
            "pregnant_possible",
            "photo",
            "time_create",
            "time_update",
            "is_published",
            "cat",
            "type",
            "transfer",
            "tags",
            "lang",
            "faqs",
            "group_size",
            "average_rating",
            "promotions",
            "author",
            "slug",
        ],
    },
    "tour.category": {"exclude_fields": ["slug", "photo"]},
    "tour.type": {"exclude_fields": ["slug"]},
    "tour.programm": {
        "exclude_fields": [
            "tour",
            "type",
            "group_size",
            "adult_price",
            "child_price",
            "individual_price",
        ]
    },
    "tour.transfer": {"exclude_fields": []},
    "tour.notincluded": {"exclude_fields": []},
    "tour.included": {"exclude_fields": []},
    "tour.take": {"exclude_fields": []},
    "tour.tagtour": {"exclude_fields": ["slug", "active_image", "inactive_image"]},
    "tour.langtour": {"exclude_fields": ["slug", "photo"]},
    "tour.area": {"exclude_fields": ["country", "city"]},
    "tour.hotel": {"exclude_fields": ["country", "city", "area", "phone_number"]},
    "tour.order": {
        "exclude_fields": [
            "user",
            "email",
            "phone",
            "tour",
            "program",
            "transfer",
            "deposit",
            "discount",
            "cash_on_tour",
            "quantity_adults",
            "quantity_children",
            "quantity_infant",
            "trip_date",
            "created_at",
            "updated_at",
            "order_number",
        ]
    },
    "tour.reviews": {"exclude_fields": ["user", "tour", "rating", "created_date"]},
    "city.city": {"exclude_fields": ["country", "slug", "photo", "is_published"]},
    "country.country": {"exclude_fields": ["slug", "currency_prefix", "photo"]},
    "contacts.support": {
        "exclude_fields": [
            "phone",
            "email",
            "link_whatsapp",
            "link_telegram",
            "link_viber",
            "link_facebook",
            "link_instagram",
            "link_youtube",
        ]
    },
    "users.staticpage": {
        "exclude_fields": [
            "title",
            "content",
        ]
    },
}


def read_data():
    with open(READ_FILE_NAME, "r") as file:
        data = json.load(file)

    return data


def get_translation_entry(entry: dict):
    model = entry["model"]
    exclude_fields = tr_models[model]["exclude_fields"]
    data = {
        "model": model + "translation",
        "pk": entry["pk"],
        "fields": {"master_id": entry["pk"], "language_code": "ru"},
    }

    for name, value in entry["fields"].items():
        if not name in exclude_fields and not "_en" in name:
            data["fields"][name] = value
    return data


def clear_entry(entry: dict):
    model = entry["model"]
    exclude_fields = tr_models[model]["exclude_fields"]
    fields = list(entry["fields"].keys())
    for field in fields:
        if not field in exclude_fields:
            del entry["fields"][field]
    return entry


def adapt_data():
    data = read_data()
    adapted_data = []

    for entry in data:
        if tr_models.get(entry["model"], None):
            tr_entry = get_translation_entry(entry.copy())
            entry = clear_entry(entry)
            adapted_data.append(entry)
            adapted_data.append(tr_entry)
        else:
            adapted_data.append(entry)
    return adapted_data


def add_addapted_data():
    adapted_data = adapt_data()
    with open("fixtures/adapted_data.json", "w+") as file:
        json.dump(adapted_data, file)


if __name__ == "__main__":
    add_addapted_data()
