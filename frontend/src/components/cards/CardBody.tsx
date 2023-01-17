import React from 'react'
import { CardTag } from './CardTag';

export interface CardBodyProps {
  cardTitle: string;
  cardDesc: string;
  tags: Array<{
    tagName: string;
  }>;
}

export const CardBody = (props: CardBodyProps) => {
  const { cardTitle, cardDesc, tags } = props;

  return (
    <div>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{cardTitle}</div>
    <p className="text-gray-700 text-base">
      {cardDesc}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
  {tags.map(tag => (
    <CardTag TagName={tag.tagName} />
  ))}
  </div>
  </div>
  )
}

