import React from 'react'

export interface CardTagProps {
    TagName: string;
}

export const CardTag = (props: CardTagProps) => {
  const { TagName } = props;

  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        {TagName}
    </span>
  )
}