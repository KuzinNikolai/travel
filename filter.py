from django_filters import rest_framework as filters
from tour.models import Tour, TagTour, Category
from city.models import City


class CharFilterinFilter(filters.BaseInFilter, filters.CharFilter):
    pass



class TourFilter(filters.FilterSet):
    tags = CharFilterinFilter(field_name='tags__tag', lookup_expr='in')
    category = filters.ModelChoiceFilter(field_name='category', queryset=Category.objects.all())
    adult_price = filters.RangeFilter(field_name='programs__adult_price')

    class Meta:
        model = Tour
        fields = ['tags', 'category', 'adult_price']


class CategoryFilter(filters.FilterSet):
    # Фильтруем по полю slug категории
    slug = filters.CharFilter(field_name='slug')

    class Meta:
        model = Category
        fields = ['slug']


class CityFilter(filters.FilterSet):
    tags = filters.CharFilter(field_name='tours__tags__tag', lookup_expr='in')
    adult_price = filters.RangeFilter(field_name='tours__programs__adult_price')

    class Meta:
        model = City
        fields = ['tags', 'adult_price']