
export interface IHomePageData {
  title: string
  text: string;
  advantages: IAdvantages[]
  conditions: IConditions[]
  requirements: IRequirements[]
  news: INews[]
}

export interface IAdvantages{
  number: string
  image: string
  text: string
}

export interface IConditions{
  number: string
  text: string
}

export interface IRequirements{
  number: string
  title: string
  text: string
}

export interface INews{
  date: string
  image: string
  title: string
  text: string
  news_of_the_day: boolean
}
