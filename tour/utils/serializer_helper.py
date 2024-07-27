import json

from parler_rest.serializers import TranslatedFieldsField



class CustomTranslatedFieldsField(TranslatedFieldsField):
    def to_internal_value(self, data):
        try:
            data = json.loads(data)
        except:
            self.fail("invalid")
        return super().to_internal_value(data)
