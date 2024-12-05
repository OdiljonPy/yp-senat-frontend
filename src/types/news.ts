export interface NewsCategoryItem {
  id: number;
  name: string;
}
export interface NewsCategoryResponse {
  result: NewsCategoryItem[];
}
interface NewsItem {
  id: number;
  description: string;
  image: string;
  published_date: string;
  title: string;
}
export interface NewsResponse {
  result: {
    content: NewsItem[];
  };
}
export interface RelatedNewsDetail {
  id: number
  commission_member: number,
  description: string,
  image: string,
  published_date: string,
  title: string,
  views_count: number
}
export interface NewsDetailResponse {
  related_posts: RelatedNewsDetail[],
  result: {
    image: string,
    title: string,
    description: string,
    id: number,
    published_date: string,
    views_count: number,
    short_description: string
  }
}
