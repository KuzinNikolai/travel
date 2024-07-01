export interface ISearchGroup {
	id: string
	items: ISearchItem[]
}

export interface ISearchItem {
	title: string
	citySlug: string
	tourSlug?: string
}
